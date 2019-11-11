"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_1 = require("./modal");
var ModalBodyComponent = /** @class */ (function () {
    function ModalBodyComponent(modal) {
        this.modal = modal;
    }
    ModalBodyComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'modal-body',
                    template: "\n        <div class=\"modal-body\">\n            <ng-content></ng-content>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ModalBodyComponent.ctorParameters = function () { return [
        { type: modal_1.ModalComponent, },
    ]; };
    return ModalBodyComponent;
}());
exports.ModalBodyComponent = ModalBodyComponent;
//# sourceMappingURL=modal-body.js.map