import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <div data-theme="cupcake">
    <Navbar />
    <Component {...pageProps}  />
    <Footer />
  </div>
}