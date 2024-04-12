'use client'
import styles from "../page.module.css"
import Navbar from '../../components/ui/navbar'
import { Setting, SettingsContext, defaultSettings } from "@/components/settings/settings"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/api/auth/auth"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"


function DropdownSetting(props: any){

}

export default function Preferences(props: any){
    

    const router = useRouter()
    const auth = useContext(AuthContext)


    //If user is not logged in, re-route back to home page (if user manually enters the /preferences route)
    if(!auth.user){
        router.push("/")
    }

    const settingsContext = useContext(SettingsContext)
    const settings = settingsContext.settings

    // const [settings, setSettings] = useState(settingsContext.settings)

    const SwitchSetting = (props: any) => {

        const [isChecked, setIsChecked] = useState<boolean | undefined>(props.setting.value)

        useEffect(() =>{
            if(props.disabled){
                setIsChecked(false)
            }
        })

        const handleChange = () => {
            setIsChecked(!isChecked)
            props.updateDisabled()
            settingsContext.updateSetting(props.setting.name, !props.setting.value)
        }
    
        return(
            <div className={"flex flex-row items-center justify-apart"}>
                <Switch checked={isChecked} onCheckedChange={handleChange} id={props.name} disabled={props.disabled}/>
            </div>
        )
    }


    const SettingElement = (props: any) => {
        const [value, setValue] = useState<Boolean | string | number>(props.disabled ? props.setting.default : props.setting.value);

        let children: any

        const updateValue = () => {
            setValue(!value)
        }

        if(props.setting.children){
            children = props.setting.children.map((child: Setting, index: number) => {
                        return(
                            <SettingElement setting={child} child disabled={!value} />
                        )
            })
        }

        let element

        if(props.setting.element == 'switch'){
            element = <SwitchSetting setting={props.setting} disabled={props.disabled} updateDisabled={updateValue}/>
        }

        
        return(
            <div className="flex flex-col">
                <div className={`flex flex-row w-full justify-between m-5 ${props.child ? 'pl-10' : ''} ${props.disabled ? 'text-disabled' : ''}`}>
                    {props.setting.display}
                    {element}
                </div>
                {children}
            </div>
        )
    }

    const settingsElements = settings.map((setting: Setting, index: number) => {
        return(
            <SettingElement setting={setting} />
        )
    })

    const resetSettings = () => {
        settingsContext.useDefaults()
    }

    return(
        <div className="app-margins">
        <Navbar />
        <main className={styles.main}>
            <div className="flex flex-col items-center">
                <div className="flex flex-row items-center w-full justify-between pl-5 pb-10">
                    <h1 className="text-4xl font-bold">Preferences</h1>
                    <Button variant="outline" onClick={resetSettings}>Reset</Button>
                </div>
                <div className="flex flex-col">
                    {settingsElements}
                </div>
            </div>
        </main>
    </div>
    )
}