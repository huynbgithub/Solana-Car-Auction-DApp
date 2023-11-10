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

    const [show, setShow] = useState(false)
    // const [nearestUnwithdrawedBid, setNearestUnwithdrawedBid] = useState(null)
    const handleClose = () => setShow(false)
    const handleShow = () => {
        setShow(true)
        formik.resetForm()
    }

    // useEffect(() => {
    //     if (show) {
    //         const handleEffect = async () => {
    //             const nearestUnwithdrawedBid = await findNearestUnwithdrawedBid(props.contractAddress)
    //             console.log(nearestUnwithdrawedBid)
    //             setNearestUnwithdrawedBid(nearestUnwithdrawedBid)
    //         }
    //         handleEffect()
    //     }
    // }, [show])

    const formik = useFormik({
        initialValues: {
            quantity: 0.1,
        },
        validationSchema: Yup.object({
            quantity: Yup.number()
                .min(
                    // nearestUnwithdrawedBid == null || (nearestUnwithdrawedBid).isWithdrawed
                    //     ? (
                    props.startingPrice
                    //      / exponent)
                    // : (Math.round(
                    //     ((nearestUnwithdrawedBid).quantity
                    //         / exponent + 0.1 + Number.EPSILON) * 100)) / 100
                    ,
                    // nearestUnwithdrawedBid == null || (nearestUnwithdrawedBid).isWithdrawed
                    //     ? 
                    'The quantity must equal or exceed the starting price'

                    // : 'New quantity must be greater than the previous at least 0.1 SOL'
                )
                // .max(Math.round((Number(balance) - 0.1) * 100) / 100,
                //     'The balance must be greater than the quantity at least 0.1 SOL')
                .required('Quantity is required')
        }),
        onSubmit: values => {
            const handleSubmit = async () => {

                // const date = new Date().getTime()
                const receipt =
                    await program.methods
                        .createBid(values.quantity)
                        .accounts({
                            vehicle: props.address,
                            authority: account,
                            toAccount: props.address,
                        })
                        .rpc().catch(error => console.log(error))

                try {
                    props.enableShow({
                        hasShow: true,
                        variant: 'success',
                        content: <div>New auction has been created. Transaction hash:
                            {<ScopeReference
                                hexString={receipt}
                                type='transaction' />}
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
                            {/* {nearestUnwithdrawedBid == null || (nearestUnwithdrawedBid).isWithdrawed
                                ?  */}
                            <div>
                                <b>Starting Price: </b> {props.startingPrice} SOL
                            </div>
                            {/* :
                                <div>
                                    <b>Previous Quantity: </b> {((nearestUnwithdrawedBid).quantity) / exponent} SOL
                                </div> 
                            }*/}

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
