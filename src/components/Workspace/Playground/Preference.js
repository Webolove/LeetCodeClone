import SettingModel from '@/components/AuthModals/SettingModel'
import React from 'react'
import { AiOutlineFullscreen, AiOutlineSetting } from 'react-icons/ai'

export default function Preference({ settings, setSettings }) {
    return (
        <div className='flex place-items-center justify-between w-full h-11 bg-dark-layer-2'>
            <div className="flex place-items-center text-white">
                <button className="flex cursor-pointer place-items-center rounded focus:outline-none bg-dark-fill-3 hover:bg-dark-fill-2 px-2 py-1.5 font-medium">
                    <div className="flex place-items-center px-1">
                        <div className="text-xs text-label-2 dark:text-dark-label-2">
                            Javascript
                        </div>
                    </div>
                </button>
            </div>

            <div className="flex place-items-center m-2">
                <button className="preferenceBtn group"  onClick={() => {setSettings({ ...settings, settingModelIsOpen: true})}}>
                    <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg" >
                        <AiOutlineSetting />
                    </div>
                    <div className="showPrefDesc group-hover:scale-90">
                        Settings
                    </div>
                </button>

                <button className="preferenceBtn group">
                    <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
                        <AiOutlineFullscreen />
                    </div>
                    <div className="showPrefDesc group-hover:scale-90">
                        Full Screen
                    </div>
                </button>
            </div>

            {settings.settingModelIsOpen && <SettingModel settings={settings} setSettings={setSettings} />}
        </div>
    )
}
