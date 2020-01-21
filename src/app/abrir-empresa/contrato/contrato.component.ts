import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import * as jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';
import * as html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';


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

    signaturePadOptions = {
        minWidth: 1,
        penColor: 'rgb(66,133,244)',
        dotSize: 0.1,
        canvasWidth: 800,
        canvasHeight: 150
    };

    constructor() { }

    ngOnInit() {
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
        const base64 = this.signaturePad.fromDataURL('imag/png', 0.5);
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

    salvar() {

        var element = document.getElementById('content');
        var opt = {
            margin: 1,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] }
        };

        html2pdf().from(element).set(opt).save();
        html2pdf(element, opt);

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

