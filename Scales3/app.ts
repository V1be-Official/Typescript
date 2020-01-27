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

const scalesArray = new ScalesStorageEngineArray();

const scalesLocalStorage = new ScalesStorageEngineLocalStorage('821812');

const scales1 = new Scales<ScalesStorageEngineArray>(scalesArray);
const scales2 = new Scales<ScalesStorageEngineLocalStorage>(scalesLocalStorage);

scales1.addProduct(new Product('Apple', 10));
scales1.addProduct(new Product('Tomato', 20));
scales1.addProduct(new Product('Cucumber', 30));

scales2.addProduct(new Product('Apple', 15));
scales2.addProduct(new Product('Tomato', 19));
scales2.addProduct(new Product('Cucumber', 3));



console.log('scalesArray - getSumScales :: ', scales1.getSumScales());
console.log('scalesArray - getNameList :: ', scales1.getNameList());

console.log('scalesLocalStorage - getSumScales :: ', scales2.getSumScales());
console.log('scalesLocalStorage - getNameList :: ', scales2.getNameList());