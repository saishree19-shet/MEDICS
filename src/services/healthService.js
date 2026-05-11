import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Health Service
 * Handles CRUD operations for health readings and vitals.
 * Future IoT Integration: ESP32 hardware will write directly to this 'health_readings' collection.
 */

// 1. Add a new health reading (Simulates hardware input or manual entry)
export const addHealthReading = async (userId, data) => {
  try {
    const docRef = await addDoc(collection(db, 'health_readings'), {
      ...data,
      userId,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding health reading: ", error);
    throw error;
  }
};

// 2. Real-time listener for Dashboard
// Listens to health readings for a specific user and updates automatically when new data arrives
export const subscribeToHealthData = (userId, callback) => {
  const q = query(
    collection(db, 'health_readings'), 
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const readings = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    callback(readings);
  }, (error) => {
    console.error("Error fetching real-time health data:", error);
  });

  return unsubscribe; // Call this to stop listening when component unmounts
};
