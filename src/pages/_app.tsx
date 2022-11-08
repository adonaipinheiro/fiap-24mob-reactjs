import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { Roboto_Flex } from '@next/font/google'
import { Provider } from 'react-redux'
import { store } from '@store'
import { ToastContainer } from 'react-toastify';

const roboto = Roboto_Flex()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
      <ToastContainer />
    </Provider>
  )
}
