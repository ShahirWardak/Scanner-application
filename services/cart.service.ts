import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, cartType } from "@/types/cart.type";
import { itemType } from "@/types/item.type";

const CART_STORAGE_KEY = "cart_items";

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

  constructor() {
    this.loadCartFromStorage();
  }

  getItemCart(): cartType {
    return this.itemCart;
  }

  async addToCart(item: itemType, quantity: number) {
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

    await this.saveCartToStorage();
  }

  async removeFromCart(item: itemType) {
    this.itemCart.items = this.itemCart.items.filter(
      (cartItem) => cartItem.item.code !== item.code
    );

    await this.saveCartToStorage();
  }

  async clearCart() {
    this.itemCart = { items: [] };
    await this.saveCartToStorage();
  }

  private _calculateTotal(item: itemType, quantity: number) {
    return item.cost * quantity;
  }

  private _getCartItem(item: itemType): CartItem | undefined {
    return this.itemCart.items.find(
      (cartItem) => cartItem.item.code === item.code
    );
  }

  // Load cart from AsyncStorage when the app starts
  private async loadCartFromStorage() {
    try {
      const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        this.itemCart = JSON.parse(storedCart);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }

  // Save cart to AsyncStorage whenever an item is added or removed
  private async saveCartToStorage() {
    try {
      await AsyncStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(this.itemCart)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }
}

// Ensure it remains a singleton
export const cartService = new CartService();
