import React, { useContext, useState, useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { exponent } from '../utils/Constants'
import { setStart, getIsApproved } from '../contracts/VehicleContract'
import { Web3Context } from "../App";
import { useNavigate } from 'react-router-dom'
import { ScopeReference } from './Utils'
import { ApprovalStatus } from '../components/Utils'

const AssetVehicleCard = (props) => {

    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);
    const [approved, setApproved] = useState(null)

    const [isChecked, setIsChecked] = useState(props.data.isStart)

    const navigate = useNavigate()

    const handleChecked = async (event) => {
        const newValue = event.target.checked
        try {
            await setStart(web3, props.data.address, account, newValue)
            setIsChecked(newValue)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        async function handleEffect() {
            const approved = await getIsApproved(props.data.address);
            setApproved(approved);
        }
        handleEffect();
    }, []);

    return (
        <Card className=''>
            <Card.Img style={{ height: 200 }} variant="top" src={props.data.vehicleImages[0]} />
            <Card.Body>
                <Card.Title> <ScopeReference hexString={props.data.address} type='address' /></Card.Title>
                <Card.Text>
                    <ApprovalStatus className='mb-1' type={approved} />
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
                    <div>Starting Price: {props.data.startingPrice / exponent} KLAY</div>
                </Card.Text>
                <Button onClick={() => navigate(`/detail/${props.data.address}`)} variant="outline-danger" className="float-end"> Detail </Button>
            </Card.Body>
        </Card>
    )
}

export default AssetVehicleCard