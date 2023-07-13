import Layout from '@/components/Layout'
import { AuthProvider } from '@/context/AuthProvider';
import { ThemeProvider } from '@/context/ThemeProvider'
import '@/styles/globals.css'
import {useState} from 'react'

export default function App({ Component, pageProps }) {
  const [search, setSearch] = useState('');
  return (
  <ThemeProvider>
    <div id="portal"></div>
    <AuthProvider>
    <Layout setSearch={setSearch}>
      <Component {...pageProps} search={search} setSearch={setSearch} />
    </Layout>
    </AuthProvider>
  </ThemeProvider>
  )
}
