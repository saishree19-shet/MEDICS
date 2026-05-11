import React, { createContext, useState, useEffect, useContext } from 'react';
import { triggerSOS as triggerSOSService } from '../services/emergencyService';
import { useAuth } from './AuthContext';

const HealthContext = createContext();

export const useHealth = () => useContext(HealthContext);

export const HealthProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [healthData, setHealthData] = useState({
    heartRate: 75,
    spo2: 98,
    temperature: 36.5,
    fallDetected: false,
    history: []
  });

  useEffect(() => {
    // Simulate real-time ESP32 IoT sensor data every 3 seconds
    const interval = setInterval(() => {
      setHealthData(prev => {
        const newHR = 65 + Math.floor(Math.random() * 46); // 65-110
        const newSpO2 = 95 + Math.floor(Math.random() * 6); // 95-100
        const newTemp = +(36.0 + (Math.random() * 2.0)).toFixed(1); // 36.0-38.0

        const newReading = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          heartRate: newHR,
          spo2: newSpO2,
          temperature: newTemp
        };

        // Keep last 10 readings for the chart
        const updatedHistory = [...prev.history, newReading].slice(-10);

        return {
          ...prev,
          heartRate: newHR,
          spo2: newSpO2,
          temperature: newTemp,
          history: updatedHistory
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const triggerSOS = async () => {
    console.log("SOS Triggered! Alerts sent to emergency contacts.");
    if (currentUser) {
      try {
        await triggerSOSService(currentUser.uid, { lat: 0, lng: 0 }); // Hardcoded location for now
        alert('Emergency SOS dispatched to your contacts!');
      } catch (error) {
        console.error("Failed to send SOS", error);
      }
    } else {
      alert("Please login to use SOS.");
    }
  };

  return (
    <HealthContext.Provider value={{ ...healthData, triggerSOS }}>
      {children}
    </HealthContext.Provider>
  );
};
