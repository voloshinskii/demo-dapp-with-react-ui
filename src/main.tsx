import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import './index.scss';
import './patch-local-storage-for-github-pages';
import { ChakraProvider } from '@chakra-ui/react'

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>,
)
