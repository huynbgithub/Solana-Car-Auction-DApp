import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BsExclamationCircle } from 'react-icons/bs'
import { exponent } from '../utils/Constants'
import { Web3Context } from '../App'
import { ScopeReference } from './Utils'
import { createBid, findNearestUnwithdrawedBid, getBids } from '../contracts/VehicleContract'

const RegisterAuctionModal = (props) => {
    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);

    const [show, setShow] = useState(false)
    const [nearestUnwithdrawedBid, setNearestUnwithdrawedBid] = useState(null)
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)
        formik.resetForm()
    }

    useEffect(() => {
        if (show) {
            const handleEffect = async () => {
                const nearestUnwithdrawedBid = await findNearestUnwithdrawedBid(props.contractAddress)
                console.log(nearestUnwithdrawedBid)
                setNearestUnwithdrawedBid(nearestUnwithdrawedBid)
            }
            handleEffect()
        }
    }, [show])

    const formik = useFormik({
        initialValues: {
            quantity: 10,
        },
        validationSchema: Yup.object({
            quantity: Yup.number()
                .min(
                    nearestUnwithdrawedBid == null || (nearestUnwithdrawedBid).isWithdrawed
                        ? (props.startingPrice / exponent)
                        : (Math.round(
                            ((nearestUnwithdrawedBid).quantity
                                / exponent + 0.1 + Number.EPSILON) * 100)) / 100,
                    nearestUnwithdrawedBid == null || (nearestUnwithdrawedBid).isWithdrawed
                        ? 'The quantity must equal or exceed the starting price'
                        : 'New quantity must be greater than the previous at least 0.1 KLAY'
                ).max(Math.round((Number(balance) - 0.1) * 100) / 100,
                    'The balance must be greater than the quantity at least 0.1 KLAY')
                .required('Quantity is required')
        }),
        onSubmit: values => {
            const handleSubmit = async () => {

                const date = new Date().getTime()
                const receipt = await createBid(
                    web3,
                    props.contractAddress,
                    account,
                    (values.quantity * exponent).toString(),
                    date.toString()
                )
                try {
                    props.enableShow({
                        hasShow: true,
                        variant: 'success',
                        content: <div>New auction has been created. Transaction hash: {<ScopeReference
                            hexString={receipt.transactionHash}
                            type='transaction' />}</div>
                    })
                } catch (e) {
                    console.log(e)
                }
                props.setBids(await getBids(props.contractAddress))

                handleClose()
            }
            handleSubmit()
        }
    })

    return (
        <div className={props.className}>
            <Button variant='danger' onClick={handleShow}>
                Register
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register An Auction Round</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="h5"> Quantity </p>
                        <InputGroup>
                            <Form.Control
                                id="quantity"
                                aria-describedby="basic-addon1"
                                type="number"
                                defaultValue={formik.values.quantity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputGroup.Text id="basic-addon1">KLAY</InputGroup.Text>
                        </InputGroup>
                        <div className='mb-3'>
                            {formik.touched.quantity && formik.errors.quantity ? (
                                <p className='validation-error'>
                                    <BsExclamationCircle className='me-2' />
                                    <small> {formik.errors.quantity} </small>
                                </p>
                            ) : null}
                        </div>
                        <div>
                            {nearestUnwithdrawedBid == null || (nearestUnwithdrawedBid).isWithdrawed
                                ? <div>
                                    <b>Starting Price: </b> {props.startingPrice / exponent} KLAY
                                </div>
                                :
                                <div>
                                    <b>Previous Quantity: </b> {((nearestUnwithdrawedBid).quantity) / exponent} KLAY
                                </div>
                            }

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>

    )
}


export default RegisterAuctionModal
