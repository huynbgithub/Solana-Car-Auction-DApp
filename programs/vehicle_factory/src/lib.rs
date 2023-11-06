use anchor_lang::prelude::*;
use std::str::FromStr;

declare_id!("pPYAk8suZZd8xqyVs49rugZztvfV7a8E7AJuvmQHRLf");

#[program]
pub mod vehicle_factory {
    use super::*;

    pub fn create_vehicle(
        ctx: Context<CreateVehicle>,
        props: VehicleProperties,
        starting_price: u128,
        vehicle_images: Vec<String>,
    ) -> Result<()> {
        let vehicle = &mut ctx.accounts.vehicle;
        let owner = &mut ctx.accounts.owner;

        vehicle.owner_address = *owner.key;
        vehicle.is_start = false;
        vehicle.is_approved = false;
        vehicle.props = props;
        vehicle.starting_price = starting_price;
        vehicle.vehicle_images = vehicle_images;
        vehicle.bids = Vec::new();
        vehicle.bids_size = 0;

        Ok(())
    }

    pub fn approve_vehicle(ctx: Context<ApproveVehicle>) -> Result<()> {
        let vehicle = &mut ctx.accounts.vehicle;

        vehicle.is_approved = true;

        Ok(())
    }

    pub fn set_start(ctx: Context<SetStart>, state: bool) -> Result<()> {
        let vehicle = &mut ctx.accounts.vehicle;

        vehicle.is_start = state;

        Ok(())
    }

    pub fn create_bid(ctx: Context<CreateBid>, quantity: u128) -> Result<()> {
        let vehicle = &mut ctx.accounts.vehicle;

        let bidder = &mut ctx.accounts.authority;

        let bids_size = vehicle.bids_size;

        vehicle.bids.push(
            Bid {
                index: bids_size + 1, 
                bidder: bidder.key(),
                quantity: quantity, 
                is_withdrawed: false
            }
        );

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateVehicle<'info> {
    #[account(
        init,
        payer = owner,
        space = 2000
    )]
    pub vehicle: Account<'info, VehicleData>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ApproveVehicle<'info> {
    #[account(
        mut, 
        constraint = authority.key() == Pubkey::from_str("81WL6cNBWGhQnwgCsbkGhxaqA4gK3ut928H5fyP8KJmD").unwrap(), 
    )]
    pub vehicle: Account<'info, VehicleData>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct SetStart<'info> {
    #[account(
        mut, 
        constraint = authority.key() == vehicle.owner_address, 
    )]
    pub vehicle: Account<'info, VehicleData>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct AllUsers<'info> {
    #[account()]
    pub vehicle: Account<'info, VehicleData>,
}

#[derive(Accounts)]
pub struct CreateBid<'info> {
    #[account
    (
        mut,
        constraint = authority.key() != vehicle.owner_address
    )]
    pub vehicle: Account<'info, VehicleData>,
    pub authority: Signer<'info>,
}

#[account]
pub struct VehicleData {
    owner_address: Pubkey,
    is_start: bool,
    is_approved: bool,
    props: VehicleProperties,
    starting_price: u128,
    vehicle_images: Vec<String>,
    bids: Vec<Bid>,
    bids_size: u32,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct VehicleProperties {
    owner_full_name: String,
    // owner_address: String,
    // brand: String,
    // vehicle_type: String,
    // color: String,
    seat_capacity: u16,
    // origin: String,
    // license_plate: String,
    // engine_number: String,
    // chassis_number: String,
    // model_code: String,
    // capacity: u32,
    first_registration_date: u128,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Bid {
    index: u32,
    bidder: Pubkey,
    quantity: u128,
    is_withdrawed: bool,
}
