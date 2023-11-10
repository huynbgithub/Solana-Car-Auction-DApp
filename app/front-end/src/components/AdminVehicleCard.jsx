import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Web3Context } from "../App";
import { useNavigate } from 'react-router-dom'
import { ScopeReference } from './Utils'
import { ApprovalStatus } from '../components/Utils'

const AdminVehicleCard = (props) => {

    const navigate = useNavigate()

    return (
        <>
            {!props.data.account.isApproved ?
                <div className="col-3 mt-3">
                    <Card className='' >
                        <Card.Img style={{ height: 200 }} variant="top" src={props.data.account.vehicleImages[0]} />
                        <Card.Body>
                            <Card.Title> <ScopeReference hexString={props.data.publicKey.toString()} type='address' /></Card.Title>
                            <Card.Text>
                                <ApprovalStatus className='mb-2' type={props.data.account.isApproved} />
                                <div>Starting Price: {props.data.account.startingPrice} SOL</div>
                            </Card.Text>
                            <Button onClick={() => navigate(`/detail/${props.data.publicKey.toString()}`)} variant="outline-success" className="float-end">Detail</Button>
                        </Card.Body>
                    </Card >
                </div>
                : <></>
            }
        </>
    )
}

export default AdminVehicleCard