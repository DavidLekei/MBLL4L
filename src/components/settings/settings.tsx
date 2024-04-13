'use client'

import { AuthContext } from '@/api/auth/auth';
import { useRouter } from 'next/navigation'
import {Component, useContext, createContext, useState, useEffect} from 'react'
import {ThemeContext} from "@/components/theme/theme"

type Callback = (...args: any[]) => void

export type Setting = {
    name: string,
    display: string,
    value: Boolean | string | number | null | undefined,
    element: string,
    options: string[] | null | undefined
    default: Boolean | string | number,
    disabled: Boolean,
    children: string[] | null
    callback: Callback | null
    // update: (newValue: Boolean | string | number) => void;
}

type Settings = {
    [key: string]: Setting
}

type SettingsContext = {
    settings: Settings;
    setSettings(settings: Settings): void;
    updateSetting(setting: string, newValue: Boolean | string | number): void;
    useDefaults(): void;
}

export const _settings: Settings = {
    theme: {
        name:'theme',
        display: 'Theme',
        value: 'Light',
        element: 'buttons',
        options: ['Light', 'Dark'],
        default: 'Light',
        disabled: false,
        children:null,
        callback: (theme: any) => {
            console.log('callback - theme: ', theme)
        }
    },
    table_view:{
        name:'table_view',
        display: 'Table display type',
        value: 'Pagination',
        element: 'buttons',
        options: ['Pagination', 'Scroll'],
        default: 'Scroll',
        disabled: false,
        children: null,
        callback: null
    },
    automate: {
        name:'automate',
        display: 'Enable automated CSV files emailed to you',
        value: false,
        element: 'switch',
        options: null,
        default: false,
        disabled: false,
        callback: null,
        children: ['cycle', 'email_address']
    },
    cycle: {
        name:'cycle',
        display: 'How often should MBLL4L send automated reports?',
        value: false,
        element: 'select',
        options: ['Daily', 'Monthly', 'Yearly'],
        default: false,
        disabled: true,
        children: null,
        callback: null
    },
    email_address: {
        name: 'email_address',
        display:'Send to primary email address',
        value: true,
        element: 'switch',
        options: null,
        default: false,
        disabled: true,
        children: null,
        callback: null
    },
    export_type:{
        name:'export_type',
        display: 'Default export file type',
        value: null,
        element: 'select',
        options: ['CSV', 'JSON', 'XML', 'DOCX', 'PDF'],
        default: 'CSV',
        disabled: false,
        children:null,
        callback: null
    },
    test: {
        name:'',
        display:'',
        value: null,
        element:'text',
        options: null,
        default: '',
        disabled: false,
        children: null,
        callback: null
    }
}

export const SettingsContext = createContext<SettingsContext>({
    settings: _settings,
    setSettings: (settings) => settings,
    updateSetting: (setting, newValue) => {},
    useDefaults: () => {}
});

export default function SettingsProvider(props: any){

    const auth = useContext(AuthContext)
    const theme = useContext(ThemeContext)
    console.log('theme in settings.tsx: ', theme)

    const [settings, setSettings] = useState<Settings | null>(_settings)

    //This actually just works, since the children get 'disabled' (currently at least)
    const _useDefaults = (_settings: Settings | null) => {
        const defaults = {...settings}

        const keys = Object.keys(defaults)
        
        keys.forEach((key) => {
            defaults[key].value = defaults[key].default
        })

        return defaults
    }

    const useDefaults = () => {
        console.log('theme: ', theme)
        const defaults = _useDefaults(settings)
        setSettings(defaults)
        theme.setTheme('Light')
        console.log('theme2 : ', theme)
    }

    //TODO: Add API call to update the setting on the DB as well.
    const updateSetting = (settingName: string, newValue: Boolean | string | number) => {
        const newSettings = {...settings}
        newSettings[settingName].value = newValue
        setSettings(newSettings)    
    }

    if(!settings){
        const storedSettings = JSON.parse(localStorage.getItem('settings') as string)
        if(storedSettings != null){
            setSettings(storedSettings)
        }else{
            useDefaults()
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