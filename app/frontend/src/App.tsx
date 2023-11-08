import { useState, createContext } from "react";
import RouterComponent from "./router";
import '@solana/web3.js'

interface ApplicationContext {
  account: string,
  setAccount: React.Dispatch<React.SetStateAction<string>>
}

export const Web3Context = createContext<ApplicationContext | null>(null);

function App() {

  const [account, setAccount] = useState<string>("");

  return (
    <Web3Context.Provider value={{ account, setAccount }}>
      <div>
        <RouterComponent />
      </div>
    </Web3Context.Provider>
  );
}

export default App;
