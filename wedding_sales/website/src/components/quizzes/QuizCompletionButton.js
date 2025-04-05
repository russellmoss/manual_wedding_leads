import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function QuizCompletionButton({ category, quizId, quizTitle }) {
  const { currentUser } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleQuizComplete = async () => {
    try {
      setIsLoading(true);
      const quizKey = `${category}-${quizId}`;
      console.log('Marking quiz as complete:', quizKey);
      
      // Update localStorage
      const localCompletedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
      localCompletedQuizzes[quizKey] = {
        completedAt: new Date().toISOString(),
        title: quizTitle
      };
      localStorage.setItem('completedQuizzes', JSON.stringify(localCompletedQuizzes));
      console.log('Updated localStorage:', localCompletedQuizzes);
      
      // Update Firestore if user is logged in
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const currentData = userDoc.data();
          const quizProgress = currentData.quizProgress || {};
          console.log('Current Firestore quiz progress:', quizProgress);
          
          // Update the specific quiz's completion status
          quizProgress[quizKey] = {
            completed: true,
            completedAt: new Date().toISOString(),
            title: quizTitle
          };
          console.log('Updated Firestore quiz progress:', quizProgress);
          
          // Update the user document
          await setDoc(userRef, {
            ...currentData,
            quizProgress
          }, { merge: true });
          console.log('Successfully updated Firestore');
        }
      }
      
      // Show completion message
      setShowMessage(true);
      setIsCompleted(true);
      
      // Redirect to quizzes page after a short delay
      setTimeout(() => {
        // Force a hard refresh of the page to ensure the completion status is updated
        window.location.href = '/quizzes';
      }, 2000);
    } catch (error) {
      console.error('Error updating quiz completion status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 text-center">
      {showMessage ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Quiz marked as completed. Redirecting to quizzes page...</span>
        </div>
      ) : (
        <button
          onClick={handleQuizComplete}
          disabled={isLoading || isCompleted}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isLoading || isCompleted
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Processing...' : isCompleted ? 'Already Completed' : 'Mark as Completed'}
        </button>
      )}
    </div>
  );
}

export default QuizCompletionButton; 