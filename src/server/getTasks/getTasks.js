import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config-task";
import { collection, getDocs } from 'firebase/firestore';

export const getTasks = async (grName, callback) => {
    const taskCollectionRef = collection(db, grName);
    try {
      const data = await getDocs(taskCollectionRef);
      const tasks = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      callback(tasks);
    } catch (error) {
      console.log('error ' + error);
      // Обработка ошибок
    }
  };
