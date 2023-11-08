import React, { useState, useEffect, useContext, useRef } from "react";
// import { getDeployedVehicleDatas } from '../contracts/VehicleFactoryContract'
import { Web3Context } from "../App";
// import AllVehicleCard from '../components/AllVehicleCard'
// import NotificationAlert from '../components/NotificationAlert'
import { Dropdown } from 'react-bootstrap';
import * as anchor from '@coral-xyz/anchor'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import idl from '../idl/vehicle_factory.json'

import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const { SystemProgram, Keypair } = anchor.web3
let myAccount = Keypair.generate()
const programID = new PublicKey(idl.metadata.address)
const network = clusterApiUrl('devnet')
const opts = {
    a: 'processed'
}

console.log(myAccount)

export default function Home() {

    // const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    // const { balance, setBalance } = useContext(Web3Context);

    const getProvider = () => {
        const connection = new Connection(network, opts.a)
        const provider = new anchor.AnchorProvider(
            connection,
            window.solana,
            opts.a
        )
        console.log(provider)
        return provider
    }

    const [cars, setCars] = useState(null);
    // const [filter, setFilter] = useState(true);

    useEffect(() => {
        loadCars();
    }, []);

    async function loadCars() {
        const provider = getProvider();
        const program = new anchor.Program(idl, programID, provider)
        console.log(programID)
        console.log(program)
        // await program.methods
        //     .createVehicle({ ownerFullName: "b", seatCapacity: 2, firstRegistrationDate: new anchor.BN(2) }, new anchor.BN(3), ["c.img", "d.img"])
        //     .accounts({
        //         vehicle: myAccount.publicKey,
        //         owner: account,
        //         systemProgram: SystemProgram.programId
        //     })
        //     .signers([myAccount])
        //     .rpc().catch(error => console.log(error));
        const carsData = await program.account.vehicleData.fetch("898oEESEjynwy4Ro13TGGg8E9Z558iFdgipAfnqLcH7H").catch(error => console.log(error));
        console.log(carsData)
        // setCars(carsData);
    }

    // const notificationRef = useRef(null)
    // const enableShow = (alert) => (notificationRef.current).setShow(alert)

    return (
        <div className="container-fluid">
            <div className="container-fluid p-5 bg-light text-success text-center">
                <h1>Car Auction Website</h1>
                <p>Solana Blockchain 2023</p>
            </div>
            <div className="mt-3 row">
                {/* <NotificationAlert
                    ref={notificationRef}
                /> */}
                <div>
                    <Dropdown className="float-end">
                        <Dropdown.Toggle variant='outline-success' id='dropdown'>
                            <span>Filter Auction Status</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                            // onClick={(event) => {
                            //     setFilter(true)
                            // }}
                            >
                                Started
                            </Dropdown.Item>
                            <Dropdown.Item
                            // onClick={(event) => {
                            //     setFilter(false)
                            // }}
                            >
                                Not Started
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {/* {cars && cars.map((car) => (
                    (car.isStart == filter &&
                        <AllVehicleCard data={car} />
                    )
                ))} */}
            </div>
        </div>
    );
};
