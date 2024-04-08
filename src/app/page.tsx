import Image from "next/image";
import styles from "./page.module.css"
import Lawyers from '../components/ui/lawyers'
import Header from '../components/ui/header'
import Navbar from '../components/ui/navbar'

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <Lawyers />
        </div>
      </main>
    </div>
  );
}
