import React, { useState, useEffect, useContext, useRef } from "react";
// import { getDeployedVehicleDatas } from '../contracts/VehicleFactoryContract'
import { Web3Context } from "../App";
// import AllVehicleCard from '../components/AllVehicleCard'
// import NotificationAlert from '../components/NotificationAlert'
import { Dropdown } from 'react-bootstrap';
import * as anchor from '@coral-xyz/anchor'
import { ConfirmOptions, Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import idl from '../idl/vehicle_factory.json'
import { IDL } from "../idl/vehicle_factory"

declare const window: any;

const { SystemProgram, Keypair } = anchor.web3
let myAccount = Keypair.generate()
const programID = new PublicKey(idl.metadata.address)
const network = clusterApiUrl('devnet')

// console.log(myAccount)

export default function Home() {

    const account = useContext(Web3Context)?.account as string;

    const getProvider = () => {
        const connection = new Connection(network, 'processed' as ConfirmOptions)
        const provider = new anchor.AnchorProvider(
            connection,
            window.solana,
            'processed' as ConfirmOptions
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
        const program = new anchor.Program(IDL, programID, provider)
        console.log(programID)
        console.log(program)
        await program.methods
            .createVehicle({ ownerFullName: "b", seatCapacity: 2, firstRegistrationDate: new anchor.BN(2) }, new anchor.BN(3), ["c.img", "d.img"])
            .accounts({
                vehicle: myAccount.publicKey,
                owner: "HXLoUNAPWyqq28DCA34UhQbA57EsUBJsXyVHgtU98HPb",
                systemProgram: SystemProgram.programId
            })
            .signers([myAccount])
            .rpc().catch(error => console.log(error));
        const carsData = await program.account.vehicleData.fetch(myAccount.publicKey).catch(error => console.log(error));
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
