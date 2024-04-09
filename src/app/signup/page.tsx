'use client'
import styles from "../page.module.css"
import Navbar from '../../components/ui/navbar'
import SignupForm from '../../components/ui/signup'
import Benefits from '../../components/ui/benefits'

export default function SignupPage(props: any){
    return(
        <div className="app-margins">
        <Navbar />
        <main className={styles.main}>
            <div className="flex flex-col w-full">
                <h1 className="text-4xl font-bold">Create an Account</h1>
                <div className="flex flex-row w-full text-xl justify-evenly items-center">
                    <Benefits />
                    <SignupForm />
                </div>
            </div>
        </main>
    </div>
    )
}