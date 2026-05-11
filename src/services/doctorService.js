import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Doctor & Appointments Service
 * Handles fetching nearby doctors and booking consultations.
 */

// 1. Fetch available doctors based on a specialty or location (mocked parameter)
export const getNearbyDoctors = async (specialty = null) => {
  try {
    let q = collection(db, 'doctors');
    if (specialty) {
      q = query(q, where('specialty', '==', specialty));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// 2. Book an appointment
export const bookAppointment = async (userId, doctorId, date, timeSlot) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      userId,
      doctorId,
      date,
      timeSlot,
      status: 'Pending',
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

// 3. Fetch user's appointment history
export const getUserAppointments = async (userId) => {
  try {
    const q = query(collection(db, 'appointments'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw error;
  }
};
