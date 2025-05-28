import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { user } from "../types/types";

const COLLECTION_NAME = "users";

export const getAllUsers = async (): Promise<user[]> => {
  try {
    const itemsCollection = collection(db, COLLECTION_NAME);
    const q = query(itemsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        phone: data.mobile,
        password: data.password || "",
        email: data.email,
        role: data.role || "",
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as user;
    });
  } catch (error) {
    console.error("Error getting items: ", error);
    throw error;
  }
};

export const getUsersById = async (id: string): Promise<user | null> => {
  try {
    const itemDoc = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(itemDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        phone: data.mobile,
        password: data.password || "", 
        email: data.email,
        role: data.role || "",
      
      } as user;
    }
    return null;
  } catch (error) {
    console.error("Error getting item: ", error);
    throw error;
  }
};





