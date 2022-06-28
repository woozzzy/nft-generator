import React from 'react'
import ReactDOM from 'react-dom/client'
import { MetaMaskProvider } from "metamask-react"
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'

import App from './App'

import './index.css'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <MetaMaskProvider>
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </MetaMaskProvider>
    </Provider>
) 