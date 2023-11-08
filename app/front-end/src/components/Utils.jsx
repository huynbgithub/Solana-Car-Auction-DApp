import React from 'react'
import { Alert } from 'react-bootstrap'
import {
    BsFillPatchCheckFill, BsFillPatchExclamationFill,
    BsFillBookmarkCheckFill, BsFillBookmarkXFill
} from 'react-icons/bs'

export const ScopeReference = (props) => {
    const url = props.type === 'address'
        ? `https://explorer.solana.com/address/${props.hexString}?cluster=devnet`
        : `https://explorer.solana.com/tx/${props.hexString}?cluster=devnet`
    return (
        <Alert.Link href={url} className={props.className} target="_blank">
            {props.hexString.slice(0, 4)}...{props.hexString.slice(-4)}
        </Alert.Link>
    )
}

export const AuctionStatus = (props) => {
    return (
        <div style={{ color: props.type ? 'green' : 'red' }} className={props.className + ' d-flex align-items-center'}>
            {props.type ? <BsFillPatchCheckFill className='me-1' size={24} /> : <BsFillPatchExclamationFill className='me-1' size={24} />}
            {props.type ? 'Auctioned' : 'Not In Auction'}
        </div>
    )
}

export const ApprovalStatus = (props) => {
    return (
        <div style={{ color: props.type ? 'green' : 'red' }} className={props.className + ' d-flex align-items-center'}>
            {props.type ? <BsFillBookmarkCheckFill className='me-1' size={24} /> : <BsFillBookmarkXFill className='me-1' size={24} />}
            {props.type ? 'Approved' : 'Not Approved'}
        </div>
    )
}