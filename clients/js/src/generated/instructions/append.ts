/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type AppendInstructionAccounts = {
  merkleTree: PublicKey;
  authority?: Signer;
  noop: PublicKey;
};

// Data.
export type AppendInstructionData = {
  discriminator: Array<number>;
  leaf: Uint8Array;
};

export type AppendInstructionDataArgs = { leaf: Uint8Array };

export function getAppendInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<AppendInstructionDataArgs, AppendInstructionData> {
  const s = context.serializer;
  return mapSerializer<AppendInstructionDataArgs, any, AppendInstructionData>(
    s.struct<AppendInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['leaf', s.bytes({ size: 32 })],
      ],
      { description: 'AppendInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [149, 120, 18, 222, 236, 225, 88, 203],
    })
  ) as Serializer<AppendInstructionDataArgs, AppendInstructionData>;
}

// Args.
export type AppendInstructionArgs = AppendInstructionDataArgs;

// Instruction.
export function append(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: AppendInstructionAccounts & AppendInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'splAccountCompression',
      'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Merkle Tree.
  keys.push({
    pubkey: resolvedAccounts.merkleTree,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.merkleTree, true),
  });

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Noop.
  keys.push({
    pubkey: resolvedAccounts.noop,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.noop, false),
  });

  // Data.
  const data =
    getAppendInstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}