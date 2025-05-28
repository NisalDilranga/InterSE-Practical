import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { itemType } from "../types/types";

const COLLECTION_NAME = "Item-Types";

export const getAllTypes = async (): Promise<itemType[]> => {
  try {
    const itemsCollection = collection(db, COLLECTION_NAME);
    const q = query(itemsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
      } as itemType;
    });
  } catch (error) {
    console.error("Error getting items: ", error);
    throw error;
  }
};

export const getTypesById = async (id: string): Promise<itemType | null> => {
  try {
    const itemDoc = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(itemDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
      } as itemType;
    }
    return null;
  } catch (error) {
    console.error("Error getting item: ", error);
    throw error;
  }
};

export const createTypes = async (item: Omit<itemType, "id">): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...item,
      id:Math.random(),
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding item: ", error);
    throw error;
  }
};



export const deleteTypes = async (id: string): Promise<void> => {
  try {
    const itemRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error deleting item: ", error);
    throw error;
  }
};
