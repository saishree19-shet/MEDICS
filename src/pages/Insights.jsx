import React from 'react';
import { motion } from 'framer-motion';
import { useHealth } from '../context/HealthContext';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

export default function Insights() {
  const { heartRate, spo2, temperature } = useHealth();
  const insights = [];

  if (heartRate > 100) {
    insights.push({ text: "High Stress Indicated: Your heart rate is slightly elevated. Try some deep breathing exercises.", warning: true });
  } else if (heartRate < 60) {
    insights.push({ text: "Low Heart Rate: You seem very relaxed, or you might be experiencing fatigue. Take rest.", warning: true });
  } else {
    insights.push({ text: "Heart Rate Normal: Your heart rate is in a healthy range. Keep it up!", warning: false });
  }

  if (temperature > 37.5) {
    insights.push({ text: "Temperature Slightly Elevated: Make sure to stay hydrated and rest if you feel unwell.", warning: true });
  }

  if (spo2 < 95) {
    insights.push({ text: "Low Oxygen Level: Practice deep breathing and consider getting some fresh air.", warning: true });
  } else {
    insights.push({ text: "Oxygen Levels Optimal: Your SpO2 is excellent.", warning: false });
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
    >
      <header style={{ marginBottom: '24px' }}>
        <h1>Wellness Insights 💡</h1>
        <p>Smart, real-time health advice</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {insights.map((item, idx) => (
          <motion.div 
            key={idx}
            className="glass-card" 
            style={{ 
              backgroundColor: item.warning ? 'var(--danger-light)' : 'white',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {item.warning ? 
              <AlertTriangle color="var(--danger)" size={28} /> : 
              <CheckCircle color="var(--success)" size={28} />
            }
            <p style={{ color: 'var(--text-dark)', fontWeight: 500, margin: 0 }}>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
