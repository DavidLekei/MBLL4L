import styles from "./page.module.css"
import Lawyers from '../components/ui/lawyers'
import Header from '../components/ui/header'
import Navbar from '../components/ui/navbar'

import {getLawyers} from '../api/api'

export default function Home() {

  const data = getLawyers();

  return (
    <div className="">
      <Navbar />
      <main className={styles.main}>
        <Header />
        <div className={styles.container}>
          <Lawyers data={data}/>
        </div>
      </main>
    </div>
  );
}
