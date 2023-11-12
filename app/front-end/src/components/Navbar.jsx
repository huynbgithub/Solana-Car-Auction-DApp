import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Web3Context } from "../App";

import * as anchor from '@coral-xyz/anchor'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import idl from '../idl/vehicle_factory.json'
const programID = new PublicKey(idl.metadata.address)

const network = clusterApiUrl('devnet')

export default function Navbar() {

    const { setProgram } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { setBalance } = useContext(Web3Context);

    const detectCurrentProvider = () => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;

            if (provider?.isPhantom) {
                return provider;
            }
        }

        window.open('https://phantom.app/', '_blank');
    };

    const onConnect = async () => {
        try {
            const connection = new Connection(network, "processed");
            const provider = new anchor.AnchorProvider(
                connection,
                window.solana,
                "processed"
            )

            const program = new anchor.Program(idl, programID, provider)

            await setProgram(program)

            const currentProvider = detectCurrentProvider();

            if (currentProvider.isPhantom) {

                const res = await currentProvider.request({ method: "connect" });

                const account = res.publicKey;

                await setAccount(account);

                const lamportBalance = await connection.getBalance(account);
                const balance = lamportBalance / 1000000000;

                await setBalance(balance);
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        onConnect();
    }, []);

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <h1 className="navbar-brand text-success">Solana Car Auction</h1>
                <nav className="navbar navbar-expand-sm justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        {account && account != "FRApYbTTgPsK3xsHKBPasV83VzZt6Wdmkh6o9yPztBfG" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/wallet">Wallet</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/assets">My Assets</Link>
                                </li>
                            </>
                        )}
                        {account && account == "FRApYbTTgPsK3xsHKBPasV83VzZt6Wdmkh6o9yPztBfG" &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        }
                    </ul>
                </nav>
                {!account && (
                    <button className="btn btn-success" onClick={onConnect}>Connect Wallet</button>
                )}
                {account && (
                    <button className="btn btn-secondary">Wallet Connected Successfully</button>
                )}
            </div>
        </nav >
    );
};