'use client'

import styles from "./page.module.css"
import Lawyers from '../components/ui/lawyers'
import Header from '../components/ui/header'
import Navbar from '../components/ui/navbar'
import { useState } from "react"

export default function Home() {

  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  console.log('searchTerm: ', searchTerm)

  return (
    <div className="app-margins">
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Lawyers filter={filter} searchTerm={searchTerm}/>
        </div>
      </main>
    </div>
  );
}
