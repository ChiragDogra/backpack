import { Keypair } from "@solana/web3.js";
import * as bip32 from "bip32";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

// Returns the account Keypair for the given seed and derivation path.
export function deriveSolanaKeypair(
  seed: Buffer,
  derivationPath: string
): Keypair {
  let derivedSeed: Buffer;
  if (derivationPath.startsWith("501'")) {
    // Sollet deprecated path
    derivedSeed = bip32.fromSeed(seed).derivePath(derivationPath).privateKey!;
  } else {
    derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
  }
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  return Keypair.fromSecretKey(secret);
}
