"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var random_js_1 = require("random-js");
var DefaultRandomProvider = /** @class */ (function () {
    function DefaultRandomProvider() {
        this.engine = random_js_1.MersenneTwister19937.autoSeed();
    }
    DefaultRandomProvider.prototype.numberBetween = function (min, max) {
        var distribution = random_js_1.integer(min, max);
        return distribution(this.engine);
    };
    return DefaultRandomProvider;
}());
exports.DefaultRandomProvider = DefaultRandomProvider;
//# sourceMappingURL=default-random-provider.class.js.map