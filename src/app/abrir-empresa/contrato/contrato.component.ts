import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import * as jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';
import * as html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { AbrirEmpresaService } from 'app/layouts/abrir-empresa/abrir-empresa.services';


@Component({
    selector: 'app-contrato',
    templateUrl: './contrato.component.html',
    styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit, AfterViewInit {
    @Input() tela;
    @Output() trocarTela: EventEmitter<string> = new EventEmitter();
    @Input() model: any;
    @ViewChild(SignaturePad, { static: true }) signaturePad: SignaturePad;
    @ViewChild('content', { static: true }) content: ElementRef;

    date: any;
    loading = false;
    signaturePadOptions = {
        minWidth: 1,
        penColor: 'rgb(66,133,244)',
        dotSize: 0.1,
        canvasWidth: 800,
        canvasHeight: 150
    };

    constructor(private toastr: ToastrService,
        private abrirEmpresaService: AbrirEmpresaService) { }

    ngOnInit() {
        this.date = new Date();

    }

    irParaPagamento(cliente) {
        this.trocarTela.emit('pagamento');
    }

    ngAfterViewInit() {
        // this.signaturePad is now available
        this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API

    }

    drawComplete() {
        const base64 = this.signaturePad.fromDataURL('imag/png', 1);
        // will be notified of szimek/signature_pad's onEnd event
        console.log(this.signaturePad.toDataURL());
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }

    drawClear() {
        this.signaturePad.clear();
    }
    send(pdfAsString) {
        this.abrirEmpresaService.sendContrato(this.base64ArrayBuffer(pdfAsString), this.model.cliente)
            .subscribe(arg => {
                this.toastr.success('O contrato assinado foi enviado por e-mail.');
                this.trocarTela.emit('sucesso');
            }
            );
        ;
    }

    base64ArrayBuffer(arrayBuffer) {
        var base64 = ''
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

        var bytes = new Uint8Array(arrayBuffer)
        var byteLength = bytes.byteLength
        var byteRemainder = byteLength % 3
        var mainLength = byteLength - byteRemainder

        var a, b, c, d
        var chunk

        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
            d = chunk & 63               // 63       = 2^6 - 1

            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
        }

        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength]

            a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4 // 3   = 2^2 - 1

            base64 += encodings[a] + encodings[b] + '=='
        } else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

            a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2 // 15    = 2^4 - 1

            base64 += encodings[a] + encodings[b] + encodings[c] + '='
        }

        return base64
    }

    salvar() {

        if (!this.signaturePad.isEmpty()) {

            //const div = document.getElementById('content');

            var element = document.getElementById('content');
            var opt = {
                margin: 0.4,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().from(element).set(opt).output('arraybuffer').then(
                (pdfAsString) => {
                    console.log(pdfAsString);
                    this.send(pdfAsString);
                });
            // New Promise-based usage:
            // html2pdf().from(element).set(opt).outputPdf().then(
            //     (pdfAsString) => {
            //         console.log(pdfAsString);
            //         this.send(pdfAsString);
            //     });

        }
        else {
            this.toastr.error('É necessário assinar o documento.')
        }
        // const options = {
        //     background: null,
        //     scale: 1
        // };

        // setTimeout(function () {
        //     this.loading = true;
        //     html2canvas(div, options).then((canvas) => {

        //         var img = canvas.toDataURL("image/PNG");
        //         var doc = new jsPDF('p', 'mm');

        //         // Add image Canvas to PDF
        //         var margin = 20;
        //         var imgWidth = 210 - 2 * margin;
        //         var pageHeight = 295;
        //         var imgHeight = canvas.height * imgWidth / canvas.width;
        //         var heightLeft = imgHeight;
        //         var position = margin;

        //         doc.addImage(img, 'PNG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
        //         heightLeft -= pageHeight;

        //         while (heightLeft >= 0) {
        //             position = heightLeft - imgHeight;
        //             doc.addPage();
        //             doc.addImage(img, 'PNG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
        //             heightLeft -= pageHeight;
        //         }

        //         doc.save('contrato.pdf');

        //     }).then((doc) => {
        //         this.loading = false;
        //     })
        // }, 1000);


        // var pdf = new jsPDF('p', 'pt', 'letter');
        // // source can be HTML-formatted string, or a reference
        // // to an actual DOM element from which the text will be scraped.
        // var source = $('#content')[0];

        // // we support special element handlers. Register them with jQuery-style 
        // // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // // There is no support for any other type of selectors 
        // // (class, of compound) at this time.
        // var specialElementHandlers = {
        //     // element with id of "bypass" - jQuery style selector
        //     '#teste': function (element, renderer) {
        //         // true = "handled elsewhere, bypass text extraction"
        //         return false
        //     }
        // };
        // var margins = {
        //     top: 80,
        //     bottom: 60,
        //     left: 40,
        //     width: 520
        // };

        // // all coords and widths are in jsPDF instance's declared units
        // // 'inches' in this case
        // pdf.fromHTML(

        //     source, // HTML string or DOM elem ref.
        //     margins.left, // x coord            
        //     margins.top,
        //     { // y coord
        //         'width': margins.width, // max width of content on PDF
        //         'elementHandlers': specialElementHandlers
        //     },
        //     function (dispose) {
        //         // dispose: object with X, Y of the last line add to the PDF 
        //         //          this allow the insertion of new lines after html

        //         pdf.save('Test.pdf');
        //     }, margins);

        // var element = document.getElementById('content');
        // var opt = {
        //     margin: 1,
        //     filename: 'myfile.pdf',
        //     image: { type: 'jpeg', quality: 0.98 },
        //     html2canvas: { scale: 2 },
        //     jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
        //     pagebreak: { mode: ['css', 'legacy'] }
        // };

        // html2pdf().from(element).set(opt).save();
        // html2pdf(element, opt);

        // var pdf = new jsPDF('p', 'pt', 'letter');
        // var source = document.getElementById('content');
        // var specialElementHandlers = { 
        //     '#content': function (element, renderer) {
        //         return true;
        //     }
        // };

        // var margins = {
        //     top: 80,
        //     bottom: 60,
        //     left: 40,
        //     width: 522
        // };

        // console.log("Building  HTML" + source);
        // pdf.fromHTML(
        //     source // HTML string or DOM elem ref.
        //     , margins.left // x coord
        //     , margins.top // y coord
        //     , {
        //         'width': margins.width // max width of content on PDF
        //         ,
        //         'elementHandlers': specialElementHandlers
        //     },
        //     function (dispose) {
        //     },
        //     margins
        // );

        // console.log("after from HTML.");
        // pdf.save('Test.pdf');


    }
    salv2ar() {

        var node = document.getElementById('contrato');

        var img;
        var filename;
        var newImage;


        domtoimage.toPng(node, { bgcolor: '#fff' })

            .then(function (dataUrl) {

                img = new Image();
                img.src = dataUrl;
                newImage = img.src;

                img.onload = function () {

                    var pdfWidth = img.width;
                    var pdfHeight = img.height;

                    // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

                    var doc;

                    if (pdfWidth > pdfHeight) {
                        doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
                    }
                    else {
                        doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
                    }


                    var width = doc.internal.pageSize.getWidth();
                    var height = doc.internal.pageSize.getHeight();


                    doc.addImage(newImage, 'PNG', 10, 10, width, height);
                    filename = 'mypdf_' + '.pdf';
                    doc.save(filename);

                };


            })
            .catch(function (error) {

                // Error Handling

            });



    }

}

