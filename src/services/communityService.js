import { collection, addDoc, updateDoc, doc, increment, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Community Service
 * Handles anonymous posting, reading feeds, and upvoting in "Her Circle".
 */

// 1. Create a new community post
export const createPost = async (authorId, anonymousName, title, content, category = 'General') => {
  try {
    const docRef = await addDoc(collection(db, 'community_posts'), {
      authorId,
      anonymousName,
      title,
      content,
      category,
      upvotes: 0,
      commentsCount: 0,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// 2. Upvote a post
export const upvotePost = async (postId) => {
  try {
    const postRef = doc(db, 'community_posts', postId);
    await updateDoc(postRef, {
      upvotes: increment(1)
    });
  } catch (error) {
    console.error("Error upvoting post:", error);
    throw error;
  }
};

// 3. Real-time listener for the main Community feed
export const subscribeToCommunityFeed = (categoryFilter = null, callback) => {
  let q = collection(db, 'community_posts');
  
  if (categoryFilter && categoryFilter !== 'All Threads') {
    q = query(q, where('category', '==', categoryFilter), orderBy('createdAt', 'desc'));
  } else {
    q = query(q, orderBy('createdAt', 'desc'));
  }

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    callback(posts);
  }, (error) => {
    console.error("Error fetching community feed:", error);
  });

  return unsubscribe;
};
