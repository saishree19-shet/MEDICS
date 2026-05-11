import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Activity, Wind, Battery, Sparkles } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

// Mock ECG Data
const ecgData = [
  { val: 50 }, { val: 50 }, { val: 100 }, { val: 20 }, { val: 60 }, { val: 50 },
  { val: 50 }, { val: 50 }, { val: 90 }, { val: 30 }, { val: 55 }, { val: 50 }
];

export default function Monitor() {
  const { heartRate, spo2 } = useHealth();

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <header className="app-header">
        <div className="header-title">
          <img src="https://i.pravatar.cc/100?img=5" alt="Profile" className="avatar" />
          SheCare AI
        </div>
        <button className="icon-btn">
          <Bell size={24} />
        </button>
      </header>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
        <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)' }}>LIVE SYNCING...</span>
      </div>

      {/* Heart Rate Live Card */}
      <div className="card-purple" style={{ padding: '24px 20px' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ color: 'var(--primary)', fontSize: '18px' }}>Heart Rate</h3>
            <p className="text-xs" style={{ color: 'var(--text-dark)', opacity: 0.7 }}>Current Frequency</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>{heartRate}</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-light)', marginLeft: '4px' }}>BPM</span>
          </div>
        </div>

        <div style={{ height: '100px', margin: '24px 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ecgData}>
              <Line type="step" dataKey="val" stroke="var(--primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: 'var(--white)', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', color: 'var(--text-dark)' }}>
            Resting: 62 BPM
          </div>
          <div style={{ background: 'var(--white)', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', color: 'var(--text-dark)' }}>
            Peak: 128 BPM
          </div>
        </div>
      </div>

      {/* SpO2 Card */}
      <div className="card">
        <div className="metric-icon-box metric-icon-purple" style={{ marginBottom: '16px' }}>
          <Wind size={20} />
        </div>
        <h3 style={{ fontSize: '18px', color: 'var(--primary)' }}>SpO2</h3>
        <p className="text-xs" style={{ color: 'var(--text-light)', marginBottom: '8px' }}>Oxygen Saturation</p>
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
          <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>{spo2}</span>
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-light)', marginLeft: '4px' }}>%</span>
        </div>
        <div className="progress-bg" style={{ height: '8px', marginBottom: '8px' }}>
          <div className="progress-fill" style={{ width: `${spo2}%` }} />
        </div>
        <p className="text-xs" style={{ color: 'var(--text-dark)', fontWeight: '500' }}>Optimal Range</p>
      </div>

      {/* Fatigue Card */}
      <div className="card">
        <div className="metric-icon-box metric-icon-purple" style={{ marginBottom: '16px', background: '#F3F0FF', color: '#4F46E5' }}>
          <Battery size={20} />
        </div>
        <h3 style={{ fontSize: '18px', color: 'var(--primary)' }}>Fatigue</h3>
        <p className="text-xs" style={{ color: 'var(--text-light)', marginBottom: '8px' }}>Daily Readiness</p>
        <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)', marginBottom: '16px' }}>
          Low
        </div>
        <div style={{ background: 'var(--primary-light)', padding: '16px', borderRadius: '12px' }}>
          <p className="text-xs" style={{ color: 'var(--primary)', fontWeight: '600', margin: 0 }}>
            AI Suggestion: High energy detected. Great time for a workout.
          </p>
        </div>
      </div>

      {/* Health AI Insight */}
      <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div className="metric-icon-box" style={{ background: 'var(--primary)', color: 'var(--white)', borderRadius: '50%', width: '48px', height: '48px', flexShrink: 0 }}>
          <Sparkles size={24} />
        </div>
        <div>
          <h3 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Health AI Insight</h3>
          <p className="text-xs" style={{ color: 'var(--text-dark)', lineHeight: '1.6' }}>
            Your vitals show perfect synchronization with your circadian rhythm. Keep this pace for optimal recovery tonight.
          </p>
        </div>
      </div>

    </motion.div>
  );
}
