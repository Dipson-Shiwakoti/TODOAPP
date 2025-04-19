import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, remove, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB28XQRIPCOwy97Kl7bs_xYhJtwFKWcmT0",
  authDomain: "todoapp-3dc69.firebaseapp.com",
  projectId: "todoapp-3dc69",
  databaseURL: "https://todoapp-3dc69-default-rtdb.firebaseio.com/",
  storageBucket: "todoapp-3dc69.appspot.com",
  messagingSenderId: "651011371159",
  appId: "1:651011371159:web:be3f463b95078dffbdf9d2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const setData = async (path, data) => {
  try {
    const dbRef = ref(database, path);
    await set(dbRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error setting data:", error);
    throw error;
  }
};

export const getData = async (path) => {
  try {
    const dbRef = ref(database, path);
    const snapshot = await get(dbRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

export const addData = async (path, data) => {
  try {
    const dbRef = ref(database, path);
    const newRef = push(dbRef);
    await set(newRef, data);
    return {
      success: true,
      id: newRef.key,
      data: data
    };
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const deleteData = async (path) => {
  try {
    const dbRef = ref(database, path);
    await remove(dbRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export const updateData = async (path, data) => {
  try {
    const dbRef = ref(database, path);
    await update(dbRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};
