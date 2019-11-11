"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_1 = require("./modal");
var ModalFooterComponent = /** @class */ (function () {
    function ModalFooterComponent(modal) {
        this.modal = modal;
        this.showDefaultButtons = false;
    }
    ModalFooterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'modal-footer',
                    template: "\n        <div class=\"modal-footer\">\n            <ng-content></ng-content>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\" (click)=\"modal.dismiss()\">Close</button>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-primary\" (click)=\"modal.close()\">Save</button>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ModalFooterComponent.ctorParameters = function () { return [
        { type: modal_1.ModalComponent, },
    ]; };
    ModalFooterComponent.propDecorators = {
        "showDefaultButtons": [{ type: core_1.Input, args: ['show-default-buttons',] },],
    };
    return ModalFooterComponent;
}());
exports.ModalFooterComponent = ModalFooterComponent;
//# sourceMappingURL=modal-footer.js.map