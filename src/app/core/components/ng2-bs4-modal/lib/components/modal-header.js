"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_1 = require("./modal");
var ModalHeaderComponent = /** @class */ (function () {
    function ModalHeaderComponent(modal) {
        this.modal = modal;
        this.showClose = false;
        this.headerClasses = {};
    }
    ModalHeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'modal-header',
                    template: "\n        <div class=\"modal-header\" [ngClass]=\"headerClasses\">\n            <ng-content></ng-content>\n            <button *ngIf=\"showClose\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"modal.dismiss()\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ModalHeaderComponent.ctorParameters = function () { return [
        { type: modal_1.ModalComponent, },
    ]; };
    ModalHeaderComponent.propDecorators = {
        "showClose": [{ type: core_1.Input, args: ['show-close',] },],
        "headerClasses": [{ type: core_1.Input, args: ['header-classes',] },],
    };
    return ModalHeaderComponent;
}());
exports.ModalHeaderComponent = ModalHeaderComponent;
//# sourceMappingURL=modal-header.js.map