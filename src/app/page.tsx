'use client'

import styles from "./page.module.css"
import Lawyers from '../components/ui/lawyers'
import Navbar from '../components/ui/navbar'
import { useContext, useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import AuthenticationProvider from "@/api/auth/auth"
import SettingsProvider from "@/components/settings/settings"
import { ThemeContext } from "@/components/theme/theme"

export default function Home() {

  const theme = useContext(ThemeContext)

  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  return (
    <body className={`!min-w-full ${theme.theme}`} >
        <div className="app-margins">
          <Navbar />
          <main className={styles.main}>
            <div className={styles.container}>
              <Lawyers filter={filter} searchTerm={searchTerm}/>
            </div>
            <Toaster />
          </main>
        </div>
      </body>
  );
}
