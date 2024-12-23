import { itemType } from "@/types/item.type";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";

export class DatabaseService {
  public items: itemType[] = [];

  // Fetch data from the database
  public async readData() {
    await getDocs(collection(FIREBASE_DB, "items")).then((data) => {
      this.items = [];
      var tempArray: itemType[] = [];
      data.forEach((doc) => {
        tempArray.push({
          code: doc.data().code,
          cost: doc.data().cost,
          name: doc.data().name,
        });
      });
      this.items = [...tempArray];
    });

    return this.items;
  }

  // Update database
  public async addData() {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "items"), {
        code: 1234567890003,
        cost: 1.99,
        name: "Test item",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

// Using this so that it is a singleton:
export const databaseService = new DatabaseService();
