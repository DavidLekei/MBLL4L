'use client'

import { AuthContext } from '@/api/auth/auth';
import { useRouter } from 'next/navigation'
import {Component, useContext, createContext, useState, useEffect} from 'react'

type Dependency = {
    dependent: string,
    dependentValue: Boolean | string | number
}

export type Setting = {
    display: string;
    value: Boolean | string | number;
    element: string
    dependencies: Dependency[] | null
}

type Settings = {}

type SettingsContext = {
    settings: Settings | null
    setSettings: (settings: Settings) => any
}

const defaultSettings: Settings = {
    theme: {
        display: 'Theme',
        value: 'light',
        element: 'switch',
        dependencies: null
    },
    automate: {
        display: 'Enable automated CSV files emailed to you',
        value: false,
        element: 'switch',
        dependencies: null
    },
    cycle: {
        display: 'How often should MBLL4L send automated reports?',
        value: 'Monthly',
        element: 'switch',
        dependencies: [
            {
                dependent: 'automate',
                dependentValue: true
            }
        ]
    }
}

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