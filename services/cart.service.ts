import { cartType } from "@/types/cart.type";
import { itemType } from "@/types/item.type";

export class CartService {
  private itemCart: cartType = { items: [] };

  getItemCart(): cartType {
    return this.itemCart;
  }

  addToCart(item: itemType, quantity: number) {
    this.itemCart.items.push({
      item: item,
      quantity: quantity,
      totalCost: this._calculateTotal(item, quantity),
    });
  }

  removeFromCart(item: itemType) {
    this.itemCart.items = this.itemCart.items.filter(
      (cartItem) => cartItem.item !== item
    );
  }

  private _calculateTotal(item: itemType, quantity: number) {
    return item.cost * quantity;
  }
}

// Using this so that it is a singleton:
export const cartService = new CartService();
