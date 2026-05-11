import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, Share2, MoreHorizontal, Plus, Link as LinkIcon, Heart, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { subscribeToCommunityFeed, createPost, upvotePost } from '../services/communityService';
import './Community.css';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
};

export default function Community() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeCircle, setActiveCircle] = useState('All Threads');
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    // Subscribe to real-time feed updates
    const unsubscribe = subscribeToCommunityFeed(activeCircle, (fetchedPosts) => {
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, [activeCircle]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    if (!currentUser) return alert('Please login to post.');

    setIsSubmitting(true);
    try {
      const anonName = `Anonymous ${Math.random().toString(36).substring(2, 6)}`;
      await createPost(
        currentUser.uid, 
        anonName, 
        "", // no title needed for quick thoughts
        newPostContent, 
        activeCircle === 'All Threads' ? 'General' : activeCircle
      );
      setNewPostContent('');
    } catch (error) {
      console.error(error);
      alert('Failed to post');
    }
    setIsSubmitting(false);
  };

  const handleUpvote = async (postId) => {
    try {
      await upvotePost(postId);
    } catch (err) {
      console.error(err);
    }
  };

  const displayName = currentUser?.displayName || 'Anonymous Member';
  const photoUrl = currentUser?.photoURL;

  const circles = [
    { name: 'All Threads', icon: '🔗' },
    { name: 'Menstrual Health', icon: '💧' },
    { name: 'PCOS Journey', icon: '🔄' },
    { name: 'Emotional Support', icon: '🤍' }
  ];

  return (
    <motion.div className="community-page" initial="initial" animate="in" exit="out" variants={pageVariants}>
      
      {/* Top Bar matching screenshot */}
      <div className="community-topbar">
        <div className="community-search">
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="Search discussions..." />
        </div>
        <div className="community-profile-badge">
          <div className="info">
            <h4>{displayName}</h4>
            <span>LEVEL 4 CONTRIBUTOR</span>
          </div>
          <div className="avatar" style={{ overflow: 'hidden' }}>
            {photoUrl ? <img src={photoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" /> : <User size={20} />}
          </div>
        </div>
      </div>

      <div className="community-grid">
        {/* Left Column */}
        <div className="community-left">
          <div className="sidebar-block">
            <h3 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Circles</h3>
            <div>
              {circles.map(c => (
                <div 
                  key={c.name} 
                  className={`circle-item ${activeCircle === c.name ? 'active' : ''}`}
                  onClick={() => setActiveCircle(c.name)}
                >
                  <span style={{ fontSize: '16px', opacity: activeCircle === c.name ? 1 : 0.6 }}>{c.icon}</span>
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-block">
            <h3><span style={{ color: 'var(--danger)' }}>📈</span> Trending Now</h3>
            <div className="trending-tag">
              <h4>#CycleSyncingTips</h4>
              <span>1.2k conversations today</span>
            </div>
            <div className="trending-tag">
              <h4>#EndometriosisAwareness</h4>
              <span>850 active members</span>
            </div>
            <div className="trending-tag">
              <h4>#NewMomsSupport</h4>
              <span>400 online now</span>
            </div>
          </div>
        </div>

        {/* Center Column - Feed */}
        <div className="community-center">
          <div className="post-input-box">
            <div className="post-author-avatar" style={{ width: '32px', height: '32px', background: '#F4F4F5', overflow: 'hidden' }}>
              {photoUrl ? <img src={photoUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" /> : <User size={16} color="var(--text-muted)" />}
            </div>
            <input 
              type="text" 
              placeholder="Share your thoughts anonymously..." 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreatePost()}
              disabled={isSubmitting}
            />
            <button className="btn-icon-primary" onClick={handleCreatePost} disabled={isSubmitting}>
              <Plus size={20} />
            </button>
          </div>

          {/* Dynamic Firebase Posts */}
          {posts.map(post => (
            <div className="feed-post" key={post.id}>
              <div className="post-header">
                <div className="post-author">
                  <div className="post-author-avatar">{post.anonymousName?.charAt(0) || 'A'}</div>
                  <div>
                    <h4>{post.anonymousName || 'Anonymous'} <span className="post-badge">{post.category?.toUpperCase() || 'GENERAL'}</span></h4>
                    <span className="post-time">Just now</span>
                  </div>
                </div>
                <MoreHorizontal size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              </div>
              {post.title && <h2 className="post-title">{post.title}</h2>}
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <div className="vote-btn">
                  <button onClick={() => handleUpvote(post.id)}><ChevronUp size={18} /></button>
                  {post.upvotes || 0}
                  <button><ChevronDown size={18} /></button>
                </div>
                <button className="action-btn">
                  <MessageCircle size={18} /> {post.commentsCount || 0} Comments
                </button>
                <button className="action-btn">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>
          ))}

          {/* Dummy Posts (Only show if DB is empty) */}
          {posts.length === 0 && (
            <>
              {/* Post 1 */}
          <div className="feed-post">
            <div className="post-header">
              <div className="post-author">
                <div className="post-author-avatar">A</div>
                <div>
                  <h4>Anonymous Lavender <span className="post-badge">PCOS JOURNEY</span></h4>
                  <span className="post-time">Posted 2 hours ago</span>
                </div>
              </div>
              <MoreHorizontal size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>
            <h2 className="post-title">Finally found a workout routine that doesn't trigger my PCOS fatigue. Anyone else struggle with high-intensity training?</h2>
            <p className="post-content">
              I've been trying to stick to HIIT for months because everyone says it's best for weight management, but I always felt like a zombie for 2 days after. Switched to slow-weighted movements and long walks. The difference is night and day.
            </p>
            <div className="post-actions">
              <div className="vote-btn">
                <button><ChevronUp size={18} /></button>
                248
                <button><ChevronDown size={18} /></button>
              </div>
              <button className="action-btn">
                <MessageCircle size={18} /> 42 Comments
              </button>
              <button className="action-btn">
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>

          {/* Post 2 */}
          <div className="feed-post">
            <div className="post-header">
              <div className="post-author">
                <div className="post-author-avatar" style={{ background: '#E8F5E9', color: '#2E7D32' }}>🌿</div>
                <div>
                  <h4>NatureNurture <span className="post-badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>MENSTRUAL HEALTH</span></h4>
                  <span className="post-time">Posted 5 hours ago</span>
                </div>
              </div>
              <MoreHorizontal size={20} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>
            <h2 className="post-title">Preparing my "Cycle Care Basket" for next week. What are your essentials? 🍵✨</h2>
            <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80" alt="Cycle Care Basket" className="post-image" />
            <div className="post-actions">
              <div className="vote-btn">
                <button><ChevronUp size={18} /></button>
                1.1k
                <button><ChevronDown size={18} /></button>
              </div>
              <button className="action-btn">
                <MessageCircle size={18} /> 89 Comments
              </button>
              <button className="action-btn">
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
            </>
          )}
        </div>

        {/* Right Column */}
        <div className="community-right">
          {/* AI Insight */}
          <div className="sidebar-block insight-card" style={{ background: '#FAFAFD' }}>
            <h3 style={{ justifyContent: 'center' }}>
              <span style={{ color: 'var(--primary)' }}>✨</span> AI Daily Insight
            </h3>
            <p>"74% of the community reported feeling calmer after practicing 5 minutes of focused breathing today."</p>
            <button className="btn-outline-primary">Join the session</button>
          </div>

          {/* Live Chat Sessions */}
          <div className="sidebar-block">
            <h3>Live Chat Sessions</h3>
            <div className="live-chat-item">
              <div className="live-badge"></div>
              <div className="live-chat-info">
                <h4>Managing Endo Flare-ups</h4>
                <span>Dr. Sarah & 45 others</span>
              </div>
            </div>
            <div className="live-chat-item">
              <div className="live-badge"></div>
              <div className="live-chat-info">
                <h4>New Moms Q&A</h4>
                <span>120 members active</span>
              </div>
            </div>
            <div className="live-chat-item" style={{ opacity: 0.7 }}>
              <div className="live-badge" style={{ background: 'var(--text-muted)' }}></div>
              <div className="live-chat-info">
                <h4>PCOS Nutrition Basics</h4>
                <span>Starts in 2 hours</span>
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="sidebar-block">
            <h3>Top Contributors</h3>
            <div className="contributor-item">
              <div className="contributor-avatar"></div>
              <span>Dr. Elena W. <span style={{ color: 'var(--primary)', fontSize: '14px' }}>✓</span></span>
            </div>
            <div className="contributor-item">
              <div className="contributor-avatar" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}></div>
              <span>WellnessCoach <span style={{ color: '#ccc', fontSize: '14px' }}>✓</span></span>
            </div>
          </div>

          {/* Safety First */}
          <div className="sidebar-block safety-card" style={{ background: '#F8F9FA' }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>Safety First</h3>
            <p>Her Circle is a moderated, safe space. Please be kind and remember that peer support is not a replacement for professional medical advice.</p>
            <a href="#">Community Guidelines</a>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
