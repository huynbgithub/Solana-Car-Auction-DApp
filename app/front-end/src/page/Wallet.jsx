import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";

export default function Wallet() {
    // const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);

    return (
        <div className="container">
            <div className="container" style={{ width: 600 }}>
                <h6>Wallet Account</h6>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Address</th>
                            <td>{account}</td>
                        </tr>
                        <tr>
                            <th>Balance</th>
                            <td>SOL {balance}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
