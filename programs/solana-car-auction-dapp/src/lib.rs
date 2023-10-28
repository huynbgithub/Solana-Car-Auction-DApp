use anchor_lang::prelude::*;

declare_id!("vBHFCJFKn5oM48KxE9oEzxCQMLTjhbC3USMeY4SzhcG");

#[program]
pub mod solana_car_auction_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
