/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { DecompressableState, decompressableStateBeet } from '../types/DecompressableState';

/**
 * @category Instructions
 * @category SetDecompressableState
 * @category generated
 */
export type SetDecompressableStateInstructionArgs = {
  decompressableState: DecompressableState;
};
/**
 * @category Instructions
 * @category SetDecompressableState
 * @category generated
 */
export const setDecompressableStateStruct = new beet.BeetArgsStruct<
  SetDecompressableStateInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['decompressableState', decompressableStateBeet],
  ],
  'SetDecompressableStateInstructionArgs',
);
/**
 * Accounts required by the _setDecompressableState_ instruction
 *
 * @property [_writable_] treeAuthority
 * @property [**signer**] treeCreator
 * @category Instructions
 * @category SetDecompressableState
 * @category generated
 */
export type SetDecompressableStateInstructionAccounts = {
  treeAuthority: web3.PublicKey;
  treeCreator: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const setDecompressableStateInstructionDiscriminator = [
  18, 135, 238, 168, 246, 195, 61, 115,
];

/**
 * Creates a _SetDecompressableState_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category SetDecompressableState
 * @category generated
 */
export function createSetDecompressableStateInstruction(
  accounts: SetDecompressableStateInstructionAccounts,
  args: SetDecompressableStateInstructionArgs,
  programId = new web3.PublicKey('BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'),
) {
  const [data] = setDecompressableStateStruct.serialize({
    instructionDiscriminator: setDecompressableStateInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.treeAuthority,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.treeCreator,
      isWritable: false,
      isSigner: true,
    },
  ];

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc);
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
