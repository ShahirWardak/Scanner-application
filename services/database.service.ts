import { itemType } from "@/types/item.type";
import {
  addDoc,
  collection,
  getDocs,
  Query,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";

export class DatabaseService {
  // Fetch data from the database
  public async fetchItemByCode(itemCode: number): Promise<itemType | null> {
    const collectionRef = collection(FIREBASE_DB, "items");
    const q = query(collectionRef, where("code", "==", itemCode));

    return this.fetchData(q);
  }

  public async fetchItemByName(itemName: string): Promise<itemType | null> {
    const collectionRef = collection(FIREBASE_DB, "items");
    const q = query(collectionRef, where("name", "==", itemName));

    return this.fetchData(q);
  }

  // Update database
  public async addData(code: number, cost: number, name: string) {
    if (code && cost && name) {
      try {
        const docRef = await addDoc(collection(FIREBASE_DB, "items"), {
          code: code,
          cost: cost,
          name: name,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  private async fetchData(query: Query<any>): Promise<itemType | null> {
    var item: itemType | null = null;

    await getDocs(query).then((data) => {
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
}

// Using this so that it is a singleton:
export const databaseService = new DatabaseService();
