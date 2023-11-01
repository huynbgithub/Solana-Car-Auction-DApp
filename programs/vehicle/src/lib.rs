use anchor_lang::prelude::*;
declare_id!("9AnzrXaEB7xpbrAJFbaxc6ztM8uQvwg4puKqBoL77fma");

#[program]
pub mod vehicle {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        props: VehicleProperties,
        starting_price: u128,
        vehicle_images: Vec<String>,
    ) -> Result<()> {
        let vehicle = &mut ctx.accounts.vehicle;
        let owner = &mut ctx.accounts.signer;

        vehicle.owner = *owner.key;
        vehicle.is_start = false;
        vehicle.is_approved = false;
        vehicle.props = props;
        vehicle.starting_price = starting_price;
        vehicle.vehicle_images = vehicle_images;
        vehicle.bids = Vec::new();
        vehicle.bids_size = 0;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        space = 2000
    )]
    pub vehicle: Account<'info, VehicleData>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct VehicleData {
    owner: Pubkey,
    is_start: bool,
    is_approved: bool,
    props: VehicleProperties,
    starting_price: u128,
    vehicle_images: Vec<String>,
    bids: Vec<Bid>,
    bids_size: u32,
}

#[account]
pub struct VehicleProperties {
    owner: String,
    brand: String,
    vehicle_type: String,
    color: String,
    seat_capacity: u16,
    origin: String,
    license_plate: String,
    engine_number: String,
    chassis_number: String,
    model_code: String,
    capacity: u32,
    first_registration_date: u128,
}

#[account]
pub struct Bid {
    index: u32,
    bidder: Pubkey,
    quantity: u128,
    bid_date: u128,
    is_withdrawed: bool,
}
