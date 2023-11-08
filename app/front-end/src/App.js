import { useState, createContext } from "react";
import RouterComponent from "./router";
import initializeFirebase from './firebase'

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

export const Web3Context = createContext();

function App() {

  initializeFirebase();

  const [program, setProgram] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  return (
    <Web3Context.Provider value={{ program, setProgram, account, setAccount, balance, setBalance }}>
      <div>
        <RouterComponent />
      </div>
    </Web3Context.Provider>
  );
}

export default App;
