import { cartType } from "@/types/cart.type";
import { Linking } from "react-native";

export class UserService {
  private roomId: string = "";

  getRoomId(): string {
    return this.roomId;
  }

  setRoomId(val: string) {
    this.roomId = val;
  }

  sendInvoice(room: string, cart: cartType) {
    const subject = `Invoice for Room ${room}`;

    // Calculate the total cost
    const totalCost = cart.items.reduce((sum, item) => sum + item.totalCost, 0);

    // Format the email body
    const body = `Room: ${room}\n\nInventory:\n${cart.items
      .map(
        (item) => `- ${item.item.name}: ${item.quantity} x ${item.totalCost}`
      )
      .join("\n")}\n\nTotal Cost: ${totalCost.toFixed(2)}`;

    const email = "recipient@example.com"; // Replace with a default recipient if needed
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoURL)
      .then(() => {
        console.log("Mail app opened successfully");
      })
      .catch((err) => {
        console.error("Failed to open mail app:", err);
      });
  }
}

// Using this so that it is a singleton:
export const userService = new UserService();
