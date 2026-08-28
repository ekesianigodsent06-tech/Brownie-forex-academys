import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore,
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  type Firestore
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { TestimonialItem } from '../types';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with robust auto-detect long polling for iframe & restricted network compatibility
function createFirestoreInstance(): Firestore {
  try {
    const dbId = firebaseConfig.firestoreDatabaseId;
    if (dbId) {
      return initializeFirestore(app, {
        experimentalAutoDetectLongPolling: true,
      }, dbId);
    }
    return initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
    });
  } catch {
    return firebaseConfig.firestoreDatabaseId 
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  }
}

export const db: Firestore = createFirestoreInstance();

const REVIEWS_COLLECTION = 'student_reviews';

export interface CloudReview {
  id?: string;
  studentName: string;
  location?: string;
  role: string;
  experienceLevel: string;
  courseTaken: string;
  headline?: string;
  content: string;
  rating: number;
  date: string;
  createdAt?: unknown;
  isVerified?: boolean;
}

/**
 * Subscribe to real-time student reviews from Firebase Firestore.
 * Automatically receives updates whenever any student anywhere submits a review.
 */
export function subscribeToStudentReviews(
  onReviewsUpdate: (reviews: TestimonialItem[]) => void,
  onError?: (error: Error) => void
) {
  try {
    const reviewsRef = collection(db, REVIEWS_COLLECTION);
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));

    return onSnapshot(
      q,
      (snapshot) => {
        const cloudReviews: TestimonialItem[] = snapshot.docs.map((doc) => {
          const data = doc.data() as CloudReview;
          return {
            id: doc.id,
            studentName: data.studentName || 'Academy Student',
            role: data.role || 'Verified Student',
            experienceLevel: data.experienceLevel || 'Academy Alumni',
            location: data.location || 'Nigeria',
            courseTaken: data.courseTaken || 'Gold & Synthetic Strategy',
            headline: data.headline || 'Verified Student Review',
            content: data.content || '',
            rating: typeof data.rating === 'number' ? data.rating : 5,
            date: data.date || 'Recent',
            isVerified: data.isVerified ?? true,
            isPlaceholder: false,
          };
        });
        onReviewsUpdate(cloudReviews);
      },
      (error) => {
        console.warn('Firestore subscription notice (using fallback cached reviews):', error.message);
        if (onError) onError(error);
      }
    );
  } catch (err) {
    console.error('Error establishing Firestore review listener:', err);
    return () => {};
  }
}

/**
 * Submit a student review to Firestore cloud database so it becomes
 * globally visible to all visitors in real-time.
 */
export async function submitStudentReview(reviewData: Omit<TestimonialItem, 'id'>): Promise<string> {
  const reviewsRef = collection(db, REVIEWS_COLLECTION);
  const docRef = await addDoc(reviewsRef, {
    studentName: reviewData.studentName.trim(),
    location: reviewData.location?.trim() || 'Nigeria',
    role: reviewData.role || 'Academy Graduate',
    experienceLevel: reviewData.experienceLevel || 'Academy Alumni',
    courseTaken: reviewData.courseTaken || 'Gold (XAU/USD) Sniper Mastery',
    headline: reviewData.headline?.trim() || 'Genuine Student Feedback',
    content: reviewData.content.trim(),
    rating: Number(reviewData.rating) || 5,
    date: new Date().toLocaleDateString('en-NG', { month: 'long', year: 'numeric' }),
    createdAt: serverTimestamp(),
    isVerified: true,
  });

  return docRef.id;
}

export interface InquirySubmission {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

/**
 * Persist admission inquiries to Firestore
 */
export async function saveInquiryToFirestore(inquiry: InquirySubmission): Promise<string> {
  const inquiriesRef = collection(db, 'inquiries');
  const docRef = await addDoc(inquiriesRef, {
    name: inquiry.name.trim(),
    email: inquiry.email.trim(),
    phone: inquiry.phone.trim(),
    course: inquiry.course,
    message: inquiry.message.trim(),
    recipientEmail: 'brownieforexacademy@gmail.com',
    status: 'new',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
