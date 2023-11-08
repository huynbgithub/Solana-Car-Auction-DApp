import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { VehicleFactory } from '../target/types/vehicle_factory'

describe('vehicle_factory', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)


  const vehicleFactoryProgram = anchor.workspace.VehicleFactory as Program<VehicleFactory>


  // const vehicleKeypair2 = Keypair.generate()

  it('Does CPI2!', async () => {

    // console.log(
    //   vehicleKeypair2.publicKey
    // )

    // await vehicleFactoryProgram.methods
    //   .createVehicle({ ownerFullName: "b", seatCapacity: 2, firstRegistrationDate: new anchor.BN(2) }, new anchor.BN(3), ["c.img", "d.img"])
    //   .accounts({
    //     vehicle: vehicleKeypair2.publicKey,
    //     owner: provider.wallet.publicKey,
    //   })
    //   .signers([vehicleKeypair2])
    //   .rpc()


    // console.log(
    //   (await vehicleFactoryProgram.account.vehicleData.fetch(vehicleKeypair2.publicKey)).bids
    // )

    // await vehicleFactoryProgram.methods
    //   .setStart(true)
    //   .accounts({
    //     vehicle: vehicleKeypair2.publicKey,
    //     authority: provider.wallet.publicKey,
    //   })
    //   .rpc()

    // await vehicleFactoryProgram.methods
    //   .createBid(new anchor.BN(5))
    //   .accounts({
    //     vehicle: vehicleKeypair2.publicKey,
    //     authority: provider.wallet.publicKey,
    //     toAccount: "81WL6cNBWGhQnwgCsbkGhxaqA4gK3ut928H5fyP8KJmT",
    //   })
    //   .rpc()

    // console.log(
    //   (await vehicleFactoryProgram.account.vehicleData.fetch(vehicleKeypair2.publicKey)).bids
    // )
    console.log(
      await vehicleFactoryProgram.account.vehicleData.fetch("898oEESEjynwy4Ro13TGGg8E9Z558iFdgipAfnqLcH7H")
    )
  })
})
