'use client'
import styles from "../page.module.css"
import Navbar from '../../components/ui/navbar'

export default function Preferences(props: any){
    return(
        <div className="app-margins">
        <Navbar />
        <main className={styles.main}>
            <div className="flex flex-col w-full items-center">
                <h1 className="text-4xl font-bold">Preferences</h1>
            </div>
        </main>
    </div>
    )
}