'use client'
import React, { useState, useEffect } from 'react'
import Preference from './Preference'
import Split from 'react-split'
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'
import EditorFooter from './EditorFooter'
import { problems } from '@/utils/Problems'
import ProblemDesc from '../ProblemDesc/ProblemDesc'
import { useAuthState } from 'react-firebase-hooks/auth'
import toast from 'react-hot-toast'
import { auth, firestore } from '@/firebase/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

export default function Playground({ setSuccess, problemType, setLocalSolved }) {

    let [userCode, setUserCode] = useState(problems[problemType].starterCode);

    // const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
    const localFont = localStorage.getItem('lcc-fontSize');
    let fonts;
    localFont ? fonts = JSON.parse(localFont) : "16px";

    const [user] = useAuthState(auth);
    const [settings, setSettings] = useState({
        fontSize: fonts,
        settingModelIsOpen: false,
        dropdownIsOpen: false
    })

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Whoops !! Seems like you didn't have logged in.");
            return;
        }

        try {
            userCode = userCode.slice(userCode.indexOf(problems[problemType].StarterFunctionName))
            const cb = new Function(`return ${userCode}`)();
            const result = problems[problemType].handlerfunction(cb);

            if (result) {
                toast.success("Congrats. All test cases passed.", { icon: '🥳' });
                setSuccess(true);

                const userRef = doc(firestore, "users", user.uid);
                await updateDoc(userRef, {
                    solvedProblems: arrayUnion(problemType)
                });
                setLocalSolved(true)
            }
        } catch (e) {
            // console.log(e.message)
            if (e.message.includes("AssertionError"))
                toast("Your code failed for some test cases.", {
                    icon: '🙂', style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                });
            else if (e.message.includes("ReferenceError"))
                toast(e.message, {
                    icon: '🕵🏼', style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                })
            else
                alert(e.message);
        }
    }

    useEffect(() => {
        const code = localStorage.getItem(`code-${problemType}`);
        if (user)
            setUserCode(code ? JSON.parse(code) : problems[problemType].starterCode);
        else
            setUserCode(problems[problemType].starterCode)
    }, [problemType, user, problems[problemType].starterCode])

    const onChange = (value) => {
        setUserCode(value)
        localStorage.setItem(`code-${problemType}`, JSON.stringify(value));
    }

    return (
        <div className='flex flex-col bg-dark-layer-1 relative'>
            <Preference settings={settings} setSettings={setSettings} />

            <Split
                className="h-[calc(100vh-94px)]"
                direction="vertical"
                minSize={60}
                sizes={[60, 40]}
            >
                <div className='w-full overflow-auto'>
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={onChange}
                        extensions={[javascript()]}
                        style={{ fontSize: settings.fontSize }}
                    />
                </div>
                <div className='w-full px-5 overflow-auto pb-5'>
                    <div className="flex h-10 place-items-center space-x-6">
                        <div className="relative h-full flex flex-col justify-center cursor-pointer">
                            <div className="text-sm font-medium leading-5 text-white">Testcases</div>
                            <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="mr-2 mt-2 text-white place-items-start">
                            <div className="flex flex-wrap place-items-center gap-y-4">
                                <div className="font-medium place-items-center focus:outline-none inline-flex transition-all bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                    Case 1
                                </div>
                            </div>
                        </div>
                        <div className="mr-2 mt-2 text-white place-items-start">
                            <div className="flex flex-wrap place-items-center gap-y-4">
                                <div className="font-medium place-items-center focus:outline-none inline-flex transition-all bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                    Case 2
                                </div>
                            </div>
                        </div>
                        <div className="mr-2 mt-2 text-white place-items-start">
                            <div className="flex flex-wrap place-items-center gap-y-4">
                                <div className="font-medium place-items-center focus:outline-none inline-flex transition-all bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                    Case 3
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="font-semibold">
                        <p className="text-small mt-4 font-medium text-white">Input: </p>
                        <div className="w-full cursor-text rounded-lg border px-2 bg-dark-fill-3 border-transparent text-white mt-2 py-[10px]">
                            nums: [1, 2, 4, 9] <br />
                            target: 10
                        </div>
                        <p className="text-small mt-4 font-medium text-white">Output: </p>
                        <div className="w-full cursor-text rounded-lg border px-2 bg-dark-fill-3 border-transparent text-white mt-2 py-[10px]">
                            [0, 1]
                        </div>
                    </div>
                </div>
            </Split>
            <EditorFooter handleSubmit={handleSubmit} />
        </div>
    )
}
