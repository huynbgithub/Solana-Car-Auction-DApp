import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BsExclamationCircle } from 'react-icons/bs'
import { Web3Context } from '../App'
import { ScopeReference } from './Utils'

const RegisterAuctionModal = (props) => {
    const { program } = useContext(Web3Context);
    const { account } = useContext(Web3Context);
    const { balance } = useContext(Web3Context);

    const [show, setShow] = useState(false)
    const [nearestUnwithdrawnBid, setNearestUnwithdrawnBid] = useState(null)
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)
        formik.resetForm()
    }

    const handleEffect = async () => {
        if (program) {
            const data = await program.account.vehicleData.fetch(props.address).catch(error => console.log(error));
            const bids = data.bids
            if (bids) {
                const nearestUnwithdrawnBid = bids[bids.length - 1]
                setNearestUnwithdrawnBid(nearestUnwithdrawnBid)
            }
        }
    }

    useEffect(() => {
        if (show) {
            handleEffect()
        }
    }, [show])

    const formik = useFormik({
        initialValues: {
            quantity: 0.1,
        },
        validationSchema: Yup.object({
            quantity: Yup.number()
                .min(
                    nearestUnwithdrawnBid == null || (nearestUnwithdrawnBid).isWithdrawn
                        ?
                        props.startingPrice
                        :
                        nearestUnwithdrawnBid.quantity
                    ,
                    nearestUnwithdrawnBid == null || (nearestUnwithdrawnBid).isWithdrawn
                        ?
                        'The quantity must equal or exceed the starting price'
                        : 'New quantity must be greater than the previous'
                )
                .max(balance,
                    'The balance must be greater than the quantity')
                .required('Quantity is required')
        }),
        onSubmit: values => {
            const handleSubmit = async () => {

                // const date = new Date().getTime()
                const txHash =
                    await program.methods
                        .createBid(values.quantity)
                        .accounts({
                            vehicle: props.address,
                            authority: account,
                            refundAccount: props.bids.length > 0 ? props.bids[props.bids.length - 1].bidder : account,
                        })
                        .rpc().catch(error => console.log(error))

                try {
                    props.enableShow({
                        hasShow: true,
                        variant: 'success',
                        content: <div>
                            {txHash
                                ? <>New bid has been created. Transaction hash: < ScopeReference hexString={txHash} type='transaction' /></>
                                : 'Transaction failed'
                            }
                        </div>
                    })
                } catch (e) {
                    console.log(e)
                }
                props.setBids((await program.account.vehicleData.fetch(props.address)).bids)

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
                            <InputGroup.Text id="basic-addon1">SOL</InputGroup.Text>
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
                            {nearestUnwithdrawnBid == null || (nearestUnwithdrawnBid).isWithdrawn
                                ?
                                <div>
                                    <b>Starting Price: </b> {props.startingPrice} SOL
                                </div>
                                :
                                <div>
                                    <b>Previous Quantity: </b> {nearestUnwithdrawnBid.quantity} SOL
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
