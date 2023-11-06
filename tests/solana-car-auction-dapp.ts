import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { expect } from 'chai'
import { VehicleFactory } from '../target/types/vehicle_factory'

describe('vehicle_factory', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)


  const vehicleFactoryProgram = anchor.workspace.VehicleFactory as Program<VehicleFactory>


  const vehicleKeypair1 = Keypair.generate()
  const vehicleKeypair2 = Keypair.generate()
  const vehicleKeypair3 = Keypair.generate()

  // it('Does CPI1!', async () => {
  //   await vehicleFactoryProgram.methods
  //     .initialize()
  //     .accounts({
  //       vehicleFactory: vehicleKeypair1.publicKey,
  //       signer: provider.wallet.publicKey,
  //     })
  //     .signers([vehicleKeypair1])
  //     .rpc()
  // });

  it('Does CPI2!', async () => {
    await vehicleFactoryProgram.methods
      .createVehicle({owner: "a", seatCapacity:1, firstRegistrationDate: new anchor.BN(1)}, new anchor.BN(1), [])
      .accounts({
        vehicle: vehicleKeypair2.publicKey,
        signer: provider.wallet.publicKey,
      })
      .signers([vehicleKeypair2])
      .rpc()


    expect(
      (
        await vehicleFactoryProgram.account.vehicleData.fetch(vehicleKeypair2.publicKey)
      ).startingPrice.toNumber()
      ).to.equal(1)

  })
})
