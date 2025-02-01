import { CartItem, cartType } from "@/types/cart.type";
import { itemType } from "@/types/item.type";

export class CartService {
  /*private itemCart: cartType = {
    items: [
      {
        item: { name: "Test Item 1", code: 189711, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
        dateAdded: new Date(),
      },
      {
        item: { name: "Test Item 2", code: 561654, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
        dateAdded: new Date(),
      },
      {
        item: { name: "Test Item 3", code: 123456, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
        dateAdded: new Date(),
      },
      {
        item: { name: "Test Item 4", code: 1234356, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
        dateAdded: new Date(),
      },
      {
        item: { name: "Test Item 4", code: 1234356, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
        dateAdded: new Date(),
      },
      {
        item: { name: "Test Item 4", code: 1234356, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
        dateAdded: new Date(),
      },
      {
        item: { name: "Test Item 4", code: 1234356, cost: 3.99 },
        quantity: 1,
        totalCost: 3.99,
        dateAdded: new Date(),
      },
    ],
  };*/
  private itemCart: cartType = { items: [] };

  getItemCart(): cartType {
    return this.itemCart;
  }

  addToCart(item: itemType, quantity: number) {
    const existingCartItem = this._getCartItem(item);

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.totalCost = this._calculateTotal(
        item,
        existingCartItem.quantity
      );
    } else {
      this.itemCart.items.push({
        item: item,
        quantity: quantity,
        totalCost: this._calculateTotal(item, quantity),
        dateAdded: new Date(),
      });
    }
  }

  removeFromCart(item: itemType) {
    this.itemCart.items = this.itemCart.items.filter(
      (cartItem) => cartItem.item !== item
    );
  }

  private _calculateTotal(item: itemType, quantity: number) {
    return item.cost * quantity;
  }

  private _getCartItem(item: itemType): CartItem | undefined {
    return this.itemCart.items.find(
      (cartItem) => cartItem.item.code === item.code
    );
  }
}

// Using this so that it is a singleton:
export const cartService = new CartService();
