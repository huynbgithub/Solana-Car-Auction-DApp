import React, { useContext, useState, useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
// import { exponent } from '../utils/Constants'
// import { setStart, getIsApproved } from '../contracts/VehicleContract'
import { Web3Context } from "../App";
import { useNavigate } from 'react-router-dom'
import { ScopeReference } from './Utils'
import { ApprovalStatus } from '../components/Utils'

const AssetVehicleCard = (props) => {

    const { program, setProgram } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);

    const [isChecked, setIsChecked] = useState(props.data.account.isStart)

    const navigate = useNavigate()

    const handleChecked = async (event) => {
        const newValue = event.target.checked
        try {
            await program.methods
                .setStart(newValue)
                .accounts({
                    vehicle: props.data.publicKey,
                    authority: account,
                })
                .rpc()
            setIsChecked(newValue)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            {props.data.account.ownerAddress.toString() == account.toString() ?
                <Card className=''>
                    <Card.Img style={{ height: 200 }} variant="top" src={props.data.account.vehicleImages[0]} />
                    <Card.Body>
                        <Card.Title> <ScopeReference hexString={props.data.publicKey.toString()} type='address' /></Card.Title>
                        <Card.Text>
                            <ApprovalStatus className='mb-1' type={props.data.account.isApproved} />
                            <div className='d-flex'>
                                <div className='me-2'> Start Auction: </div>
                                <Form.Check // prettier-ignore
                                    checked={isChecked}
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    onChange={event => handleChecked(event)}
                                />
                            </div>
                            <div>Starting Price: {props.data.account.startingPrice} SOL</div>
                        </Card.Text>
                        <Button onClick={() => navigate(`/detail/${props.data.publicKey.toString()}`)} variant="outline-success" className="float-end"> Detail </Button>
                    </Card.Body>
                </Card>
                : <></>
            }
        </>)
}

export default AssetVehicleCard