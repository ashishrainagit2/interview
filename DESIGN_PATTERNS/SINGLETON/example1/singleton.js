let instance;

class ShoppingBag {
    constructor() {
        if (instance) {
            throw new Error("You can only create one instance of ShoppingBag");
        }
        this.bag = [];
        instance = this;
    }

    getBag() {
        console.log(this.bag);
    }
    addItem(item) {
        this.bag.push(item);
    }
}

const singletonShopping = Object.freeze(new ShoppingBag());

export default singletonShopping;