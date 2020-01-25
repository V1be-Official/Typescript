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

    private products:Array<Product> = [];

    addProduct = (product:Product):void => {
        this.products.push(product);
    };

    getSumScales():number {
        const sum:number = this.products.reduce((sum:number, product:Product) => sum + product.getScale(),0);
        return sum;
    }

    getNameList():Array<string> {
        const products:Array<string> = this.products.map((product:Product) => product.getName());
        return products;
    };
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


