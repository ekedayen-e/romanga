import Layout from '@/components/Layout'
import { AuthProvider } from '@/context/AuthProvider';
import { ThemeProvider } from '@/context/ThemeProvider'
import '@/styles/globals.css'
import {useState} from 'react'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const [search, setSearch] = useState('');
  return (
  <ThemeProvider>
    <Head>
    <title>Romanga</title>
    <link rel="icon" href="/favicon.ico"/>
    </Head>
    <div id="portal"></div>
    <AuthProvider>
    <Layout setSearch={setSearch}>
      <Component {...pageProps} search={search} setSearch={setSearch} />
    </Layout>
    </AuthProvider>
  </ThemeProvider>
  )
}
