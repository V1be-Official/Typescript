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

interface IStorageEngine {
    addItem(item:Product):number;
    getItem(index:number):Product;
    getCount():number;
}

class Scales<StorageEngine extends IStorageEngine> {

    private scales:StorageEngine;

    constructor(_scales:StorageEngine) {
        this.scales = _scales;
    }

    getSumScales():number {
        const count:number = this.scales.getCount();
        let sum:number = 0;

        for(let index = 0;index < count;index++) {
            sum += this.scales.getItem(index).getScale();
        }

        return sum;
    }

    addProduct(product:Product):void {
        this.scales.addItem(product);
    }

    getNameList():Array<string> {
        const count:number = this.scales.getCount();
        const nameList = [];

        for(let index = 0;index < count;index++) {
            nameList.push(this.scales.getItem(index).getName());
        }

        return nameList;
    };

}

class ScalesStorageEngineArray implements IStorageEngine {

    private products:Array<Product> = [];

    addItem(product:Product):number {
        this.products.push(product);
        return this.products.length - 1;
    }

    getCount():number {
        return this.products.length;
    }

    getItem(index:number):Product {
        if(index >= this.products.length || index < 0) throw new Error('Out of array :: ScalesStorageEngineArray');
        
        return this.products[index];
    }

}

class ScalesStorageEngineLocalStorage  implements IStorageEngine {

    private TOKEN:string;
    private products:Array<Product>;

    private updateStore():void {
        localStorage.setItem(this.TOKEN, JSON.stringify(this.products));
    }


    private createStore():void {
        this.products = [];
        this.updateStore();
    }

    private getStore():void {
        const items = JSON.parse(localStorage.getItem(this.TOKEN));
        
        if(items === null || !Array.isArray(items)) {
            this.createStore();
        } else {
            this.products = items.map(
                (item:{name:string, scale: number}):Product => (new Product(item.name, item.scale)
            ));
        }

    }

    constructor(token:string) {
        this.TOKEN = token;
        this.getStore();
    }

    addItem(product:Product):number {
        this.products.push(product);
        this.updateStore();
        return this.products.length - 1;
    }

    getCount():number {
        return this.products.length;
    }

    getItem(index:number):Product {
        if(index >= this.products.length || index < 0) throw new Error('Out of array :: ScalesStorageEngineArray');
        
        return this.products[index];
    }

}

const scalesArray1 = new ScalesStorageEngineArray();
const scalesArray2 = new ScalesStorageEngineArray();

const scalesLocalStorage1 = new ScalesStorageEngineLocalStorage('jsDSJ12jd928D');
const scalesLocalStorage2 = new ScalesStorageEngineLocalStorage('PSkdm17a83aSD');

const scales1 = new Scales<ScalesStorageEngineArray>(scalesArray1);
const scales2 = new Scales<ScalesStorageEngineArray>(scalesArray2);

const scales3 = new Scales<ScalesStorageEngineLocalStorage>(scalesLocalStorage1);
const scales4 = new Scales<ScalesStorageEngineLocalStorage>(scalesLocalStorage2);



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