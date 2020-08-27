import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'

export const siteTitle = 'Aquatix'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,300;1,400&display=swap" rel="stylesheet"></link>
      </Head>
      <header className={styles.header}>
        <div className={styles.containerlayout}>
        <Link href="/"><a><img src="https://aquatix.it/wp-content/uploads/2019/11/AquatiX-Pos.png"></img></a></Link>
          <div className={styles.containerMenu}>
           <Link href="/"><a><p>HOME</p></a></Link>
           <Link href="/atleti"><a><p>ATLETI</p></a></Link>
           <Link href="/gare"><a><p>GARE</p></a></Link>
            <p>PISCINE</p>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className={styles.containerFooter}>
        <Link href="/"><a><img src="https://aquatix.it/wp-content/uploads/2019/11/AquatiX-Neg.png"></img></a></Link>
          <p>
            AEMMEX ELECTRONICS SERVICE SRL<br></br>
            C.ne Clodia n° 100 - 00195 Roma - P.IVA: 09204291000
            </p>
        </div>
      </footer>
    </div>
  )
}