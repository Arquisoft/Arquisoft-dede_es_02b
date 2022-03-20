import {Product} from "../../webapp/src/shared/shareddtypes";

type Item = {
    product: Product,
    quantity: number
}

interface Carrito {
    items: Item[],
    totalQuantity: number,
    totalPrice: number
}

class Cart implements Carrito{
    items: Item[];
    totalQuantity: number;
    totalPrice: number;

    constructor(){
        this.items = [];
        this.totalPrice = 0;
        this.totalQuantity = 0; 
    }

    public add(product: Product, quantity: number){
        var i:number = 0;
        for (i; i < this.items.length; i = i + 1) {
            if (this.items[i].product._id == product._id){
                this.items[i].quantity += quantity;
                this.totalQuantity += this.items[i].quantity;
                this.totalPrice += this.items[i].quantity * this.items[i].product.precio;
            }
        }
    }

    public generateArray(){
        var arr = [];
        var i:number = 0;
        for (i; i < this.items.length; i = i + 1) {
            arr.push(this.items[i]);
        }
        return arr;
    }
};

export default Cart;