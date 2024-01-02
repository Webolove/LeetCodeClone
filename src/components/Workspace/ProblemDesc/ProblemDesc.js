import CircleSkeleton from '@/components/Skeletons/CircleSkeleton';
import RectangleSkeleton from '@/components/Skeletons/RectangleSkeleton';
import { auth, firestore } from '@/firebase/firebase';
import { problems } from '@/utils/Problems';
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { AiFillDislike, AiFillLike, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti';

export default function ProblemDesc({ problemDesc, localSolved }) {
	const { currProblem, loading, problemDiffClass, setCurrProblem } = useGetCurrentProblem(problemDesc);
	const { liked, disliked, solved, starred, setData } = useGetUserInfoOnProblem(problemDesc);
	const [user] = useAuthState(auth);
	const [updating, setUpdating] = useState(false);

	const handleLike = async () => {
		if (!user) {
			toast.error("O_o it seems you are not logged in !!")
			return;
		}

		if (updating)
			return;

		setUpdating(true);
		try {
			await runTransaction(firestore, async (transaction) => {
				const userRef = doc(firestore, 'users', user.uid);
				const problemRef = doc(firestore, 'Problems', problemDesc);

				const userSnap = await transaction.get(userRef);
				const problemSnap = await transaction.get(problemRef);

				if (userSnap.exists() && problemSnap.exists()) {
					if (liked) {
						transaction.update(userRef, {
							likedProblems: userSnap.data().likedProblems.filter((id) => { id != problemDesc })
						})

						transaction.update(problemRef, {
							likes: problemSnap.data.likes - 1
						})

						setCurrProblem(prev => ({ ...prev, likes: prev.likes - 1 }))
						setData(prev => ({ ...prev, liked: false }))
					} else if (disliked) {
						transaction.update(userRef, {
							likedProblems: [...userSnap.data().likedProblems, problemDesc],
							dislikedProblems: userSnap.data().dislikedProblems.filter((id) => { id != problemDesc })
						})

						transaction.update(problemRef, {
							likes: problemSnap.data().likes + 1,
							dislikes: problemSnap.data().dislikes - 1
						})

						setCurrProblem(prev => ({ ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }));
						setData(prev => ({ liked: true, disliked: false }))
					} else {
						transaction.update(userRef, {
							likedProblems: [...userSnap.data().likedProblems, problemDesc]
						})
						transaction.update(problemRef, {
							likes: problemSnap.data().likes + 1
						})

						setCurrProblem(prev => ({ ...prev, likes: prev.likes + 1 }))
						setData(prev => ({ ...prev, liked: true }))
					}
				}
			})
		} catch (e) {
			toast.error("Network issue.");
		}
		setUpdating(false);
	}

	const handleDislike = async () => {
		if (!user) {
			toast.error("O_o it seems you are not logged in !!")
			return;
		}

		if (updating)
			return;

		setUpdating(true);
		try {
			await runTransaction(firestore, async (transaction) => {
				const userRef = doc(firestore, 'users', user.uid);
				const problemRef = doc(firestore, 'Problems', problemDesc);

				const userSnap = await transaction.get(userRef);
				const problemSnap = await transaction.get(problemRef);

				if (userSnap.exists() && problemSnap.exists()) {
					if (disliked) {
						transaction.update(userRef, {
							dislikedProblems: userSnap.data().dislikedProblems.filter((id) => { id != problemDesc })
						})

						transaction.update(problemRef, {
							dislikes: problemSnap.data.dislikes - 1
						})

						setCurrProblem(prev => ({ ...prev, dislikes: prev.dislikes - 1 }))
						setData(prev => ({ ...prev, disliked: false }))
					} else if (liked) {
						transaction.update(userRef, {
							dislikedProblems: [...userSnap.data().dislikedProblems, problemDesc],
							likedProblems: userSnap.data().likedProblems.filter((id) => { id != problemDesc })
						})

						transaction.update(problemRef, {
							dislikes: problemSnap.data().dislikes + 1,
							likes: problemSnap.data().likes - 1
						})

						setCurrProblem(prev => ({ ...prev, likes: prev.likes - 1, dislikes: prev.dislikes + 1 }));
						setData(prev => ({ liked: false, disliked: true }))
					} else {
						transaction.update(userRef, {
							dislikedProblems: [...userSnap.data().dislikedProblems, problemDesc]
						})
						transaction.update(problemRef, {
							dislikes: problemSnap.data().dislikes + 1
						})

						setCurrProblem(prev => ({ ...prev, dislikes: prev.dislikes + 1 }))
						setData(prev => ({ ...prev, disliked: true }))
					}
				}
			})
		} catch (e) {
			toast.error("Network issue.");
		}
		setUpdating(false);
	}

	const handleStarred = async () => {
		if (!user) {
			toast.error("O_o it seems you are not logged in !!")
			return;
		}
		if (updating) return;

		setUpdating(true);
		const userRef = doc(firestore, "users", user.uid);
		if (!starred) {
			await updateDoc(userRef, {
				starredProblems: arrayUnion(problemDesc)
			})
			setData(prev => ({ ...prev, starred: true }))
		} else {
			await updateDoc(userRef, {
				starredProblems: arrayRemove(problemDesc)
			})
			setData(prev => ({ ...prev, starred: false }))
		}

		setUpdating(false);
	}

	const statement = problems[problemDesc].problemStatement;
	const setStatement = () => {
		return { __html: statement };
	}

	const constraint = problems[problemDesc].constraints;
	const setConstraints = () => {
		return { __html: constraint };
	}

	return (
		<div className='bg-dark-layer-1 p-10px box-content'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{!loading && currProblem && currProblem.title}
								{loading && <RectangleSkeleton />}</div>
						</div>
						{!loading && currProblem && <div className='flex items-center mt-3'>
							<div
								className={`${problemDiffClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
							>
								{currProblem.difficulty}
							</div>
							{(solved || localSolved) && <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
								<BsCheck2Circle />
							</div>}
							<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6' onClick={handleLike}>
								{updating ? <AiOutlineLoading3Quarters className='animate-spin' /> : liked ? <AiFillLike className='text-blue-500' /> : <AiFillLike />}

								<span className='text-xs'>{currProblem.likes}</span>
							</div>
							<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6' onClick={handleDislike}>
								{updating ? <AiOutlineLoading3Quarters className='animate-spin' /> : disliked ? <AiFillDislike className='text-blue-500' /> : <AiFillDislike />}
								<span className='text-xs'>{currProblem.dislikes}</span>
							</div>
							<div className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 ' onClick={handleStarred}>
								{updating ? <AiOutlineLoading3Quarters className='animate-spin' /> : starred ? <TiStarFullOutline className='text-yellow-500' /> : <TiStarOutline />}
							</div>
						</div>}

						{loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-olive text-sm' dangerouslySetInnerHTML={setStatement()}></div>

						{/* Examples */}
						<div className='mt-4'>
							{
								problems[problemDesc].examples.map((example, index) => {
									return (
										<div>
											<p className='font-medium text-white '>Example {index + 1}: </p>
											<div className='example-card p-4 bg-dark-fill-2  rounded-md mt-4 mb-2'>
												<div className='text-olive exampleFont'>
													<strong className='text-white'>Input: </strong><span>{example.inputText}</span>
													<br />
													<strong className='text-white'>Output: </strong><span>{example.outputText}</span><br />

													<strong className='text-white'>Explanation: </strong><span>Because nums[0] + nums[1] == 9, we return [0, 1].</span>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>

						{/* Constraints */}
						<div className='my-5 pb-8'>
							<div className='text-white text-sm font-medium'>Constraints:</div>

							<ul className='text-white ml-5 list-disc' dangerouslySetInnerHTML={setConstraints()}>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	function useGetCurrentProblem(ProblemId) {
		const [currProblem, setCurrProblem] = useState(null);
		const [loading, setLoading] = useState(true);
		const [problemDiffClass, setProblemDiffClass] = useState("");

		useEffect(() => {
			const getCurrProblem = async () => {
				setLoading(true);
				const docRef = doc(firestore, "Problems", ProblemId);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					const problem = docSnap.data();
					setCurrProblem({ id: docSnap.id, ...problem });
					setProblemDiffClass(
						problem.difficulty === "Easy" ? "bg-olive text-olive" : problem.difficulty === "Medium" ? "bg-dark-yellow text-dark-yellow" : "bg-dark-pink text-dark-pink"
					)
				}
				setLoading(false);
			}
			getCurrProblem();
		}, [ProblemId])
		return { currProblem, loading, problemDiffClass, setCurrProblem };
	}

	function useGetUserInfoOnProblem(ProblemId) {
		const [data, setData] = useState({ liked: false, disliked: false, solved: false, starred: false });
		const [user] = useAuthState(auth);
		useEffect(() => {
			const getUserData = async () => {
				const userRef = doc(firestore, "users", user.uid);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					const userData = userSnap.data();
					const { likedProblems, dislikedProblems, solvedProblems, starredProblems } = userData;
					setData({
						liked: likedProblems.includes(ProblemId),
						disliked: dislikedProblems.includes(ProblemId),
						solved: solvedProblems.includes(ProblemId),
						starred: starredProblems.includes(ProblemId)
					})
				}
			}

			if (user) getUserData();
			return () => setData({ liked: false, disliked: false, solved: false, starred: false });
		}, [ProblemId, user])

		return { ...data, setData };
	}
}
