import auth, { AuthContext } from "@/api/auth/auth";
import { Button } from "./button";
import ExportTypes from "./exporttypes";
import { useContext } from "react";
import { SettingsContext } from "../settings/settings";

export default function ExportControls(props: any){

    const auth = useContext(AuthContext)
    const settings = useContext(SettingsContext)

    let fileType

    for(var i in settings.settings){
      if(settings.settings[i].name == 'export_type'){
        console.log('setting: ', settings.settings[i].name)
        fileType = settings.settings[i].value
      }
    }

    console.log('filetype : ', fileType)

    return(
      <div className="flex flex-row items-center">
        <Button variant="outline" onClick={props.exportFunction}>Export to {fileType}</Button>
        {auth.user ? <ExportTypes /> : <div></div>}
      </div>
    )
}