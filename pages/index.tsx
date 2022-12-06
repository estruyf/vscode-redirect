import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [ url, setUrl ] = useState('')

  useEffect(() => {
    const query = router.query;
    if (query && query.state) {
      const decodedUrl = decodeURIComponent(query.state as string);

      if (decodedUrl && (
          decodedUrl.startsWith('vscode://') || 
          decodedUrl.startsWith('vscode-insiders://') || 
          decodedUrl.includes('.github.dev') || 
          decodedUrl.includes('.gitpod.io') || 
          decodedUrl.startsWith('vscode.dev'))) {
        router.push(decodedUrl);
        setUrl(decodedUrl);
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
          You'll be redirected to Visual Studio Code!
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
