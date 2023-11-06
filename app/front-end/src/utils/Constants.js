import web3 from 'web3'

export const exponent = 1000000000000000000
export const reciprocalExponent = 1 / 1000000000000000000

export const gas = 30000000
export const gasPrice = web3.utils.toWei(25, 'gwei')