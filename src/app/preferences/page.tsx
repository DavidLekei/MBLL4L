'use client'
import styles from "../page.module.css"
import Navbar from '../../components/ui/navbar'
import { Setting, SettingsContext } from "@/components/settings/settings"
import {ThemeContext} from "@/components/theme/theme"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/api/auth/auth"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


function DropdownSetting(props: any){

}

export default function Preferences(props: any){
    

    const router = useRouter()
    const auth = useContext(AuthContext)
    const theme = useContext(ThemeContext)

    //If user is not logged in, re-route back to home page (if user manually enters the /preferences route)
    if(!auth.user){
        router.push("/")
    }

    const settingsContext = useContext(SettingsContext)
    const settings = settingsContext.settings

    const ButtonsSetting = (props: any) => {
        
        const [selected, setSelected] = useState<string>(props.setting.value)

        const handleChange = (e: any) => {
            setSelected(e.target.innerText)
            settingsContext.updateSetting(props.setting.name, e.target.innerText)
            props.setting.callback(e.target.innerText)
        }

        const buttons = props.setting.options.map((button: string, index: any) => {
            return(
                <Button onClick={handleChange} variant={button == selected ? 'default' : 'outline'}>{button}</Button>
            )
        })

        return(
            <div className="flex flex-row">
                {buttons}
            </div>
        )

    }

    const SelectSetting = (props: any) => {

        const [value, setValue] = useState<string>()

        const handleChange = (newValue: string) => {
            settingsContext.updateSetting(props.setting.name, newValue)
        }

        const items = props.setting.options.map((item: any, index: any) => {
            return(
                <SelectItem value={item}>{item}</SelectItem>
            )
        })

        return(
            <Select onValueChange={handleChange} disabled={props.disabled}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={props.setting.value ? props.setting.value : props.setting.default} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectGroup>
                    {items}
                    </SelectGroup>
                </SelectContent>
            </Select>
        )
    }

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
            children = Object.entries(props.setting.children).map((child: any, index: number) => {
                    console.log('child: ', child)
                        return(
                            <SettingElement setting={child[1]} child disabled={!value} />
                        )
            })
        }

        let element: any

        if(props.setting.element == 'switch'){
            element = <SwitchSetting setting={props.setting} disabled={props.disabled} updateDisabled={updateValue}/>
        }

        if(props.setting.element == 'select'){
            element = <SelectSetting setting={props.setting} disabled={props.disabled} updateDisabled={updateValue} />
        }

        if(props.setting.element == 'buttons'){
            element = <ButtonsSetting setting={props.setting} disabled={props.disabled} updateDisabled={updateValue} />
        }

        console.log('for setting: ', props.setting.name, ' returning element: ', element)
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


    const settingsElements = Object.entries(settings).map((setting: any, index: number) => {
        return(
            <SettingElement setting={setting[1]} />
        )
    })

    const resetSettings = () => {
        settingsContext.useDefaults()
    }

    return(
        <body className={`!min-w-full ${theme.theme}`} >
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
        </body>
    )
}