'use client'
import styles from "../page.module.css"
import Navbar from '../../components/ui/navbar'
import { Setting, SettingsContext } from "@/components/settings/settings"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/api/auth/auth"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"


function DropdownSetting(props: any){

}

export default function Preferences(props: any){
    

    const router = useRouter()
    const auth = useContext(AuthContext)


    //If user is not logged in, re-route back to home page (if user manually enters the /preferences route)
    if(!auth.user){
        router.push("/")
    }

    const settings = useContext(SettingsContext)

    // useEffect(() => {
    //     console.log('useEffect')
    // }, [settings])

    const SwitchSetting = (props: any) => {

        const [isChecked, setIsChecked] = useState<Boolean>(props.setting.value);

        const handleChange = () => {
            props.updateDisabled(!isChecked)
        }
    
        return(
            <div className={"flex flex-row items-center justify-apart"}>
                <Switch onCheckedChange={handleChange} id={props.name} disabled={props.disabled}/>
            </div>
        )
    }

    const getElement = (setting: Setting, disabled: Boolean, updateDisabled: Function) => {
        if(setting.element == 'switch'){
            return <SwitchSetting setting={setting} disabled={disabled} updateDisabled={updateDisabled}/>
        }
    }

    const SettingElement = (props: any) => {
        const [value, setValue] = useState<Boolean | string | number>(props.setting.value);
        const [childrenDisabled, setChildrenDisabled] = useState<Boolean>(props.setting.value ? false : true)

        let children: any

        const updateValue = () => {
            if(children){
                for(var child in children){
                    console.log('child: ', child)
                }
            }
            setValue(!value)
        }

        if(props.setting.children){
            children = props.setting.children.map((child: Setting, index: number) => {
                        return(
                            <SettingElement setting={child} child disabled={!value} />
                        )
            })
        }
        
        return(
            <div className="flex flex-col">
                <div className={`flex flex-row w-full justify-between m-5 ${props.child ? 'pl-10' : ''} ${props.disabled ? 'text-disabled' : ''}`}>
                    {props.setting.display}
                    {getElement(props.setting, props.disabled, updateValue)}
                </div>
                {children}
            </div>
        )
    }


    const settingsElements = settings.settings.map((setting: Setting, index: number) => {
        return(
            <SettingElement setting={setting} />
        )
    })

    return(
        <div className="app-margins">
        <Navbar />
        <main className={styles.main}>
            <div className="flex flex-col w-full items-center">
                <h1 className="text-4xl font-bold">Preferences</h1>
                <div className="flex flex-col">
                    {settingsElements}
                </div>
            </div>
        </main>
    </div>
    )
}