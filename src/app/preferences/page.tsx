'use client'
import styles from "../page.module.css"
import Navbar from '../../components/ui/navbar'
import { Setting, SettingsContext } from "@/components/settings/settings"
import { useContext } from "react"
import { AuthContext } from "@/api/auth/auth"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"

function SwitchSetting(props:  any){
    return(
        <div className={"flex flex-row items-center justify-apart"}>
            <Switch id={props.name} disabled={props.disabled}/>
        </div>
    )
}

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

    const getElement = (setting: Setting, disabled: Boolean) => {
        if(setting.element == 'switch'){
            return <SwitchSetting name={setting.display} disabled={disabled} />
        }
    }

    const settingsElements = []

    for(var s in settings.settings){
        var setting = settings.settings[s]
        var disabled = false

        if(setting.dependencies){
            setting.dependencies.forEach((d: string) => {
                if(settings.settings[d.dependent].value != d.dependentValue){
                    disabled = true
                }
            })
        }

        settingsElements.push(
            <div className={`flex flex-row w-full justify-between m-5 ${disabled ? 'text-disabled' : ''}`}>
                {setting.display}
                {getElement(setting, disabled)}
            </div>
        )
    }

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