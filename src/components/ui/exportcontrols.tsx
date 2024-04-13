import auth, { AuthContext } from "@/api/auth/auth";
import { Button } from "./button";
import ExportTypes from "./exporttypes";
import { useContext, useState } from "react";
import { SettingsContext } from "../settings/settings";
import { ThemeContext } from "../theme/theme";

export default function ExportControls(props: any){

    const auth = useContext(AuthContext)
    const settings = useContext(SettingsContext)
    const theme = useContext(ThemeContext)

    const [fileType, setFileType] = useState<string>(settings.settings['export_type'].value)

    return(
      <div className="flex flex-row items-center">
        <Button variant="outline" className={`${theme.theme == 'Dark' ? 'Dark' : ''}`} onClick={props.exportFunction}>Export to {fileType}</Button>
        {auth.user ? <ExportTypes /> : <div></div>}
      </div>
    )
}