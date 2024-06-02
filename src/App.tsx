import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";
import {Footer} from "./components/Footer/Footer";
import {TonProofDemo} from "./components/TonProofDemo/TonProofDemo";

function App() {

  return (
      <TonConnectUIProvider
          manifestUrl="https://voloshinskii.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
      >
        <div className="app">
            <Header />
            <TxForm />
            <Footer />
        </div>
      </TonConnectUIProvider>
  )
}

export default App
