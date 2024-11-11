use anchor_lang::prelude::*;
declare_id!("6GzYR3S8KpmdjnbWCGFiRCVds62ygCenQMiMDZ9bubKa");
mod instructions;
use instructions::*;

#[program]
pub mod create_core_asset_example {

    use super::*;

    pub fn create(ctx: Context<CreateAsset>, args: CreateAssetArgs) -> Result<()> {
        process_create(ctx, args)
    }

    pub fn create_collection(
        ctx: Context<CreateCollection>,
        args: CreateCollectionArgs,
    ) -> Result<()> {
        process_create_collection(ctx, args)
    }
}
