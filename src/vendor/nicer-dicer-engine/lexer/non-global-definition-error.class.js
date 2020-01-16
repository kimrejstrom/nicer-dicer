"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var NonGlobalDefinitionError = /** @class */ (function (_super) {
    __extends(NonGlobalDefinitionError, _super);
    function NonGlobalDefinitionError() {
        return _super.call(this, 'TokenDefinition pattern RegExp must be global.') || this;
    }
    return NonGlobalDefinitionError;
}(Error));
exports.NonGlobalDefinitionError = NonGlobalDefinitionError;
//# sourceMappingURL=non-global-definition-error.class.js.map