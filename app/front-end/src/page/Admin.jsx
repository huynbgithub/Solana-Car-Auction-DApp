import React, { useState, useEffect, useContext, useRef } from "react";
// import { getDeployedVehicleDatas } from '../contracts/VehicleFactoryContract'
import { Web3Context } from "../App";
import AdminVehicleCard from '../components/AdminVehicleCard'
// import NotificationAlert from '../components/NotificationAlert'

export default function Admin() {

    const { program, setProgram } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    // const { balance, setBalance } = useContext(Web3Context);

    const [cars, setCars] = useState(null);

    useEffect(() => {
        loadCars();
    }, [account]);

    async function loadCars() {
        if (program) {
            const carsData = await program.account.vehicleData.all().catch(error => console.log(error));
            // console.log(carsData);
            setCars(carsData);
        }
    }

    // const notificationRef = useRef(null)
    // const enableShow = (alert) => (notificationRef.current).setShow(alert)

    return (
        <div className="container-fluid">
            {account == "FRApYbTTgPsK3xsHKBPasV83VzZt6Wdmkh6o9yPztBfG" ?
                <div className="container-fluid">
                    <div className="container-fluid p-5 bg-light text-success text-center">
                        <h1>Car Approval Management</h1>
                        <p>Welcome Admin!</p>
                    </div>
                    <div className="mt-3 row">
                        {/* <NotificationAlert
                            ref={notificationRef}
                        /> */}
                        {cars && cars.map((car, index) => (
                            <AdminVehicleCard data={car} />
                        ))}
                    </div>
                </div>
                :
                <div className="container-fluid p-5 bg-light text-danger text-center">
                    <h1>You are not admin!</h1>
                </div>
            }
        </div>
    );
};
