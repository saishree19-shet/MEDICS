import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Emergency Service
 * Handles triggering the SOS alert which writes to the 'emergency_alerts' collection.
 */

export const triggerSOS = async (userId, locationData) => {
  try {
    const docRef = await addDoc(collection(db, 'emergency_alerts'), {
      userId,
      location: locationData,
      status: 'Active',
      triggeredAt: new Date()
    });
    
    // In a production app, adding a document here would trigger a Firebase Cloud Function
    // which then sends SMS via Twilio or FCM Push Notifications to emergency contacts.
    
    return docRef.id;
  } catch (error) {
    console.error("Failed to trigger SOS:", error);
    throw error;
  }
};
