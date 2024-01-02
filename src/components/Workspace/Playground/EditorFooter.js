import React from 'react'
import { BsChevronUp } from 'react-icons/bs'

export default function EditorFooter({handleSubmit}) {
    return (
        <div className='absolute bottom-0 z-10 flex w-full bg-dark-layer-1'>
            <div className="mx-5 flex my-[10px] justify-between w-full">
                <div className="mr-2 flex flex-1 place-items-center flex-nowrap place-items-center space-x-4">
                    <button className="px-3 py-1.5 font-medium place-items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2">
                        Console
                        <div className="ml-1 transform transition flex place-items center">
                            <BsChevronUp className='fill-dark-gray-6 mx-1' />
                        </div>
                    </button>
                </div>
                <div className="flex ml-auto place-items-center space-x-4">
                    <button className="px-3 py-1.5 font-medium whitespace-nowrap focus:outline-none place-items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg">
                        Run
                    </button>
                    <button className="px-3 py-1.5 font-medium whitespace-nowrap focus:outline-none place-items-center transition-all inline-flex bg-dark-green-s text-sm hover:bg-green-3 text-white rounded-lg" onClick={handleSubmit}>
                        Submit
                    </button>

                </div>
            </div>
        </div>
    )
}
