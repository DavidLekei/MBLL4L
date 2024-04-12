"use client"

import {useState, createContext, useContext} from "react"

type ThemeContext = {
    theme: string | null;
    setTheme(theme: string): void;
}

export const ThemeContext = createContext({
    theme: null,
    setTheme: (theme: any) => theme,
});

export function ThemeProvider(props: any){

    const [theme, setTheme] = useState<string | null>('Light')

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
