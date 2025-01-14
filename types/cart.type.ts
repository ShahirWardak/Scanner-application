import { itemType } from "./item.type";

export type cartType = {
  items: { item: itemType; quantity: number; totalCost: number }[];
};

export type CartItem = {
  item: itemType;
  quantity: number;
  totalCost: number;
};
