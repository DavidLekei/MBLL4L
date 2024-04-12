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
    children: Setting[] | null,
    // update: (newValue: Boolean | string | number) => void;
}

type Settings = Setting[]

type SettingsContext = {
    settings: Settings | null;
    setSettings(settings: Settings): void;
    updateSetting(setting: string, newValue: Boolean | string | number): void;
    useDefaults(): void;
}

export const settings: Settings = [
    {
        name:'theme',
        display: 'Theme',
        value: false,
        element: 'switch',
        default: false,
        disabled: false,
        children:null,

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
                value: false,
                element: 'switch',
                default: false,
                disabled: true,
                children: null
            },
            {
                name: 'email_address',
                display:'Send to primary email address',
                value: true,
                element: 'switch',
                default: false,
                disabled: true,
                children: null
            }
        ]
    }
]

export const defaultSettings: Settings = [
    {
        name:'theme',
        display: 'Theme',
        value: false,
        element: 'switch',
        default: false,
        disabled: false,
        children:null,

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
                value: false,
                element: 'switch',
                default: false,
                disabled: true,
                children: null
            },
            {
                name: 'email_address',
                display:'Send to primary email address',
                value: true,
                element: 'switch',
                default: false,
                disabled: true,
                children: null
            }
        ]
    }
]

export const SettingsContext = createContext<SettingsContext>({
    settings: settings,
    setSettings: (settings) => settings,
    updateSetting: (setting, newValue) => {},
    useDefaults: () => {}
});

export default function SettingsProvider(props: any){

    const auth = useContext(AuthContext)

    const [settings, setSettings] = useState<Settings | null>(null)

    const _useDefaults = (_settings: Settings | null) => {
        const defaults = _settings!.slice()

        for(var setting in defaults){
            if(defaults[setting].children){
                _useDefaults(defaults[setting].children)
            }
            defaults[setting].value = defaults[setting].default
        }

        return defaults
    }

    const useDefaults = () => {
        const defaults = _useDefaults(settings)
        setSettings(defaults)
    }

    const findSetting = (setting: Setting, name: string, allSettings: Setting[] | null): Setting | undefined => {
        let theSetting
        for(var index in allSettings){
            if(allSettings[index].children){
                theSetting = findSetting(setting, name, allSettings[index].children)
                if(theSetting){
                    return theSetting
                }
            }
            if(allSettings[index].name == name){
                return allSettings[index]
            }
        }
        return theSetting
    }

    //TODO: Add API call to update the setting on the DB as well.
    const updateSetting = (settingName: string, newValue: Boolean | string | number) => {
        const newSettings = settings!.slice()
        let tempSetting
        for(var setting in newSettings){
            tempSetting = findSetting(newSettings[setting], settingName, newSettings)
            if(tempSetting){
                tempSetting.value = newValue
            }
        }
        setSettings(newSettings)
    }

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
                setSettings,
                updateSetting,
                useDefaults
            }}>
            {props.children}
        </SettingsContext.Provider>
    )
}