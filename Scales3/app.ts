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

        const items = this.products.map((product:Product) => (
            {
                name: product.getName(),
                scale: product.getScale()
            }
        ));

        localStorage.setItem(this.TOKEN, JSON.stringify(items));
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
    private createStore():void {
        this.products = [];
        this.updateStore();
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

scalesArray.addItem(new Product('Apple', 10));
scalesArray.addItem(new Product('Tomato', 20));
scalesArray.addItem(new Product('Cucumber', 30));

scalesLocalStorage.addItem(new Product('Apple', 15));
scalesLocalStorage.addItem(new Product('Tomato', 19));
scalesLocalStorage.addItem(new Product('Cucumber', 3));

const mainScalesArray = new Scales<ScalesStorageEngineArray>(scalesArray);
const mainScalesLocalStorage = new Scales<ScalesStorageEngineLocalStorage>(scalesLocalStorage);

console.log('mainScalesArray - getSumScales :: ', mainScalesArray.getSumScales());
console.log('mainScalesArray - getNameList :: ', mainScalesArray.getNameList());

console.log('mainScalesLocalStorage - getSumScales :: ', mainScalesLocalStorage.getSumScales());
console.log('mainScalesLocalStorage - getNameList :: ', mainScalesLocalStorage.getNameList());