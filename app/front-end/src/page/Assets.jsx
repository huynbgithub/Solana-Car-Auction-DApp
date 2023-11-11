import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Card, Form } from 'react-bootstrap'
// import { getOwnedDeployedVehicleDatas } from '../contracts/VehicleFactoryContract'
import CreateVehicleModal from '../components/CreateVehicleModal'
import { Link } from "react-router-dom";
import { Web3Context } from "../App";
import AssetVehicleCard from '../components/AssetVehicleCard'
// import NotificationAlert from '../components/NotificationAlert'

export default function Assets() {

    const { program } = useContext(Web3Context);

    const [cars, setCars] = useState(null);

    useEffect(() => {
        loadCars();
    }, [program]);

    async function loadCars() {
        if (program) {
            const carsData = await program.account.vehicleData.all().catch(error => console.log(error));
            setCars(carsData);
        }
    }

    // const notificationRef = useRef(null)
    // const enableShow = (alert) => (notificationRef.current).setShow(alert)

    return (
        <div className="container-fluid">
            <div className="container-fluid p-5 bg-light text-success text-center">
                <h1>My Assets</h1>
            </div>
            <div className="mt-3 row">
                <CreateVehicleModal />
                {/* <NotificationAlert
                    ref={notificationRef}
                /> */}
                {cars && cars.map((car, index) => (
                    <AssetVehicleCard data={car} key={index} />
                ))}
            </div>
        </div>
    );
};
