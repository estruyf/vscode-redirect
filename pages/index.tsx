import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [ url, setUrl ] = useState('')

  useEffect(() => {
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
        router.push(decodedUrl);
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
