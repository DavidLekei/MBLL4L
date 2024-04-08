import Image from "next/image";
import styles from "./page.module.css"
import Lawyers from '../components/ui/lawyers'


export default function Home() {
  return (
    <main className={styles.main}>
      <div>

      </div>
      <div className={styles.container}>
        <Lawyers />
      </div>
    </main>
  );
}
