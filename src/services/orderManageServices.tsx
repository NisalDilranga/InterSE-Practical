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
import type { orderItem } from "../types/types";

const COLLECTION_NAME = "orders";

export const getAllOrders = async (): Promise<orderItem[]> => {
  try {
    const ordersCollection = collection(db, COLLECTION_NAME);
    const q = query(ordersCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        itemId: data.itemId,
        quantity: data.quantity,
        ingredients: data.ingredients || [],
        price: data.price,
        totalPrice: data.totalPrice,
        status: data.status,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as orderItem;
    });
  } catch (error) {
    console.error("Error getting orders: ", error);
    throw error;
  }
};

export const getOrderById = async (id: string): Promise<orderItem | null> => {
  try {
    const orderDoc = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(orderDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId,
        itemId: data.itemId,
        quantity: data.quantity,
        ingredients: data.ingredients || [],
        price: data.price,
        totalPrice: data.totalPrice,
        status: data.status,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as orderItem;
    }
    return null;
  } catch (error) {
    console.error("Error getting order: ", error);
    throw error;
  }
};

export const createOrder = async (
  order: Omit<orderItem, "id">
): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...order,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding order: ", error);
    throw error;
  }
};

export const updateOrder = async (
  id: string,
  order: Partial<orderItem>
): Promise<void> => {
  try {
    const orderRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(orderRef, {
      ...order,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating order: ", error);
    throw error;
  }
};

export const deleteOrder = async (id: string): Promise<void> => {
  try {
    const orderRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(orderRef);
  } catch (error) {
    console.error("Error deleting order: ", error);
    throw error;
  }
};
