import React, { useContext, useState, useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
// import { exponent } from '../utils/Constants'
import { Web3Context } from "../App";
import { useNavigate } from 'react-router-dom'
import { ScopeReference } from './Utils'
import { AuctionStatus } from '../components/Utils'
// import { getIsApproved, getIsOwner } from '../contracts/VehicleContract'
import { PublicKey } from '@solana/web3.js';

const AllVehicleCard = (props) => {

    // const { program, setProgram } = useContext(Web3Context);
    // const { account, setAccount } = useContext(Web3Context);
    // const { balance, setBalance } = useContext(Web3Context);
    // const [approved, setApproved] = useState(null)
    // const [isOwner, setIsOwner] = useState(true)

    const navigate = useNavigate()

    // useEffect(() => {
    //     async function handleEffect() {
    //         const approved = await getIsApproved(props.data.address);
    //         setApproved(approved);

    //         const isOwner = await getIsOwner(props.data.address, account);
    //         setIsOwner(isOwner);
    //     }
    //     handleEffect();
    // }, []);

    return (
        <>
            {/* {approved && !isOwner ? */}
            <div className="col-3 mt-3" >
                <Card className=''>
                    < Card.Img style={{ height: 200 }
                    } variant="top" src={props.data.account.vehicleImages[0]} />
                    <Card.Body>
                        <Card.Title> <ScopeReference hexString={props.data.publicKey.toString()} type='address' /></Card.Title>
                        <Card.Text>
                            <AuctionStatus className='' type={props.data.account.isStart} />
                            {/* <div className='mb-1'>License Plate: {props.data.props.licensePlate}</div> */}
                            <div className='mb-1'>Starting Price: {props.data.account.startingPrice.toNumber()} SOL</div>
                        </Card.Text>
                        <Button onClick={() => navigate(`/detail/${props.data.publicKey.toString()}`)} variant="outline-success" className="float-end">Detail</Button>
                    </Card.Body>
                </Card >
            </div >
            {/* : <></>
            } */}
        </>)
}

export default AllVehicleCard