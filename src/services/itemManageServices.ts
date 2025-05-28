import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { item } from "../types/types";

const COLLECTION_NAME = "items";

export const getAllItems = async (): Promise<item[]> => {
  try {
    const itemsCollection = collection(db, COLLECTION_NAME);
    const q = query(itemsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        type: data.type,
        price: data.price,
        imgUrl: data.imgUrl,
        quantity: data.quantity,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        ingredients: data.ingredients || [],
        description: data.description || "",
      } as item;
    });
  } catch (error) {
    console.error("Error getting items: ", error);
    throw error;
  }
};

export const getItemById = async (id: string): Promise<item | null> => {
  try {
    const itemDoc = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(itemDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        type: data.type,
        price: data.price,
        imgUrl: data.imgUrl,
        quantity: data.quantity,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        ingredients: data.ingredients || [],
        description: data.description || "",
      } as item;
    }
    return null;
  } catch (error) {
    console.error("Error getting item: ", error);
    throw error;
  }
};

export const createItem = async (item: Omit<item, "id">): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...item,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding item: ", error);
    throw error;
  }
};

export const updateItem = async (
  id: string,
  item: Partial<item>
): Promise<void> => {
  try {
    const itemRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(itemRef, {
      ...item,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating item: ", error);
    throw error;
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  try {
    const itemRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error deleting item: ", error);
    throw error;
  }
};
