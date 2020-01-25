class Product {

    private name:string;
    private scale:number;

    constructor(_name:string, _scale:number) {
        this.name = _name;
        this.scale = _scale;
    }

    getScale = ():number => this.scale;

    getName = ():string => this.name;

}
class Apple extends Product {
    constructor(scale:number) {
        super('Apple', scale);
    }
}
class Tomato extends Product {
    constructor(scale:number) {
        super('Tomato', scale);
    }
}


class Scales {

    private nameList:Array<string> = [];
    private sumScale:number = 0;
    private products:Array<Product> = [];

    constructor() {

    }

    addProduct = (product:Product):void => {
        this.products.push(product);
        this.nameList.push(product.getName());
        this.sumScale += product.getScale();
    };

    getSumScales = ():number => this.sumScale;

    getNameList = ():Array<string> => this.nameList;

}

const scales:Scales = new Scales;

const apple1:Apple = new Apple(1);
const apple2:Apple = new Apple(2);
const apple3:Apple = new Apple(3);

const tomato1:Tomato = new Tomato(1);
const tomato2:Tomato = new Tomato(10);
const tomato3:Tomato = new Tomato(5);

scales.addProduct(apple1);
scales.addProduct(apple2);
scales.addProduct(apple3);
scales.addProduct(tomato1);
scales.addProduct(tomato2);
scales.addProduct(tomato3);

console.log('NameList ', scales.getNameList());
console.log('SumScales', scales.getSumScales());


