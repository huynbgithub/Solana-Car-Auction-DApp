import React, { useState, useEffect, useContext, useRef } from "react";
// import { getDeployedVehicleDatas } from '../contracts/VehicleFactoryContract'
import { Web3Context } from "../App";
import AllVehicleCard from '../components/AllVehicleCard'
import NotificationAlert from '../components/NotificationAlert'
import { Dropdown } from 'react-bootstrap';

export default function Home() {

    const { program } = useContext(Web3Context);

    const [cars, setCars] = useState(null);
    const [filter, setFilter] = useState(true);

    useEffect(() => {
        loadCars();
    }, [program]);

    async function loadCars() {
        if (program) {
            const carsData = await program.account.vehicleData.all().catch(error => console.log(error));
            setCars(carsData);
        }
    }

    const notificationRef = useRef(null)

    return (
        <div className="container-fluid">
            <div className="container-fluid p-5 bg-light text-success text-center">
                <h1>Car Auction Website</h1>
                <p>Solana Blockchain 2023</p>
            </div>
            <div className="mt-3 row">
                <NotificationAlert
                    ref={notificationRef}
                />
                <div>
                    <Dropdown className="float-end">
                        <Dropdown.Toggle variant='outline-success' id='dropdown'>
                            <span>Filter Auction Status</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    setFilter(true)
                                }}
                            >
                                Started
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setFilter(false)
                                }}
                            >
                                Not Started
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {cars && cars.map((car) => (
                    (car.account.isStart == filter &&
                        <AllVehicleCard data={car} />
                    )
                ))}
            </div>
        </div>
    );
};
