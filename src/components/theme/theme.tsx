'use client'

import {useState, createContext, useContext, useEffect} from "react"

type ThemeContext = {
    theme: string | null;
    setTheme(theme: string): void;
}

export const ThemeContext = createContext<ThemeContext>({
    theme: null,
    setTheme: (theme) => theme,
});

export default function ThemeProvider(props: any){

    const [theme, setTheme] = useState<string>('Light')

    return(
        <ThemeContext.Provider
            value={{
                theme,
                setTheme
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}
