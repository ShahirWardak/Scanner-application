import { itemType } from "./item.type";

export type cartType = {
  items: { item: itemType; quantity: number; totalCost: number }[];
};
