import React, { useContext, useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { exponent } from '../utils/Constants'
import { Web3Context } from "../App";
import { useNavigate } from 'react-router-dom'
import { ScopeReference } from './Utils'
import { ApprovalStatus } from '../components/Utils'
import { getIsApproved } from '../contracts/VehicleContract'

const AdminVehicleCard = (props) => {

    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);
    const [approved, setApproved] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        async function handleEffect() {
            const approved = await getIsApproved(props.data.address);
            setApproved(approved);
        }
        handleEffect();
    }, []);

    return (
        <>
            {!approved ?
                <div className="col-3 mt-3">
                    <Card className='' >
                        <Card.Img style={{ height: 200 }} variant="top" src={props.data.vehicleImages[0]} />
                        <Card.Body>
                            <Card.Title> <ScopeReference hexString={props.data.address} type='address' /></Card.Title>
                            <Card.Text>
                                <ApprovalStatus className='mb-2' type={approved} />
                                <div>Starting Price: {props.data.startingPrice / exponent} KLAY</div>
                            </Card.Text>
                            <Button onClick={() => navigate(`/detail/${props.data.address}`)} variant="outline-danger" className="float-end">Detail</Button>
                        </Card.Body>
                    </Card >
                </div>
                : <></>
            }
        </>
    )
}

export default AdminVehicleCard