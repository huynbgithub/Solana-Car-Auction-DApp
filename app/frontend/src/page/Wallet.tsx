import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App";

export default function Wallet() {

    const account = useContext(Web3Context)?.account as string;

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
                    </tbody>
                </table>
            </div>
        </div>
    );
}
