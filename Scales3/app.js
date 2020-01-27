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
    Scales.prototype.addProduct = function (product) {
        this.scales.addItem(product);
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
        localStorage.setItem(this.TOKEN, JSON.stringify(this.products));
    };
    ScalesStorageEngineLocalStorage.prototype.createStore = function () {
        this.products = [];
        this.updateStore();
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
var scalesArray1 = new ScalesStorageEngineArray();
var scalesArray2 = new ScalesStorageEngineArray();
var scalesLocalStorage1 = new ScalesStorageEngineLocalStorage('jsDSJ12jd928D');
var scalesLocalStorage2 = new ScalesStorageEngineLocalStorage('PSkdm17a83aSD');
var scales1 = new Scales(scalesArray1);
var scales2 = new Scales(scalesArray2);
var scales3 = new Scales(scalesLocalStorage1);
var scales4 = new Scales(scalesLocalStorage2);
scales1.addProduct(new Product('Apple', 10));
scales1.addProduct(new Product('Tomato', 20));
scales1.addProduct(new Product('Cucumber', 30));
scales2.addProduct(new Product('Apple', 1));
scales2.addProduct(new Product('Tomato', 2));
scales2.addProduct(new Product('Cucumber', 3));
scales3.addProduct(new Product('Apple', 5));
scales3.addProduct(new Product('Tomato', 10));
scales3.addProduct(new Product('Cucumber', 10));
scales4.addProduct(new Product('Apple', 2));
scales4.addProduct(new Product('Tomato', 2));
scales4.addProduct(new Product('Cucumber', 3));
console.log('scalesArray1 - getSumScales :: ', scales1.getSumScales());
console.log('scalesArray1 - getNameList :: ', scales1.getNameList());
console.log('scalesArray2 - getSumScales :: ', scales2.getSumScales());
console.log('scalesArray2 - getNameList :: ', scales2.getNameList());
console.log('scalesLocalStorage1 - getSumScales :: ', scales3.getSumScales());
console.log('scalesLocalStorage1 - getNameList :: ', scales3.getNameList());
console.log('scalesLocalStorage2 - getSumScales :: ', scales4.getSumScales());
console.log('scalesLocalStorage2 - getNameList :: ', scales4.getNameList());
//# sourceMappingURL=app.js.map