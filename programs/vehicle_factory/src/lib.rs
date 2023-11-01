use anchor_lang::prelude::*;
use vehicle::cpi::accounts::Initialize;
use vehicle::program::Vehicle;
use vehicle::VehicleProperties;
use vehicle::{self, VehicleData};

declare_id!("95w6ZbaNJV2sJzDuQQxE3wqshfyE3Y1Q3PHJWDdMCHWF");

#[program]
pub mod vehicle_factory {
    use super::*;

    pub fn initialize(ctx: Context<InitializeFactory>) -> Result<()> {
        let vehicle_factory = &mut ctx.accounts.vehicle_factory;
        let owner = &mut ctx.accounts.signer;

        vehicle_factory.deployed_vehicles = Vec::new();
        vehicle_factory.owner = *owner.key;

        Ok(())
    }

    pub fn create_vehicle(
        ctx: Context<CreateVehicle>,
        props: VehicleProperties,
        starting_price: u128,
        vehicle_images: Vec<String>,
    ) -> Result<()> {
        vehicle::cpi::initialize(
            ctx.accounts.initialize_ctx(),
            props,
            starting_price,
            vehicle_images,
        )
    }
}

#[derive(Accounts)]
pub struct CreateVehicle<'info> {
    #[account(mut)]
    pub vehicle: Account<'info, VehicleData>,
    pub vehicle_program: Program<'info, Vehicle>,
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> CreateVehicle<'info> {
    pub fn initialize_ctx(&self) -> CpiContext<'_, '_, '_, 'info, Initialize<'info>> {
        let cpi_program = self.vehicle_program.to_account_info();
        let cpi_accounts = Initialize {
            vehicle: self.vehicle.to_account_info(),
            signer: self.signer.to_account_info(),
            system_program: self.system_program.to_account_info(),
        };
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

#[derive(Accounts)]
pub struct InitializeFactory<'info> {
    #[account(
        init,
        payer = signer,
        space = 2000
    )]
    pub vehicle_factory: Account<'info, VehicleFactory>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct VehicleFactory {
    owner: Pubkey,
    deployed_vehicles: Vec<String>,
}
