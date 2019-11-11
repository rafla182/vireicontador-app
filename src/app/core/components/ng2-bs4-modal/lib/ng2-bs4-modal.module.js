"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var autofocus_1 = require("./directives/autofocus");
var modal_footer_1 = require("./components/modal-footer");
var modal_body_1 = require("./components/modal-body");
var modal_header_1 = require("./components/modal-header");
var modal_1 = require("./components/modal");
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        modal_1.ModalComponent,
                        modal_header_1.ModalHeaderComponent,
                        modal_body_1.ModalBodyComponent,
                        modal_footer_1.ModalFooterComponent,
                        autofocus_1.AutofocusDirective
                    ],
                    exports: [
                        modal_1.ModalComponent,
                        modal_header_1.ModalHeaderComponent,
                        modal_body_1.ModalBodyComponent,
                        modal_footer_1.ModalFooterComponent,
                        autofocus_1.AutofocusDirective
                    ]
                },] },
    ];
    return ModalModule;
}());
exports.ModalModule = ModalModule;
//# sourceMappingURL=ng2-bs4-modal.module.js.map