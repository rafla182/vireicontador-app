"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_1 = require("../components/modal");
var AutofocusDirective = /** @class */ (function () {
    function AutofocusDirective(el, modal) {
        var _this = this;
        this.el = el;
        this.modal = modal;
        if (modal != null) {
            this.modal.onOpen.subscribe(function () {
                _this.el.nativeElement.focus();
            });
        }
    }
    AutofocusDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[autofocus]'
                },] },
    ];
    /** @nocollapse */
    AutofocusDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: modal_1.ModalComponent, },
    ]; };
    return AutofocusDirective;
}());
exports.AutofocusDirective = AutofocusDirective;
//# sourceMappingURL=autofocus.js.map