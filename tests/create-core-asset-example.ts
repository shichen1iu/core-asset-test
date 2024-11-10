import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CreateCoreAssetExample } from "../target/types/create_core_asset_example";
import { MPL_CORE_PROGRAM_ID } from "@metaplex-foundation/mpl-core";
import { Keypair } from "@solana/web3.js";

describe("create-core-asset-example", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const wallet = anchor.Wallet.local();
  const program = anchor.workspace
    .CreateCoreAssetExample as Program<CreateCoreAssetExample>;

  it("Create Asset", async () => {
    const asset = Keypair.generate();
    console.log(asset.publicKey.toBase58());

    let createAssetArgs = {
      name: "Dwuw Avatar",
      uri: "https://gray-managing-penguin-864.mypinata.cloud/ipfs/QmT7FU5uT8gjSRZbZzhCTo862zKhWv13q8fmuJV1YafJi8",
    };

    const createAssetTx = await program.methods
      .create(createAssetArgs)
      .accountsPartial({
        asset: asset.publicKey,
        collection: null,
        authority: null,
        payer: wallet.publicKey,
        owner: null,
        updateAuthority: null,
        mplCoreProgram: MPL_CORE_PROGRAM_ID,
      })
      .signers([asset, wallet.payer])
      .rpc();


    
    console.log(createAssetTx);
  });
});
