import { useState, createContext } from "react";
import RouterComponent from "./router";

export const Web3Context = createContext();

function App() {

  // const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  return (
    <Web3Context.Provider value={{ account, setAccount }}>
      <div>
        <RouterComponent />
      </div>
    </Web3Context.Provider>
  );
}

export default App;
