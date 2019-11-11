"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_instance_1 = require("./modal-instance");
var ModalComponent = /** @class */ (function () {
    function ModalComponent(element) {
        var _this = this;
        this.element = element;
        this.overrideSize = null;
        this.visible = false;
        this.animation = true;
        this.backdrop = true;
        this.keyboard = true;
        this.onClose = new core_1.EventEmitter(false);
        this.onDismiss = new core_1.EventEmitter(false);
        this.onOpen = new core_1.EventEmitter(false);
        this.instance = new modal_instance_1.ModalInstance(this.element);
        this.instance.hidden.subscribe(function (result) {
            _this.visible = _this.instance.visible;
            if (result === modal_instance_1.ModalResult.Dismiss)
                _this.onDismiss.emit(undefined);
        });
        this.instance.shown.subscribe(function () {
            _this.onOpen.emit(undefined);
        });
    }
    Object.defineProperty(ModalComponent.prototype, "fadeClass", {
        get: function () { return this.animation; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "dataKeyboardAttr", {
        get: function () { return this.keyboard; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "dataBackdropAttr", {
        get: function () { return this.backdrop; },
        enumerable: true,
        configurable: true
    });
    ModalComponent.prototype.ngOnDestroy = function () {
        return this.instance && this.instance.destroy();
    };
    ModalComponent.prototype.open = function (size) {
        var _this = this;
        if (ModalSize.validSize(size))
            this.overrideSize = size;
        return this.instance.open().then(function () {
            _this.visible = _this.instance.visible;
        });
    };
    ModalComponent.prototype.close = function () {
        var _this = this;
        return this.instance.close().then(function () {
            _this.onClose.emit(undefined);
        });
    };
    ModalComponent.prototype.dismiss = function () {
        return this.instance.dismiss();
    };
    ModalComponent.prototype.isSmall = function () {
        return this.overrideSize !== ModalSize.Large
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    };
    ModalComponent.prototype.isLarge = function () {
        return this.overrideSize !== ModalSize.Small
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    };
    ModalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'modal',
                    host: {
                        'class': 'modal',
                        'role': 'dialog',
                        'tabindex': '-1'
                    },
                    template: "\n        <div class=\"modal-dialog\" role=\"document\" [ngClass]=\"{ 'modal-sm': isSmall(), 'modal-lg': isLarge() }\">\n            <div class=\"modal-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    ModalComponent.propDecorators = {
        "animation": [{ type: core_1.Input },],
        "backdrop": [{ type: core_1.Input },],
        "keyboard": [{ type: core_1.Input },],
        "size": [{ type: core_1.Input },],
        "onClose": [{ type: core_1.Output },],
        "onDismiss": [{ type: core_1.Output },],
        "onOpen": [{ type: core_1.Output },],
        "fadeClass": [{ type: core_1.HostBinding, args: ['class.fade',] },],
        "dataKeyboardAttr": [{ type: core_1.HostBinding, args: ['attr.data-keyboard',] },],
        "dataBackdropAttr": [{ type: core_1.HostBinding, args: ['attr.data-backdrop',] },],
    };
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
var ModalSize = /** @class */ (function () {
    function ModalSize() {
    }
    ModalSize.validSize = function (size) {
        return size && (size === ModalSize.Small || size === ModalSize.Large);
    };
    ModalSize.Small = 'sm';
    ModalSize.Large = 'lg';
    return ModalSize;
}());
exports.ModalSize = ModalSize;
//# sourceMappingURL=modal.js.map