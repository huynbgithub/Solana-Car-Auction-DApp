import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Web3 from "web3";
// import { Web3Context } from "../App";

export default function Navbar() {

    // const { web3, setWeb3 } = useContext(Web3Context);
    // const { account, setAccount } = useContext(Web3Context);
    // const { balance, setBalance } = useContext(Web3Context);

    // const detectCurrentProvider = () => {
    //     let provider;
    //     if (window.ethereum) {
    //         provider = window.ethereum;
    //         // } else 
    //         // if (window.web3) {
    //         //     provider = window.web3.currentProvider;
    //     } else {
    //         console.log("Non-ethereum browser detected. You should install Metamask");
    //     }
    //     return provider;
    // };

    // const onConnect = async () => {
    //     try {
    //         const currentProvider = detectCurrentProvider();
    //         if (currentProvider) {
    //             await currentProvider.request({ method: 'eth_requestAccounts' });
    //             const web3 = new Web3(currentProvider);

    //             await setWeb3(web3);

    //             const account = (await web3.eth.getAccounts())[0];

    //             await setAccount(account);

    //             const ethBalance = await web3.eth.getBalance(account);
    //             const balance = web3.utils.fromWei(ethBalance, "ether");

    //             await setBalance(balance);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     onConnect();
    // }, []);

    return (
        <nav className="navbar navbar-expand-sm">
            {/* <div className="container-fluid">
                <h1 className="navbar-brand text-success">Solana Car Auction</h1>
                <nav className="navbar navbar-expand-sm justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        {account && account != "0x39c4fBD15e23dFc8e4d3920fb3Ff2d28DA21215D" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/wallet">Wallet</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/assets">My Assets</Link>
                                </li>
                            </>
                        )}
                        {account && account == "0x39c4fBD15e23dFc8e4d3920fb3Ff2d28DA21215D" &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        }
                    </ul>
                </nav>
                {!account && (
                    <button className="btn btn-danger" onClick={onConnect}>Connect Wallet</button>
                )}
                {account && (
                    <button className="btn btn-secondary">Wallet Connected Successfully</button>
                )}
            </div> */}
        </nav >
    );
};