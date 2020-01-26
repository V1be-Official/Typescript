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
var Scales = /** @class */ (function () {
    function Scales(_scales) {
        this.scales = _scales;
    }
    Scales.prototype.getSumScales = function () {
        var count = this.scales.getCount();
        var sum = 0;
        for (var index = 0; index < count; index++) {
            sum += this.scales.getItem(index).getScale();
        }
        return sum;
    };
    Scales.prototype.getNameList = function () {
        var count = this.scales.getCount();
        var nameList = [];
        for (var index = 0; index < count; index++) {
            nameList.push(this.scales.getItem(index).getName());
        }
        return nameList;
    };
    ;
    return Scales;
}());
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.products = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (product) {
        this.products.push(product);
        return this.products.length - 1;
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.products.length;
    };
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        if (index >= this.products.length || index < 0)
            throw new Error('Out of array :: ScalesStorageEngineArray');
        return this.products[index];
    };
    return ScalesStorageEngineArray;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage(token) {
        this.TOKEN = token;
        this.getStore();
    }
    ScalesStorageEngineLocalStorage.prototype.updateStore = function () {
        var items = this.products.map(function (product) { return ({
            name: product.getName(),
            scale: product.getScale()
        }); });
        localStorage.setItem(this.TOKEN, JSON.stringify(items));
    };
    ScalesStorageEngineLocalStorage.prototype.getStore = function () {
        var items = JSON.parse(localStorage.getItem(this.TOKEN));
        if (items === null || !Array.isArray(items)) {
            this.createStore();
        }
        else {
            this.products = items.map(function (item) { return (new Product(item.name, item.scale)); });
        }
    };
    ScalesStorageEngineLocalStorage.prototype.createStore = function () {
        this.products = [];
        this.updateStore();
    };
    ScalesStorageEngineLocalStorage.prototype.addItem = function (product) {
        this.products.push(product);
        this.updateStore();
        return this.products.length - 1;
    };
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        return this.products.length;
    };
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        if (index >= this.products.length || index < 0)
            throw new Error('Out of array :: ScalesStorageEngineArray');
        return this.products[index];
    };
    return ScalesStorageEngineLocalStorage;
}());
var scalesArray = new ScalesStorageEngineArray();
var scalesLocalStorage = new ScalesStorageEngineLocalStorage('821812');
scalesArray.addItem(new Product('Apple', 10));
scalesArray.addItem(new Product('Tomato', 20));
scalesArray.addItem(new Product('Cucumber', 30));
scalesLocalStorage.addItem(new Product('Apple', 15));
scalesLocalStorage.addItem(new Product('Tomato', 19));
scalesLocalStorage.addItem(new Product('Cucumber', 3));
var mainScalesArray = new Scales(scalesArray);
var mainScalesLocalStorage = new Scales(scalesLocalStorage);
console.log('mainScalesArray - getSumScales :: ', mainScalesArray.getSumScales());
console.log('mainScalesArray - getNameList :: ', mainScalesArray.getNameList());
console.log('mainScalesLocalStorage - getSumScales :: ', mainScalesLocalStorage.getSumScales());
console.log('mainScalesLocalStorage - getNameList :: ', mainScalesLocalStorage.getNameList());
//# sourceMappingURL=app.js.map