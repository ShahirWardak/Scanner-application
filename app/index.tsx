import { StyleSheet } from "react-native";
import { Activity } from "@tamagui/lucide-icons";
import { Text, View } from "react-native";
import { Button } from "tamagui";
import { useState } from "react";
import { CameraComponent } from "@/components/camera.component";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";
import { itemType } from "@/types/item.type";

export default function Index() {
  const [scanned, setScanned] = useState("Not scanned");
  const [items, setItems] = useState<itemType[]>([]);

  async function readData() {
    getDocs(collection(FIREBASE_DB, "items")).then((data) => {
      setItems([]);
      var tempArray: itemType[] = [];
      data.forEach((doc) => {
        tempArray.push({
          code: doc.data().code,
          cost: doc.data().cost,
          name: doc.data().name,
        });
      });
      setItems([...tempArray]);
    });
  }

  /* Code to add to database
  async function addData() {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }*/

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>Welcome!</Text>

      <Button
        themeInverse
        iconAfter={Activity}
        size="$3"
        onPress={() => {
          readData();
        }}
      >
        Button!
      </Button>

      {items.map((item, index) => (
        <Text style={styles.testStyle} key={index}>
          {item.name} {item.cost}
        </Text>
      ))}

      <CameraComponent function={setScanned} />
      <Text style={styles.testStyle}>{scanned}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 50,
    fontSize: 40,
    fontWeight: "bold",
  },
  description: {
    marginBottom: 20,
  },
  testStyle: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    //color: "white",
  },
});
