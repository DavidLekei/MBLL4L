'use client'

import styles from "./page.module.css"
import Lawyers from '../components/ui/lawyers'
import Navbar from '../components/ui/navbar'
import { useContext, useState } from "react"

import AuthenticationProvider, { AuthContext } from "@/api/auth/auth"

export default function Home() {

  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const auth = useContext(AuthContext);

  return (
    <AuthenticationProvider>
        <div className="app-margins">
          <Navbar />
          <main className={styles.main}>
            <div className={styles.container}>
              <Lawyers filter={filter} searchTerm={searchTerm}/>
            </div>
          </main>
        </div>
    </AuthenticationProvider>
  );
}
