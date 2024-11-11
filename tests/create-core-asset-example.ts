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

  const collection = Keypair.generate();
  const asset = Keypair.generate();

  it("Create Asset", async () => {
    let createAssetArgs = {
      name: "Dwuw Avatar",
      uri: "https://gray-managing-penguin-864.mypinata.cloud/ipfs/QmRxeNPEdqWEN3pAKHLuFzaqvr3UJE5jnEzGeXWoQj5mYT",
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

    console.log("Asset Address: ", asset.publicKey.toBase58());
    console.log("Create Asset TxHash : ", createAssetTx);
  });

  it("Create Collection", async () => {
    let createCollectionArgs = {
      name: "My Collection",
      uri: "https://gray-managing-penguin-864.mypinata.cloud/ipfs/QmZuUrZe6KrD1BnNHFPphBuHGUXTbxS4996TtSQjjSAFAD",
    };

    const createCollectionTx = await program.methods
      .createCollection(createCollectionArgs)
      .accountsPartial({
        collection: collection.publicKey,
        payer: wallet.publicKey,
        updateAuthority: null,
        mplCoreProgram: MPL_CORE_PROGRAM_ID,
      })
      .signers([collection, wallet.payer])
      .rpc();

    console.log("Collection Address: ", collection.publicKey.toBase58());
    console.log("Create Collection TxHash : ", createCollectionTx);
  });
});
