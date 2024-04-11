'use client'

import { AuthContext } from '@/api/auth/auth';
import { useRouter } from 'next/navigation'
import {Component, useContext, createContext, useState, useEffect} from 'react'


export type Setting = {
    name: string,
    display: string,
    value: Boolean | string | number,
    element: string,
    default: Boolean | string | number,
    disabled: Boolean,
    children: Setting[] | null
}

type Settings = Setting[]

type SettingsContext = {
    settings: Settings | null
    setSettings: (settings: Settings) => any
}

const defaultSettings: Settings = [
    {
        name:'theme',
        display: 'Theme',
        value: 'light',
        element: 'switch',
        default: 'light',
        disabled: false,
        children:null
    },
    {
        name:'automate',
        display: 'Enable automated CSV files emailed to you',
        value: false,
        element: 'switch',
        default: false,
        disabled: false,
        children: [
            {
                name:'cycle',
                display: 'How often should MBLL4L send automated reports?',
                value: 'Monthly',
                element: 'switch',
                default: 'Monthly',
                disabled: true,
                children: null
            }
        ]
    }
]

export const SettingsContext = createContext<SettingsContext>({
    settings: defaultSettings,
    setSettings: (settings) => settings,
});

export default function SettingsProvider(props: any){

    const auth = useContext(AuthContext)

    const [settings, setSettings] = useState<Settings | null>(null)

    if(!settings){
        const storedSettings = JSON.parse(localStorage.getItem('settings') as string)
        if(storedSettings != null){
            setSettings(storedSettings)
        }else{
            setSettings(defaultSettings)
        }
    }

    return(
        <SettingsContext.Provider
            value={{
                settings,
                setSettings
            }}>
            {props.children}
        </SettingsContext.Provider>
    )
}