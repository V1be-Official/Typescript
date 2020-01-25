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
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        var _this = this;
        this.getScale = function () { return _this.scale; };
        this.getName = function () { return _this.name; };
        this.name = _name;
        this.scale = _scale;
    }
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(scale) {
        return _super.call(this, 'Apple', scale) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(scale) {
        return _super.call(this, 'Tomato', scale) || this;
    }
    return Tomato;
}(Product));
var Scales = /** @class */ (function () {
    function Scales() {
        var _this = this;
        this.nameList = [];
        this.sumScale = 0;
        this.products = [];
        this.addProduct = function (product) {
            _this.products.push(product);
            _this.nameList.push(product.getName());
            _this.sumScale += product.getScale();
        };
        this.getSumScales = function () { return _this.sumScale; };
        this.getNameList = function () { return _this.nameList; };
    }
    return Scales;
}());
var scales = new Scales;
var apple1 = new Apple(1);
var apple2 = new Apple(2);
var apple3 = new Apple(3);
var tomato1 = new Tomato(1);
var tomato2 = new Tomato(10);
var tomato3 = new Tomato(5);
scales.addProduct(apple1);
scales.addProduct(apple2);
scales.addProduct(apple3);
scales.addProduct(tomato1);
scales.addProduct(tomato2);
scales.addProduct(tomato3);
console.log('NameList ', scales.getNameList());
console.log('SumScales', scales.getSumScales());
//# sourceMappingURL=app.js.map