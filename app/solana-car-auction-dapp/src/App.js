import { useState, createContext } from "react";
import RouterComponent from "./router";
import initializeFirebase from './firebase'

export const Web3Context = createContext();

function App() {

  initializeFirebase();

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  return (
    <Web3Context.Provider value={{ web3, setWeb3, account, setAccount, balance, setBalance }}>
      <div>
        <RouterComponent />
      </div>
    </Web3Context.Provider>
  );
}

export default App;
