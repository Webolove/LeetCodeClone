"use client"
import QuestionList from '@/components/QuestionList'
import TopBar from '@/components/TopBar/TopBar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export default function Home() {

  const [user] = useAuthState(auth);

  function useGetProblemRecords() {
    const [problemRecord, setProblemRecord] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getCurrProblem = async () => {
        setLoading(true);
        if (user) {
          const userRef = doc(firestore, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setProblemRecord(userData.solvedProblems);
          }
        }
        setLoading(false);
      }
      getCurrProblem();
    }, [user])
    return { problemRecord, loading };
  }

  const { problemRecord, loading } = useGetProblemRecords();


  return (
    <>
      <div className='bg-dark-layer-2 min-h-screen'>
        <TopBar problemPage={false} />
        <QuestionList problemRecord={problemRecord} loading={loading} />
      </div>
    </>
  )
}
