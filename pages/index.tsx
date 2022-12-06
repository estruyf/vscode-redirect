import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [ url, setUrl ] = useState('')

  useEffect(() => {
    //https://vscode-redirect-9ajo.vercel.app/?code=6p9PmlVomT-9T2QvSQ2VRlEAwkVfIYtoEMBRaDeSqi1sl&state=https%253A%252F%252Festruyf-opulent-capybara-4grqx5g7953754v.github.dev%252Fextension-auth-callback%253Fstate%253D6baecfa62ec973b07a1350b023004335%2526nonce%253Dcadbf008-6ff6-4b4b-88e0-5ecccb62bb45

    const { state, ...others } = router.query;
    if (state) {
      const decodedUrl = new URL(decodeURIComponent(state as string));
      for (const other of Object.keys(others)) {
        decodedUrl.searchParams.set(other, others[other] as string);
      }

      if (decodedUrl.href && (
          decodedUrl.href.startsWith('vscode://') || 
          decodedUrl.href.startsWith('vscode-insiders://') || 
          decodedUrl.href.includes('.github.dev') || 
          decodedUrl.href.includes('.gitpod.io') || 
          decodedUrl.href.startsWith('vscode.dev'))) {
        // router.push(decodedUrl);
        setUrl(decodedUrl.href);
      }
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Visual Studio Code - Redirection</title>
        <meta name="description" content="Visual Studio Code - Redirection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          You&apos;ll be redirected to Visual Studio Code!
        </h1>

        <p className={styles.description}>
          {
            url ? (
              <>In case you are not redirected, <a href={url} title={`Open Visual Studio Code`}>click here</a>.</>
            ) : (
              <>No redirect URL provided</>
            )
          }
        </p>
      </main>
    </div>
  )
}
