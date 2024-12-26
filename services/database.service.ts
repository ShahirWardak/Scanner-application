import { itemType } from "@/types/item.type";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";

export class DatabaseService {
  // Fetch data from the database
  public async readData(itemCode: number): Promise<itemType | null> {
    const collectionRef = collection(FIREBASE_DB, "items");
    const q = query(collectionRef, where("code", "==", itemCode));
    var item: itemType | null = null;

    await getDocs(q).then((data) => {
      if (data.empty) {
        console.log("NO MATCH FOUND");
        return null;
      }

      const doc = data.docs[0];
      item = {
        code: doc.data().code,
        name: doc.data().name,
        cost: doc.data().cost,
      };
    });

    return item;
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
