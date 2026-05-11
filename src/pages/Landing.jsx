import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartPulse, Activity, Shield, Users, ArrowRight, Play, LineChart, ShieldCheck, Lock, FileCheck, Download } from 'lucide-react';
import './Landing.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Abstract Background Blobs */}
      <div className="landing-blob landing-blob-1"></div>
      <div className="landing-blob landing-blob-2"></div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="logo">
          <HeartPulse size={28} color="var(--primary)" />
          <span>SheCare AI</span>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="landing-btn-glass" style={{ border: 'none', background: 'transparent' }}>Log In</Link>
          <Link to="/login" className="landing-btn-glass">Get Started</Link>
        </div>
      </nav>

      <main className="landing-main">
        {/* Hero Section */}
        <motion.section 
          className="landing-hero-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="landing-hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span style={{ fontSize: '16px' }}>✨</span> AI-Driven Health Intelligence
          </motion.div>
          
          <h1 className="landing-hero-title">
            Smart Wellness for <br/>
            <span className="landing-text-gradient">Every Woman</span>
          </h1>
          
          <p className="landing-hero-subtitle">
            Experience radical empathy through technology. SheCare AI provides personalized health insights, cycle tracking, and mental wellness support in one beautiful interface.
          </p>

          <div className="landing-hero-cta">
            <Link to="/login" className="landing-btn-large">
              Start Your Journey <ArrowRight size={20} />
            </Link>
            <a href="#demo" className="landing-btn-video">
              <Play size={20} color="var(--primary)" /> Watch Demo
            </a>
          </div>
        </motion.section>

        {/* Dashboard Preview (CSS Mockup for premium feel without images) */}
        <motion.div 
          className="landing-dashboard-preview"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="css-mockup">
            <div className="css-mockup-header">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="css-mockup-avatar"></div>
                <div>
                  <div style={{ width: '120px', height: '16px', background: '#E0E0E0', borderRadius: '8px', marginBottom: '8px' }}></div>
                  <div style={{ width: '80px', height: '12px', background: '#F0F0F0', borderRadius: '6px' }}></div>
                </div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)' }}></div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="css-mockup-card" style={{ flex: 2, height: '160px', background: 'var(--primary-light)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(90, 79, 207, 0.1)' }}></div>
                <div style={{ position: 'absolute', right: '40px', bottom: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(90, 79, 207, 0.1)' }}></div>
                <div style={{ zIndex: 1 }}>
                  <div style={{ width: '140px', height: '24px', background: 'var(--primary)', borderRadius: '12px', marginBottom: '16px', opacity: 0.8 }}></div>
                  <div style={{ width: '200px', height: '12px', background: 'var(--primary)', borderRadius: '6px', marginBottom: '8px', opacity: 0.5 }}></div>
                  <div style={{ width: '180px', height: '12px', background: 'var(--primary)', borderRadius: '6px', opacity: 0.5 }}></div>
                </div>
              </div>
              <div className="css-mockup-card" style={{ flex: 1, height: '160px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div className="css-mockup-icon" style={{ background: '#FFE5E5', marginBottom: '12px' }}></div>
                <div style={{ width: '80px', height: '16px', background: '#E0E0E0', borderRadius: '8px', marginBottom: '8px' }}></div>
                <div style={{ width: '60px', height: '24px', background: '#1A1A1A', borderRadius: '12px' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.section 
          className="landing-features-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginTop: '120px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', color: 'var(--text-dark)', marginBottom: '16px' }}>Precision Tools for Modern Care</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
              Our ecosystem combines advanced AI diagnostics with human-centric design to support you through every stage of life.
            </p>
          </div>

          <div className="landing-features-grid">
            <motion.div className="landing-feature-card" variants={itemVariants}>
              <div className="landing-feature-icon">
                <LineChart size={32} />
              </div>
              <h3 className="landing-feature-title">Predictive Analytics</h3>
              <p className="landing-feature-desc">
                SheCare analyzes subtle physiological changes to predict energy dips, hormonal shifts, and potential health risks before they occur.
              </p>
            </motion.div>

            <motion.div className="landing-feature-card" variants={itemVariants}>
              <div className="landing-feature-icon">
                <Users size={32} />
              </div>
              <h3 className="landing-feature-title">Her Circle Community</h3>
              <p className="landing-feature-desc">
                A secure, anonymous space. Filtered by life stages from PCOS journey to motherhood, find your tribe and share experiences safely.
              </p>
            </motion.div>

            <motion.div className="landing-feature-card" variants={itemVariants}>
              <div className="landing-feature-icon">
                <Shield size={32} />
              </div>
              <h3 className="landing-feature-title">Safety & Emergency</h3>
              <p className="landing-feature-desc">
                Integrated SOS feature connects you with local emergency services and pre-set guardians, sharing vital health data instantly.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Security Section */}
        <motion.section 
          className="landing-security-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="security-content">
            <motion.h2 variants={itemVariants}>Investor-Ready Trust & Security</motion.h2>
            <motion.p variants={itemVariants}>We maintain the highest standards of data integrity and patient confidentiality, ensuring your medical information is protected by bank-grade protocols.</motion.p>
            <motion.ul className="security-list" variants={containerVariants}>
              <motion.li variants={itemVariants}><ShieldCheck size={20} color="var(--primary)" /> HIPAA Compliance & SOC2 Type II Audit Status</motion.li>
              <motion.li variants={itemVariants}><Lock size={20} color="var(--primary)" /> AES-256 Military Grade End-to-End Encryption</motion.li>
              <motion.li variants={itemVariants}><FileCheck size={20} color="var(--primary)" /> Full GDPR and CCPA Data Sovereignty</motion.li>
            </motion.ul>
          </div>
          <motion.div className="security-badges" variants={itemVariants}>
            <div className="badge-row">
              <div className="security-badge">HIPAA <span>COMPLIANT</span></div>
              <div className="security-badge">SOC2 <span>TYPE II CERTIFIED</span></div>
            </div>
            <div className="security-badge full-width"><ShieldCheck size={18} color="var(--primary)" /> AES-256 DATA ENCRYPTION</div>
          </motion.div>
        </motion.section>

        {/* Testimonials */}
        <motion.section 
          className="landing-testimonials-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants}>Trusted by the Community</motion.h2>
          <div className="testimonials-grid">
            <motion.div className="testimonial-card" variants={itemVariants}>
              <p className="quote">"SheCare AI has completely transformed how I track performance metrics across my cycle. The clinical accuracy is unmatched."</p>
              <div className="author">
                <div className="avatar">PS</div>
                <div>
                  <h4>Priya Sharma</h4>
                  <span>Fitness Coach</span>
                </div>
              </div>
            </motion.div>
            <motion.div className="testimonial-card" variants={itemVariants}>
              <p className="quote">"The postpartum support and specialist access helped me navigate the first six months with total confidence and peace of mind."</p>
              <div className="author">
                <div className="avatar">AP</div>
                <div>
                  <h4>Ananya Patel</h4>
                  <span>New Mother</span>
                </div>
              </div>
            </motion.div>
            <motion.div className="testimonial-card" variants={itemVariants}>
              <p className="quote">"As an engineer, I appreciate the data transparency and the rigorous security protocols. It's the only platform I trust."</p>
              <div className="author">
                <div className="avatar">NG</div>
                <div>
                  <h4>Neha Gupta</h4>
                  <span>Software Engineer</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          className="landing-bottom-cta"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-card">
            <h2>Start Your Journey to Better Health</h2>
            <p>Join 50,000+ women utilizing clinical-grade AI to master their wellness.</p>
            <div className="cta-buttons">
              <Link to="/login" className="landing-btn-large"><Download size={20}/> Download App</Link>
              <Link to="/login" className="landing-btn-glass" style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '18px 40px', fontSize: '18px' }}>Claim 30 Days Pro Free</Link>
            </div>
          </div>
        </motion.section>

      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <HeartPulse size={24} color="var(--primary)" />
              SheCare AI
            </div>
            <p className="footer-tagline">Radical empathy through futuristic technology. Your wellness, redefined.</p>
          </div>
          
          <div className="footer-grid">
            <div className="footer-column">
              <h4>Platform</h4>
              <a href="#">Features</a>
              <a href="#">Pro Membership</a>
              <a href="#">Emergency SOS</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Health Blog</a>
              <a href="#">Community Guidelines</a>
              <a href="#">Partner Clinics</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">© 2026 SheCare AI. Atmospheric Wellness</div>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
          <div className="social-icons">
            <div className="social-icon"></div>
            <div className="social-icon"></div>
            <div className="social-icon"></div>
          </div>
        </div>
      </footer>
    </div>

  );
}
