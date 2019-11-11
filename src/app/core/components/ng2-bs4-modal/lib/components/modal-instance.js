"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ModalInstance = /** @class */ (function () {
    function ModalInstance(element) {
        this.element = element;
        this.suffix = '.ng2-bs4-modal';
        this.shownEventName = 'shown.bs.modal' + this.suffix;
        this.hiddenEventName = 'hidden.bs.modal' + this.suffix;
        this.visible = false;
        this.init();
    }
    ModalInstance.prototype.open = function () {
        return this.show();
    };
    ModalInstance.prototype.close = function () {
        this.result = ModalResult.Close;
        return this.hide();
    };
    ModalInstance.prototype.dismiss = function () {
        this.result = ModalResult.Dismiss;
        return this.hide();
    };
    ModalInstance.prototype.destroy = function () {
        var _this = this;
        return this.hide().then(function () {
            if (_this.$modal) {
                _this.$modal.data('bs.modal', null);
                _this.$modal.remove();
            }
        });
    };
    ModalInstance.prototype.show = function () {
        var promise = toPromise(this.shown);
        this.resetData();
        this.$modal.modal();
        return promise;
    };
    ModalInstance.prototype.hide = function () {
        if (this.$modal && this.visible) {
            var promise = toPromise(this.hidden);
            this.$modal.modal('hide');
            return promise;
        }
        return Promise.resolve(this.result);
    };
    ModalInstance.prototype.init = function () {
        var _this = this;
        this.$modal = jQuery(this.element.nativeElement);
        this.$modal.appendTo('body');
        this.shown = rxjs_1.fromEvent(this.$modal, this.shownEventName).pipe(operators_1.map(function () {
            _this.visible = true;
        }));
        this.hidden = rxjs_1.fromEvent(this.$modal, this.hiddenEventName).pipe(operators_1.map(function () {
            var result = (!_this.result || _this.result.valueOf() === ModalResult.None.valueOf())
                ? ModalResult.Dismiss : _this.result;
            _this.result = ModalResult.None;
            _this.visible = false;
            return result;
        }));
    };
    ModalInstance.prototype.resetData = function () {
        this.$modal.removeData();
        this.$modal.data('backdrop', booleanOrValue(this.$modal.attr('data-backdrop')));
        this.$modal.data('keyboard', booleanOrValue(this.$modal.attr('data-keyboard')));
    };
    return ModalInstance;
}());
exports.ModalInstance = ModalInstance;
function booleanOrValue(value) {
    if (value === 'true')
        return true;
    else if (value === 'false')
        return false;
    return value;
}
function toPromise(observable) {
    return new Promise(function (resolve, reject) {
        observable.subscribe(function (next) {
            resolve(next);
        });
    });
}
var ModalResult;
(function (ModalResult) {
    ModalResult[ModalResult["None"] = 0] = "None";
    ModalResult[ModalResult["Close"] = 1] = "Close";
    ModalResult[ModalResult["Dismiss"] = 2] = "Dismiss";
})(ModalResult = exports.ModalResult || (exports.ModalResult = {}));
//# sourceMappingURL=modal-instance.js.map