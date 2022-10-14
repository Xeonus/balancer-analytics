/* tslint:disable */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
}

export interface AmpUpdate {
  __typename: "AmpUpdate";
  endAmp: Scalars["BigInt"];
  endTimestamp: Scalars["BigInt"];
  id: Scalars["ID"];
  poolId: Pool;
  scheduledTimestamp: Scalars["Int"];
  startAmp: Scalars["BigInt"];
  startTimestamp: Scalars["BigInt"];
}

export interface AmpUpdate_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  endAmp?: InputMaybe<Scalars["BigInt"]>;
  endAmp_gt?: InputMaybe<Scalars["BigInt"]>;
  endAmp_gte?: InputMaybe<Scalars["BigInt"]>;
  endAmp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  endAmp_lt?: InputMaybe<Scalars["BigInt"]>;
  endAmp_lte?: InputMaybe<Scalars["BigInt"]>;
  endAmp_not?: InputMaybe<Scalars["BigInt"]>;
  endAmp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  endTimestamp?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  endTimestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_not?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  scheduledTimestamp?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_gt?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_gte?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  scheduledTimestamp_lt?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_lte?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_not?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  startAmp?: InputMaybe<Scalars["BigInt"]>;
  startAmp_gt?: InputMaybe<Scalars["BigInt"]>;
  startAmp_gte?: InputMaybe<Scalars["BigInt"]>;
  startAmp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  startAmp_lt?: InputMaybe<Scalars["BigInt"]>;
  startAmp_lte?: InputMaybe<Scalars["BigInt"]>;
  startAmp_not?: InputMaybe<Scalars["BigInt"]>;
  startAmp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  startTimestamp?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  startTimestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_not?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
}

export type AmpUpdate_OrderBy =
  | "endAmp"
  | "endTimestamp"
  | "id"
  | "poolId"
  | "scheduledTimestamp"
  | "startAmp"
  | "startTimestamp";

export interface Balancer {
  __typename: "Balancer";
  id: Scalars["ID"];
  poolCount: Scalars["Int"];
  pools?: Maybe<Array<Pool>>;
  totalLiquidity: Scalars["BigDecimal"];
  totalSwapCount: Scalars["BigInt"];
  totalSwapFee: Scalars["BigDecimal"];
  totalSwapVolume: Scalars["BigDecimal"];
}

export interface BalancerPoolsArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Pool_Filter>;
}

export interface BalancerSnapshot {
  __typename: "BalancerSnapshot";
  id: Scalars["ID"];
  poolCount: Scalars["Int"];
  timestamp: Scalars["Int"];
  totalLiquidity: Scalars["BigDecimal"];
  totalSwapCount: Scalars["BigInt"];
  totalSwapFee: Scalars["BigDecimal"];
  totalSwapVolume: Scalars["BigDecimal"];
  vault: Balancer;
}

export interface BalancerSnapshot_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolCount?: InputMaybe<Scalars["Int"]>;
  poolCount_gt?: InputMaybe<Scalars["Int"]>;
  poolCount_gte?: InputMaybe<Scalars["Int"]>;
  poolCount_in?: InputMaybe<Array<Scalars["Int"]>>;
  poolCount_lt?: InputMaybe<Scalars["Int"]>;
  poolCount_lte?: InputMaybe<Scalars["Int"]>;
  poolCount_not?: InputMaybe<Scalars["Int"]>;
  poolCount_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  totalLiquidity?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalLiquidity_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapCount?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_gt?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_gte?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalSwapCount_lt?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_lte?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_not?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalSwapFee?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapFee_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  vault?: InputMaybe<Scalars["String"]>;
  vault_?: InputMaybe<Balancer_Filter>;
  vault_contains?: InputMaybe<Scalars["String"]>;
  vault_contains_nocase?: InputMaybe<Scalars["String"]>;
  vault_ends_with?: InputMaybe<Scalars["String"]>;
  vault_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  vault_gt?: InputMaybe<Scalars["String"]>;
  vault_gte?: InputMaybe<Scalars["String"]>;
  vault_in?: InputMaybe<Array<Scalars["String"]>>;
  vault_lt?: InputMaybe<Scalars["String"]>;
  vault_lte?: InputMaybe<Scalars["String"]>;
  vault_not?: InputMaybe<Scalars["String"]>;
  vault_not_contains?: InputMaybe<Scalars["String"]>;
  vault_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  vault_not_ends_with?: InputMaybe<Scalars["String"]>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  vault_not_in?: InputMaybe<Array<Scalars["String"]>>;
  vault_not_starts_with?: InputMaybe<Scalars["String"]>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  vault_starts_with?: InputMaybe<Scalars["String"]>;
  vault_starts_with_nocase?: InputMaybe<Scalars["String"]>;
}

export type BalancerSnapshot_OrderBy =
  | "id"
  | "poolCount"
  | "timestamp"
  | "totalLiquidity"
  | "totalSwapCount"
  | "totalSwapFee"
  | "totalSwapVolume"
  | "vault";

export interface Balancer_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolCount?: InputMaybe<Scalars["Int"]>;
  poolCount_gt?: InputMaybe<Scalars["Int"]>;
  poolCount_gte?: InputMaybe<Scalars["Int"]>;
  poolCount_in?: InputMaybe<Array<Scalars["Int"]>>;
  poolCount_lt?: InputMaybe<Scalars["Int"]>;
  poolCount_lte?: InputMaybe<Scalars["Int"]>;
  poolCount_not?: InputMaybe<Scalars["Int"]>;
  poolCount_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  pools_?: InputMaybe<Pool_Filter>;
  totalLiquidity?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalLiquidity_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapCount?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_gt?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_gte?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalSwapCount_lt?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_lte?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_not?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalSwapFee?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapFee_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type Balancer_OrderBy =
  | "id"
  | "poolCount"
  | "pools"
  | "totalLiquidity"
  | "totalSwapCount"
  | "totalSwapFee"
  | "totalSwapVolume";

export interface Block {
  __typename: "Block";
  author?: Maybe<Scalars["String"]>;
  difficulty?: Maybe<Scalars["BigInt"]>;
  gasLimit?: Maybe<Scalars["BigInt"]>;
  gasUsed?: Maybe<Scalars["BigInt"]>;
  id: Scalars["ID"];
  number: Scalars["BigInt"];
  parentHash?: Maybe<Scalars["String"]>;
  receiptsRoot?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["BigInt"]>;
  stateRoot?: Maybe<Scalars["String"]>;
  timestamp: Scalars["BigInt"];
  totalDifficulty?: Maybe<Scalars["BigInt"]>;
  transactionsRoot?: Maybe<Scalars["String"]>;
  unclesHash?: Maybe<Scalars["String"]>;
}

export interface BlockChangedFilter {
  number_gte: Scalars["Int"];
}

export interface Block_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  author?: InputMaybe<Scalars["String"]>;
  author_contains?: InputMaybe<Scalars["String"]>;
  author_contains_nocase?: InputMaybe<Scalars["String"]>;
  author_ends_with?: InputMaybe<Scalars["String"]>;
  author_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  author_gt?: InputMaybe<Scalars["String"]>;
  author_gte?: InputMaybe<Scalars["String"]>;
  author_in?: InputMaybe<Array<Scalars["String"]>>;
  author_lt?: InputMaybe<Scalars["String"]>;
  author_lte?: InputMaybe<Scalars["String"]>;
  author_not?: InputMaybe<Scalars["String"]>;
  author_not_contains?: InputMaybe<Scalars["String"]>;
  author_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  author_not_ends_with?: InputMaybe<Scalars["String"]>;
  author_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  author_not_in?: InputMaybe<Array<Scalars["String"]>>;
  author_not_starts_with?: InputMaybe<Scalars["String"]>;
  author_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  author_starts_with?: InputMaybe<Scalars["String"]>;
  author_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  difficulty?: InputMaybe<Scalars["BigInt"]>;
  difficulty_gt?: InputMaybe<Scalars["BigInt"]>;
  difficulty_gte?: InputMaybe<Scalars["BigInt"]>;
  difficulty_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  difficulty_lt?: InputMaybe<Scalars["BigInt"]>;
  difficulty_lte?: InputMaybe<Scalars["BigInt"]>;
  difficulty_not?: InputMaybe<Scalars["BigInt"]>;
  difficulty_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  gasLimit?: InputMaybe<Scalars["BigInt"]>;
  gasLimit_gt?: InputMaybe<Scalars["BigInt"]>;
  gasLimit_gte?: InputMaybe<Scalars["BigInt"]>;
  gasLimit_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  gasLimit_lt?: InputMaybe<Scalars["BigInt"]>;
  gasLimit_lte?: InputMaybe<Scalars["BigInt"]>;
  gasLimit_not?: InputMaybe<Scalars["BigInt"]>;
  gasLimit_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  gasUsed?: InputMaybe<Scalars["BigInt"]>;
  gasUsed_gt?: InputMaybe<Scalars["BigInt"]>;
  gasUsed_gte?: InputMaybe<Scalars["BigInt"]>;
  gasUsed_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  gasUsed_lt?: InputMaybe<Scalars["BigInt"]>;
  gasUsed_lte?: InputMaybe<Scalars["BigInt"]>;
  gasUsed_not?: InputMaybe<Scalars["BigInt"]>;
  gasUsed_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  number?: InputMaybe<Scalars["BigInt"]>;
  number_gt?: InputMaybe<Scalars["BigInt"]>;
  number_gte?: InputMaybe<Scalars["BigInt"]>;
  number_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  number_lt?: InputMaybe<Scalars["BigInt"]>;
  number_lte?: InputMaybe<Scalars["BigInt"]>;
  number_not?: InputMaybe<Scalars["BigInt"]>;
  number_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  parentHash?: InputMaybe<Scalars["String"]>;
  parentHash_contains?: InputMaybe<Scalars["String"]>;
  parentHash_contains_nocase?: InputMaybe<Scalars["String"]>;
  parentHash_ends_with?: InputMaybe<Scalars["String"]>;
  parentHash_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  parentHash_gt?: InputMaybe<Scalars["String"]>;
  parentHash_gte?: InputMaybe<Scalars["String"]>;
  parentHash_in?: InputMaybe<Array<Scalars["String"]>>;
  parentHash_lt?: InputMaybe<Scalars["String"]>;
  parentHash_lte?: InputMaybe<Scalars["String"]>;
  parentHash_not?: InputMaybe<Scalars["String"]>;
  parentHash_not_contains?: InputMaybe<Scalars["String"]>;
  parentHash_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  parentHash_not_ends_with?: InputMaybe<Scalars["String"]>;
  parentHash_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  parentHash_not_in?: InputMaybe<Array<Scalars["String"]>>;
  parentHash_not_starts_with?: InputMaybe<Scalars["String"]>;
  parentHash_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  parentHash_starts_with?: InputMaybe<Scalars["String"]>;
  parentHash_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  receiptsRoot?: InputMaybe<Scalars["String"]>;
  receiptsRoot_contains?: InputMaybe<Scalars["String"]>;
  receiptsRoot_contains_nocase?: InputMaybe<Scalars["String"]>;
  receiptsRoot_ends_with?: InputMaybe<Scalars["String"]>;
  receiptsRoot_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  receiptsRoot_gt?: InputMaybe<Scalars["String"]>;
  receiptsRoot_gte?: InputMaybe<Scalars["String"]>;
  receiptsRoot_in?: InputMaybe<Array<Scalars["String"]>>;
  receiptsRoot_lt?: InputMaybe<Scalars["String"]>;
  receiptsRoot_lte?: InputMaybe<Scalars["String"]>;
  receiptsRoot_not?: InputMaybe<Scalars["String"]>;
  receiptsRoot_not_contains?: InputMaybe<Scalars["String"]>;
  receiptsRoot_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  receiptsRoot_not_ends_with?: InputMaybe<Scalars["String"]>;
  receiptsRoot_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  receiptsRoot_not_in?: InputMaybe<Array<Scalars["String"]>>;
  receiptsRoot_not_starts_with?: InputMaybe<Scalars["String"]>;
  receiptsRoot_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  receiptsRoot_starts_with?: InputMaybe<Scalars["String"]>;
  receiptsRoot_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  size?: InputMaybe<Scalars["BigInt"]>;
  size_gt?: InputMaybe<Scalars["BigInt"]>;
  size_gte?: InputMaybe<Scalars["BigInt"]>;
  size_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  size_lt?: InputMaybe<Scalars["BigInt"]>;
  size_lte?: InputMaybe<Scalars["BigInt"]>;
  size_not?: InputMaybe<Scalars["BigInt"]>;
  size_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  stateRoot?: InputMaybe<Scalars["String"]>;
  stateRoot_contains?: InputMaybe<Scalars["String"]>;
  stateRoot_contains_nocase?: InputMaybe<Scalars["String"]>;
  stateRoot_ends_with?: InputMaybe<Scalars["String"]>;
  stateRoot_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  stateRoot_gt?: InputMaybe<Scalars["String"]>;
  stateRoot_gte?: InputMaybe<Scalars["String"]>;
  stateRoot_in?: InputMaybe<Array<Scalars["String"]>>;
  stateRoot_lt?: InputMaybe<Scalars["String"]>;
  stateRoot_lte?: InputMaybe<Scalars["String"]>;
  stateRoot_not?: InputMaybe<Scalars["String"]>;
  stateRoot_not_contains?: InputMaybe<Scalars["String"]>;
  stateRoot_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  stateRoot_not_ends_with?: InputMaybe<Scalars["String"]>;
  stateRoot_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  stateRoot_not_in?: InputMaybe<Array<Scalars["String"]>>;
  stateRoot_not_starts_with?: InputMaybe<Scalars["String"]>;
  stateRoot_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  stateRoot_starts_with?: InputMaybe<Scalars["String"]>;
  stateRoot_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  timestamp?: InputMaybe<Scalars["BigInt"]>;
  timestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  timestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  timestamp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  timestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  timestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  timestamp_not?: InputMaybe<Scalars["BigInt"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalDifficulty?: InputMaybe<Scalars["BigInt"]>;
  totalDifficulty_gt?: InputMaybe<Scalars["BigInt"]>;
  totalDifficulty_gte?: InputMaybe<Scalars["BigInt"]>;
  totalDifficulty_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalDifficulty_lt?: InputMaybe<Scalars["BigInt"]>;
  totalDifficulty_lte?: InputMaybe<Scalars["BigInt"]>;
  totalDifficulty_not?: InputMaybe<Scalars["BigInt"]>;
  totalDifficulty_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  transactionsRoot?: InputMaybe<Scalars["String"]>;
  transactionsRoot_contains?: InputMaybe<Scalars["String"]>;
  transactionsRoot_contains_nocase?: InputMaybe<Scalars["String"]>;
  transactionsRoot_ends_with?: InputMaybe<Scalars["String"]>;
  transactionsRoot_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  transactionsRoot_gt?: InputMaybe<Scalars["String"]>;
  transactionsRoot_gte?: InputMaybe<Scalars["String"]>;
  transactionsRoot_in?: InputMaybe<Array<Scalars["String"]>>;
  transactionsRoot_lt?: InputMaybe<Scalars["String"]>;
  transactionsRoot_lte?: InputMaybe<Scalars["String"]>;
  transactionsRoot_not?: InputMaybe<Scalars["String"]>;
  transactionsRoot_not_contains?: InputMaybe<Scalars["String"]>;
  transactionsRoot_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  transactionsRoot_not_ends_with?: InputMaybe<Scalars["String"]>;
  transactionsRoot_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  transactionsRoot_not_in?: InputMaybe<Array<Scalars["String"]>>;
  transactionsRoot_not_starts_with?: InputMaybe<Scalars["String"]>;
  transactionsRoot_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  transactionsRoot_starts_with?: InputMaybe<Scalars["String"]>;
  transactionsRoot_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  unclesHash?: InputMaybe<Scalars["String"]>;
  unclesHash_contains?: InputMaybe<Scalars["String"]>;
  unclesHash_contains_nocase?: InputMaybe<Scalars["String"]>;
  unclesHash_ends_with?: InputMaybe<Scalars["String"]>;
  unclesHash_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  unclesHash_gt?: InputMaybe<Scalars["String"]>;
  unclesHash_gte?: InputMaybe<Scalars["String"]>;
  unclesHash_in?: InputMaybe<Array<Scalars["String"]>>;
  unclesHash_lt?: InputMaybe<Scalars["String"]>;
  unclesHash_lte?: InputMaybe<Scalars["String"]>;
  unclesHash_not?: InputMaybe<Scalars["String"]>;
  unclesHash_not_contains?: InputMaybe<Scalars["String"]>;
  unclesHash_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  unclesHash_not_ends_with?: InputMaybe<Scalars["String"]>;
  unclesHash_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  unclesHash_not_in?: InputMaybe<Array<Scalars["String"]>>;
  unclesHash_not_starts_with?: InputMaybe<Scalars["String"]>;
  unclesHash_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  unclesHash_starts_with?: InputMaybe<Scalars["String"]>;
  unclesHash_starts_with_nocase?: InputMaybe<Scalars["String"]>;
}

export interface Block_Height {
  hash?: InputMaybe<Scalars["Bytes"]>;
  number?: InputMaybe<Scalars["Int"]>;
  number_gte?: InputMaybe<Scalars["Int"]>;
}

export type Block_OrderBy =
  | "author"
  | "difficulty"
  | "gasLimit"
  | "gasUsed"
  | "id"
  | "number"
  | "parentHash"
  | "receiptsRoot"
  | "size"
  | "stateRoot"
  | "timestamp"
  | "totalDifficulty"
  | "transactionsRoot"
  | "unclesHash";

export interface GradualWeightUpdate {
  __typename: "GradualWeightUpdate";
  endTimestamp: Scalars["BigInt"];
  endWeights: Array<Scalars["BigInt"]>;
  id: Scalars["ID"];
  poolId: Pool;
  scheduledTimestamp: Scalars["Int"];
  startTimestamp: Scalars["BigInt"];
  startWeights: Array<Scalars["BigInt"]>;
}

export interface GradualWeightUpdate_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  endTimestamp?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  endTimestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_not?: InputMaybe<Scalars["BigInt"]>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  endWeights?: InputMaybe<Array<Scalars["BigInt"]>>;
  endWeights_contains?: InputMaybe<Array<Scalars["BigInt"]>>;
  endWeights_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]>>;
  endWeights_not?: InputMaybe<Array<Scalars["BigInt"]>>;
  endWeights_not_contains?: InputMaybe<Array<Scalars["BigInt"]>>;
  endWeights_not_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  scheduledTimestamp?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_gt?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_gte?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  scheduledTimestamp_lt?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_lte?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_not?: InputMaybe<Scalars["Int"]>;
  scheduledTimestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  startTimestamp?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  startTimestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_not?: InputMaybe<Scalars["BigInt"]>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  startWeights?: InputMaybe<Array<Scalars["BigInt"]>>;
  startWeights_contains?: InputMaybe<Array<Scalars["BigInt"]>>;
  startWeights_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]>>;
  startWeights_not?: InputMaybe<Array<Scalars["BigInt"]>>;
  startWeights_not_contains?: InputMaybe<Array<Scalars["BigInt"]>>;
  startWeights_not_contains_nocase?: InputMaybe<Array<Scalars["BigInt"]>>;
}

export type GradualWeightUpdate_OrderBy =
  | "endTimestamp"
  | "endWeights"
  | "id"
  | "poolId"
  | "scheduledTimestamp"
  | "startTimestamp"
  | "startWeights";

export type InvestType = "Exit" | "Join";

export interface JoinExit {
  __typename: "JoinExit";
  amounts: Array<Scalars["BigDecimal"]>;
  id: Scalars["ID"];
  pool: Pool;
  sender: Scalars["Bytes"];
  timestamp: Scalars["Int"];
  tx: Scalars["Bytes"];
  type: InvestType;
  user: User;
  valueUSD?: Maybe<Scalars["BigDecimal"]>;
}

export interface JoinExit_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amounts?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_contains?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_not?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_not_contains?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  pool?: InputMaybe<Scalars["String"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_gt?: InputMaybe<Scalars["String"]>;
  pool_gte?: InputMaybe<Scalars["String"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]>>;
  pool_lt?: InputMaybe<Scalars["String"]>;
  pool_lte?: InputMaybe<Scalars["String"]>;
  pool_not?: InputMaybe<Scalars["String"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  sender?: InputMaybe<Scalars["Bytes"]>;
  sender_contains?: InputMaybe<Scalars["Bytes"]>;
  sender_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  sender_not?: InputMaybe<Scalars["Bytes"]>;
  sender_not_contains?: InputMaybe<Scalars["Bytes"]>;
  sender_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  tx?: InputMaybe<Scalars["Bytes"]>;
  tx_contains?: InputMaybe<Scalars["Bytes"]>;
  tx_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  tx_not?: InputMaybe<Scalars["Bytes"]>;
  tx_not_contains?: InputMaybe<Scalars["Bytes"]>;
  tx_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  type?: InputMaybe<InvestType>;
  type_in?: InputMaybe<Array<InvestType>>;
  type_not?: InputMaybe<InvestType>;
  type_not_in?: InputMaybe<Array<InvestType>>;
  user?: InputMaybe<Scalars["String"]>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars["String"]>;
  user_contains_nocase?: InputMaybe<Scalars["String"]>;
  user_ends_with?: InputMaybe<Scalars["String"]>;
  user_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  user_gt?: InputMaybe<Scalars["String"]>;
  user_gte?: InputMaybe<Scalars["String"]>;
  user_in?: InputMaybe<Array<Scalars["String"]>>;
  user_lt?: InputMaybe<Scalars["String"]>;
  user_lte?: InputMaybe<Scalars["String"]>;
  user_not?: InputMaybe<Scalars["String"]>;
  user_not_contains?: InputMaybe<Scalars["String"]>;
  user_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  user_not_ends_with?: InputMaybe<Scalars["String"]>;
  user_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  user_not_in?: InputMaybe<Array<Scalars["String"]>>;
  user_not_starts_with?: InputMaybe<Scalars["String"]>;
  user_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  user_starts_with?: InputMaybe<Scalars["String"]>;
  user_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  valueUSD?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_gt?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_gte?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  valueUSD_lt?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_lte?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_not?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type JoinExit_OrderBy =
  | "amounts"
  | "id"
  | "pool"
  | "sender"
  | "timestamp"
  | "tx"
  | "type"
  | "user"
  | "valueUSD";

export interface LatestPrice {
  __typename: "LatestPrice";
  asset: Scalars["Bytes"];
  block: Scalars["BigInt"];
  id: Scalars["ID"];
  poolId: Pool;
  price: Scalars["BigDecimal"];
  pricingAsset: Scalars["Bytes"];
}

export interface LatestPrice_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  asset?: InputMaybe<Scalars["Bytes"]>;
  asset_contains?: InputMaybe<Scalars["Bytes"]>;
  asset_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  asset_not?: InputMaybe<Scalars["Bytes"]>;
  asset_not_contains?: InputMaybe<Scalars["Bytes"]>;
  asset_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  block?: InputMaybe<Scalars["BigInt"]>;
  block_gt?: InputMaybe<Scalars["BigInt"]>;
  block_gte?: InputMaybe<Scalars["BigInt"]>;
  block_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  block_lt?: InputMaybe<Scalars["BigInt"]>;
  block_lte?: InputMaybe<Scalars["BigInt"]>;
  block_not?: InputMaybe<Scalars["BigInt"]>;
  block_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["BigDecimal"]>;
  price_gt?: InputMaybe<Scalars["BigDecimal"]>;
  price_gte?: InputMaybe<Scalars["BigDecimal"]>;
  price_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  price_lt?: InputMaybe<Scalars["BigDecimal"]>;
  price_lte?: InputMaybe<Scalars["BigDecimal"]>;
  price_not?: InputMaybe<Scalars["BigDecimal"]>;
  price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  pricingAsset?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_contains?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  pricingAsset_not?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_not_contains?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
}

export type LatestPrice_OrderBy =
  | "asset"
  | "block"
  | "id"
  | "poolId"
  | "price"
  | "pricingAsset";

export interface ManagementOperation {
  __typename: "ManagementOperation";
  cashDelta: Scalars["BigDecimal"];
  id: Scalars["ID"];
  managedDelta: Scalars["BigDecimal"];
  poolTokenId: PoolToken;
  timestamp: Scalars["Int"];
  type: OperationType;
}

export interface ManagementOperation_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  cashDelta?: InputMaybe<Scalars["BigDecimal"]>;
  cashDelta_gt?: InputMaybe<Scalars["BigDecimal"]>;
  cashDelta_gte?: InputMaybe<Scalars["BigDecimal"]>;
  cashDelta_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  cashDelta_lt?: InputMaybe<Scalars["BigDecimal"]>;
  cashDelta_lte?: InputMaybe<Scalars["BigDecimal"]>;
  cashDelta_not?: InputMaybe<Scalars["BigDecimal"]>;
  cashDelta_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  managedDelta?: InputMaybe<Scalars["BigDecimal"]>;
  managedDelta_gt?: InputMaybe<Scalars["BigDecimal"]>;
  managedDelta_gte?: InputMaybe<Scalars["BigDecimal"]>;
  managedDelta_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  managedDelta_lt?: InputMaybe<Scalars["BigDecimal"]>;
  managedDelta_lte?: InputMaybe<Scalars["BigDecimal"]>;
  managedDelta_not?: InputMaybe<Scalars["BigDecimal"]>;
  managedDelta_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  poolTokenId?: InputMaybe<Scalars["String"]>;
  poolTokenId_?: InputMaybe<PoolToken_Filter>;
  poolTokenId_contains?: InputMaybe<Scalars["String"]>;
  poolTokenId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolTokenId_ends_with?: InputMaybe<Scalars["String"]>;
  poolTokenId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolTokenId_gt?: InputMaybe<Scalars["String"]>;
  poolTokenId_gte?: InputMaybe<Scalars["String"]>;
  poolTokenId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolTokenId_lt?: InputMaybe<Scalars["String"]>;
  poolTokenId_lte?: InputMaybe<Scalars["String"]>;
  poolTokenId_not?: InputMaybe<Scalars["String"]>;
  poolTokenId_not_contains?: InputMaybe<Scalars["String"]>;
  poolTokenId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolTokenId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolTokenId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolTokenId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolTokenId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolTokenId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolTokenId_starts_with?: InputMaybe<Scalars["String"]>;
  poolTokenId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  type?: InputMaybe<OperationType>;
  type_in?: InputMaybe<Array<OperationType>>;
  type_not?: InputMaybe<OperationType>;
  type_not_in?: InputMaybe<Array<OperationType>>;
}

export type ManagementOperation_OrderBy =
  | "cashDelta"
  | "id"
  | "managedDelta"
  | "poolTokenId"
  | "timestamp"
  | "type";

export type OperationType = "Deposit" | "Update" | "Withdraw";

/** Defines the order direction, either ascending or descending */
export type OrderDirection = "asc" | "desc";

export interface Pool {
  __typename: "Pool";
  address: Scalars["Bytes"];
  alpha?: Maybe<Scalars["BigDecimal"]>;
  amp?: Maybe<Scalars["BigInt"]>;
  baseToken?: Maybe<Scalars["Bytes"]>;
  beta?: Maybe<Scalars["BigDecimal"]>;
  c?: Maybe<Scalars["BigDecimal"]>;
  createTime: Scalars["Int"];
  dSq?: Maybe<Scalars["BigDecimal"]>;
  expiryTime?: Maybe<Scalars["BigInt"]>;
  factory?: Maybe<Scalars["Bytes"]>;
  historicalValues?: Maybe<Array<PoolHistoricalLiquidity>>;
  holdersCount: Scalars["BigInt"];
  id: Scalars["ID"];
  lambda?: Maybe<Scalars["BigDecimal"]>;
  lowerTarget?: Maybe<Scalars["BigDecimal"]>;
  mainIndex?: Maybe<Scalars["Int"]>;
  managementFee?: Maybe<Scalars["BigDecimal"]>;
  name?: Maybe<Scalars["String"]>;
  oracleEnabled: Scalars["Boolean"];
  owner?: Maybe<Scalars["Bytes"]>;
  poolType?: Maybe<Scalars["String"]>;
  poolTypeVersion?: Maybe<Scalars["Int"]>;
  priceRateProviders?: Maybe<Array<PriceRateProvider>>;
  principalToken?: Maybe<Scalars["Bytes"]>;
  protocolAumFeeCache?: Maybe<Scalars["BigDecimal"]>;
  protocolSwapFeeCache?: Maybe<Scalars["BigDecimal"]>;
  protocolYieldFeeCache?: Maybe<Scalars["BigDecimal"]>;
  root3Alpha?: Maybe<Scalars["BigDecimal"]>;
  s?: Maybe<Scalars["BigDecimal"]>;
  shares?: Maybe<Array<PoolShare>>;
  snapshots?: Maybe<Array<PoolSnapshot>>;
  sqrtAlpha?: Maybe<Scalars["BigDecimal"]>;
  sqrtBeta?: Maybe<Scalars["BigDecimal"]>;
  strategyType: Scalars["Int"];
  swapEnabled: Scalars["Boolean"];
  swapFee: Scalars["BigDecimal"];
  swaps?: Maybe<Array<Swap>>;
  swapsCount: Scalars["BigInt"];
  symbol?: Maybe<Scalars["String"]>;
  tauAlphaX?: Maybe<Scalars["BigDecimal"]>;
  tauAlphaY?: Maybe<Scalars["BigDecimal"]>;
  tauBetaX?: Maybe<Scalars["BigDecimal"]>;
  tauBetaY?: Maybe<Scalars["BigDecimal"]>;
  tokens?: Maybe<Array<PoolToken>>;
  tokensList: Array<Scalars["Bytes"]>;
  totalLiquidity: Scalars["BigDecimal"];
  totalShares: Scalars["BigDecimal"];
  totalSwapFee: Scalars["BigDecimal"];
  totalSwapVolume: Scalars["BigDecimal"];
  totalWeight?: Maybe<Scalars["BigDecimal"]>;
  tx?: Maybe<Scalars["Bytes"]>;
  u?: Maybe<Scalars["BigDecimal"]>;
  unitSeconds?: Maybe<Scalars["BigInt"]>;
  upperTarget?: Maybe<Scalars["BigDecimal"]>;
  v?: Maybe<Scalars["BigDecimal"]>;
  vaultID: Balancer;
  w?: Maybe<Scalars["BigDecimal"]>;
  weightUpdates?: Maybe<Array<GradualWeightUpdate>>;
  wrappedIndex?: Maybe<Scalars["Int"]>;
  z?: Maybe<Scalars["BigDecimal"]>;
}

export interface PoolHistoricalValuesArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
}

export interface PoolPriceRateProvidersArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<PriceRateProvider_Filter>;
}

export interface PoolSharesArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<PoolShare_Filter>;
}

export interface PoolSnapshotsArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<PoolSnapshot_Filter>;
}

export interface PoolSwapsArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Swap_Filter>;
}

export interface PoolTokensArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<PoolToken_Filter>;
}

export interface PoolWeightUpdatesArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<GradualWeightUpdate_Filter>;
}

export interface PoolHistoricalLiquidity {
  __typename: "PoolHistoricalLiquidity";
  block: Scalars["BigInt"];
  id: Scalars["ID"];
  poolId: Pool;
  poolLiquidity: Scalars["BigDecimal"];
  poolShareValue: Scalars["BigDecimal"];
  poolTotalShares: Scalars["BigDecimal"];
  pricingAsset: Scalars["Bytes"];
}

export interface PoolHistoricalLiquidity_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  block?: InputMaybe<Scalars["BigInt"]>;
  block_gt?: InputMaybe<Scalars["BigInt"]>;
  block_gte?: InputMaybe<Scalars["BigInt"]>;
  block_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  block_lt?: InputMaybe<Scalars["BigInt"]>;
  block_lte?: InputMaybe<Scalars["BigInt"]>;
  block_not?: InputMaybe<Scalars["BigInt"]>;
  block_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolLiquidity?: InputMaybe<Scalars["BigDecimal"]>;
  poolLiquidity_gt?: InputMaybe<Scalars["BigDecimal"]>;
  poolLiquidity_gte?: InputMaybe<Scalars["BigDecimal"]>;
  poolLiquidity_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  poolLiquidity_lt?: InputMaybe<Scalars["BigDecimal"]>;
  poolLiquidity_lte?: InputMaybe<Scalars["BigDecimal"]>;
  poolLiquidity_not?: InputMaybe<Scalars["BigDecimal"]>;
  poolLiquidity_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  poolShareValue?: InputMaybe<Scalars["BigDecimal"]>;
  poolShareValue_gt?: InputMaybe<Scalars["BigDecimal"]>;
  poolShareValue_gte?: InputMaybe<Scalars["BigDecimal"]>;
  poolShareValue_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  poolShareValue_lt?: InputMaybe<Scalars["BigDecimal"]>;
  poolShareValue_lte?: InputMaybe<Scalars["BigDecimal"]>;
  poolShareValue_not?: InputMaybe<Scalars["BigDecimal"]>;
  poolShareValue_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  poolTotalShares?: InputMaybe<Scalars["BigDecimal"]>;
  poolTotalShares_gt?: InputMaybe<Scalars["BigDecimal"]>;
  poolTotalShares_gte?: InputMaybe<Scalars["BigDecimal"]>;
  poolTotalShares_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  poolTotalShares_lt?: InputMaybe<Scalars["BigDecimal"]>;
  poolTotalShares_lte?: InputMaybe<Scalars["BigDecimal"]>;
  poolTotalShares_not?: InputMaybe<Scalars["BigDecimal"]>;
  poolTotalShares_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  pricingAsset?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_contains?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  pricingAsset_not?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_not_contains?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
}

export type PoolHistoricalLiquidity_OrderBy =
  | "block"
  | "id"
  | "poolId"
  | "poolLiquidity"
  | "poolShareValue"
  | "poolTotalShares"
  | "pricingAsset";

export interface PoolShare {
  __typename: "PoolShare";
  balance: Scalars["BigDecimal"];
  id: Scalars["ID"];
  poolId: Pool;
  userAddress: User;
}

export interface PoolShare_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  balance?: InputMaybe<Scalars["BigDecimal"]>;
  balance_gt?: InputMaybe<Scalars["BigDecimal"]>;
  balance_gte?: InputMaybe<Scalars["BigDecimal"]>;
  balance_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  balance_lt?: InputMaybe<Scalars["BigDecimal"]>;
  balance_lte?: InputMaybe<Scalars["BigDecimal"]>;
  balance_not?: InputMaybe<Scalars["BigDecimal"]>;
  balance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress?: InputMaybe<Scalars["String"]>;
  userAddress_?: InputMaybe<User_Filter>;
  userAddress_contains?: InputMaybe<Scalars["String"]>;
  userAddress_contains_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_ends_with?: InputMaybe<Scalars["String"]>;
  userAddress_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_gt?: InputMaybe<Scalars["String"]>;
  userAddress_gte?: InputMaybe<Scalars["String"]>;
  userAddress_in?: InputMaybe<Array<Scalars["String"]>>;
  userAddress_lt?: InputMaybe<Scalars["String"]>;
  userAddress_lte?: InputMaybe<Scalars["String"]>;
  userAddress_not?: InputMaybe<Scalars["String"]>;
  userAddress_not_contains?: InputMaybe<Scalars["String"]>;
  userAddress_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_not_ends_with?: InputMaybe<Scalars["String"]>;
  userAddress_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_not_in?: InputMaybe<Array<Scalars["String"]>>;
  userAddress_not_starts_with?: InputMaybe<Scalars["String"]>;
  userAddress_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_starts_with?: InputMaybe<Scalars["String"]>;
  userAddress_starts_with_nocase?: InputMaybe<Scalars["String"]>;
}

export type PoolShare_OrderBy = "balance" | "id" | "poolId" | "userAddress";

export interface PoolSnapshot {
  __typename: "PoolSnapshot";
  amounts: Array<Scalars["BigDecimal"]>;
  holdersCount: Scalars["BigInt"];
  id: Scalars["ID"];
  liquidity: Scalars["BigDecimal"];
  pool: Pool;
  swapFees: Scalars["BigDecimal"];
  swapVolume: Scalars["BigDecimal"];
  swapsCount: Scalars["BigInt"];
  timestamp: Scalars["Int"];
  totalShares: Scalars["BigDecimal"];
}

export interface PoolSnapshot_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amounts?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_contains?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_not?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_not_contains?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  holdersCount?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_gt?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_gte?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  holdersCount_lt?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_lte?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_not?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  liquidity?: InputMaybe<Scalars["BigDecimal"]>;
  liquidity_gt?: InputMaybe<Scalars["BigDecimal"]>;
  liquidity_gte?: InputMaybe<Scalars["BigDecimal"]>;
  liquidity_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  liquidity_lt?: InputMaybe<Scalars["BigDecimal"]>;
  liquidity_lte?: InputMaybe<Scalars["BigDecimal"]>;
  liquidity_not?: InputMaybe<Scalars["BigDecimal"]>;
  liquidity_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  pool?: InputMaybe<Scalars["String"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_gt?: InputMaybe<Scalars["String"]>;
  pool_gte?: InputMaybe<Scalars["String"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]>>;
  pool_lt?: InputMaybe<Scalars["String"]>;
  pool_lte?: InputMaybe<Scalars["String"]>;
  pool_not?: InputMaybe<Scalars["String"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  swapFees?: InputMaybe<Scalars["BigDecimal"]>;
  swapFees_gt?: InputMaybe<Scalars["BigDecimal"]>;
  swapFees_gte?: InputMaybe<Scalars["BigDecimal"]>;
  swapFees_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  swapFees_lt?: InputMaybe<Scalars["BigDecimal"]>;
  swapFees_lte?: InputMaybe<Scalars["BigDecimal"]>;
  swapFees_not?: InputMaybe<Scalars["BigDecimal"]>;
  swapFees_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  swapVolume?: InputMaybe<Scalars["BigDecimal"]>;
  swapVolume_gt?: InputMaybe<Scalars["BigDecimal"]>;
  swapVolume_gte?: InputMaybe<Scalars["BigDecimal"]>;
  swapVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  swapVolume_lt?: InputMaybe<Scalars["BigDecimal"]>;
  swapVolume_lte?: InputMaybe<Scalars["BigDecimal"]>;
  swapVolume_not?: InputMaybe<Scalars["BigDecimal"]>;
  swapVolume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  swapsCount?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_gt?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_gte?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  swapsCount_lt?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_lte?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_not?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  totalShares?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalShares_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type PoolSnapshot_OrderBy =
  | "amounts"
  | "holdersCount"
  | "id"
  | "liquidity"
  | "pool"
  | "swapFees"
  | "swapVolume"
  | "swapsCount"
  | "timestamp"
  | "totalShares";

export interface PoolToken {
  __typename: "PoolToken";
  address: Scalars["String"];
  assetManager: Scalars["Bytes"];
  balance: Scalars["BigDecimal"];
  cashBalance: Scalars["BigDecimal"];
  decimals: Scalars["Int"];
  id: Scalars["ID"];
  isExemptFromYieldProtocolFee?: Maybe<Scalars["Boolean"]>;
  managedBalance: Scalars["BigDecimal"];
  managements?: Maybe<Array<ManagementOperation>>;
  name: Scalars["String"];
  poolId?: Maybe<Pool>;
  priceRate: Scalars["BigDecimal"];
  symbol: Scalars["String"];
  token: Token;
  weight?: Maybe<Scalars["BigDecimal"]>;
}

export interface PoolTokenManagementsArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<ManagementOperation_Filter>;
}

export interface PoolToken_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["String"]>;
  address_contains?: InputMaybe<Scalars["String"]>;
  address_contains_nocase?: InputMaybe<Scalars["String"]>;
  address_ends_with?: InputMaybe<Scalars["String"]>;
  address_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  address_gt?: InputMaybe<Scalars["String"]>;
  address_gte?: InputMaybe<Scalars["String"]>;
  address_in?: InputMaybe<Array<Scalars["String"]>>;
  address_lt?: InputMaybe<Scalars["String"]>;
  address_lte?: InputMaybe<Scalars["String"]>;
  address_not?: InputMaybe<Scalars["String"]>;
  address_not_contains?: InputMaybe<Scalars["String"]>;
  address_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  address_not_ends_with?: InputMaybe<Scalars["String"]>;
  address_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  address_not_in?: InputMaybe<Array<Scalars["String"]>>;
  address_not_starts_with?: InputMaybe<Scalars["String"]>;
  address_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  address_starts_with?: InputMaybe<Scalars["String"]>;
  address_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  assetManager?: InputMaybe<Scalars["Bytes"]>;
  assetManager_contains?: InputMaybe<Scalars["Bytes"]>;
  assetManager_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  assetManager_not?: InputMaybe<Scalars["Bytes"]>;
  assetManager_not_contains?: InputMaybe<Scalars["Bytes"]>;
  assetManager_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  balance?: InputMaybe<Scalars["BigDecimal"]>;
  balance_gt?: InputMaybe<Scalars["BigDecimal"]>;
  balance_gte?: InputMaybe<Scalars["BigDecimal"]>;
  balance_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  balance_lt?: InputMaybe<Scalars["BigDecimal"]>;
  balance_lte?: InputMaybe<Scalars["BigDecimal"]>;
  balance_not?: InputMaybe<Scalars["BigDecimal"]>;
  balance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  cashBalance?: InputMaybe<Scalars["BigDecimal"]>;
  cashBalance_gt?: InputMaybe<Scalars["BigDecimal"]>;
  cashBalance_gte?: InputMaybe<Scalars["BigDecimal"]>;
  cashBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  cashBalance_lt?: InputMaybe<Scalars["BigDecimal"]>;
  cashBalance_lte?: InputMaybe<Scalars["BigDecimal"]>;
  cashBalance_not?: InputMaybe<Scalars["BigDecimal"]>;
  cashBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  decimals?: InputMaybe<Scalars["Int"]>;
  decimals_gt?: InputMaybe<Scalars["Int"]>;
  decimals_gte?: InputMaybe<Scalars["Int"]>;
  decimals_in?: InputMaybe<Array<Scalars["Int"]>>;
  decimals_lt?: InputMaybe<Scalars["Int"]>;
  decimals_lte?: InputMaybe<Scalars["Int"]>;
  decimals_not?: InputMaybe<Scalars["Int"]>;
  decimals_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  isExemptFromYieldProtocolFee?: InputMaybe<Scalars["Boolean"]>;
  isExemptFromYieldProtocolFee_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  isExemptFromYieldProtocolFee_not?: InputMaybe<Scalars["Boolean"]>;
  isExemptFromYieldProtocolFee_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  managedBalance?: InputMaybe<Scalars["BigDecimal"]>;
  managedBalance_gt?: InputMaybe<Scalars["BigDecimal"]>;
  managedBalance_gte?: InputMaybe<Scalars["BigDecimal"]>;
  managedBalance_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  managedBalance_lt?: InputMaybe<Scalars["BigDecimal"]>;
  managedBalance_lte?: InputMaybe<Scalars["BigDecimal"]>;
  managedBalance_not?: InputMaybe<Scalars["BigDecimal"]>;
  managedBalance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  managements_?: InputMaybe<ManagementOperation_Filter>;
  name?: InputMaybe<Scalars["String"]>;
  name_contains?: InputMaybe<Scalars["String"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_ends_with?: InputMaybe<Scalars["String"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_gt?: InputMaybe<Scalars["String"]>;
  name_gte?: InputMaybe<Scalars["String"]>;
  name_in?: InputMaybe<Array<Scalars["String"]>>;
  name_lt?: InputMaybe<Scalars["String"]>;
  name_lte?: InputMaybe<Scalars["String"]>;
  name_not?: InputMaybe<Scalars["String"]>;
  name_not_contains?: InputMaybe<Scalars["String"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  name_starts_with?: InputMaybe<Scalars["String"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  priceRate?: InputMaybe<Scalars["BigDecimal"]>;
  priceRate_gt?: InputMaybe<Scalars["BigDecimal"]>;
  priceRate_gte?: InputMaybe<Scalars["BigDecimal"]>;
  priceRate_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  priceRate_lt?: InputMaybe<Scalars["BigDecimal"]>;
  priceRate_lte?: InputMaybe<Scalars["BigDecimal"]>;
  priceRate_not?: InputMaybe<Scalars["BigDecimal"]>;
  priceRate_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  symbol?: InputMaybe<Scalars["String"]>;
  symbol_contains?: InputMaybe<Scalars["String"]>;
  symbol_contains_nocase?: InputMaybe<Scalars["String"]>;
  symbol_ends_with?: InputMaybe<Scalars["String"]>;
  symbol_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_gt?: InputMaybe<Scalars["String"]>;
  symbol_gte?: InputMaybe<Scalars["String"]>;
  symbol_in?: InputMaybe<Array<Scalars["String"]>>;
  symbol_lt?: InputMaybe<Scalars["String"]>;
  symbol_lte?: InputMaybe<Scalars["String"]>;
  symbol_not?: InputMaybe<Scalars["String"]>;
  symbol_not_contains?: InputMaybe<Scalars["String"]>;
  symbol_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  symbol_not_ends_with?: InputMaybe<Scalars["String"]>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_not_in?: InputMaybe<Array<Scalars["String"]>>;
  symbol_not_starts_with?: InputMaybe<Scalars["String"]>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_starts_with?: InputMaybe<Scalars["String"]>;
  symbol_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  token?: InputMaybe<Scalars["String"]>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars["String"]>;
  token_contains_nocase?: InputMaybe<Scalars["String"]>;
  token_ends_with?: InputMaybe<Scalars["String"]>;
  token_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token_gt?: InputMaybe<Scalars["String"]>;
  token_gte?: InputMaybe<Scalars["String"]>;
  token_in?: InputMaybe<Array<Scalars["String"]>>;
  token_lt?: InputMaybe<Scalars["String"]>;
  token_lte?: InputMaybe<Scalars["String"]>;
  token_not?: InputMaybe<Scalars["String"]>;
  token_not_contains?: InputMaybe<Scalars["String"]>;
  token_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  token_not_ends_with?: InputMaybe<Scalars["String"]>;
  token_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token_not_in?: InputMaybe<Array<Scalars["String"]>>;
  token_not_starts_with?: InputMaybe<Scalars["String"]>;
  token_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  token_starts_with?: InputMaybe<Scalars["String"]>;
  token_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  weight?: InputMaybe<Scalars["BigDecimal"]>;
  weight_gt?: InputMaybe<Scalars["BigDecimal"]>;
  weight_gte?: InputMaybe<Scalars["BigDecimal"]>;
  weight_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  weight_lt?: InputMaybe<Scalars["BigDecimal"]>;
  weight_lte?: InputMaybe<Scalars["BigDecimal"]>;
  weight_not?: InputMaybe<Scalars["BigDecimal"]>;
  weight_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type PoolToken_OrderBy =
  | "address"
  | "assetManager"
  | "balance"
  | "cashBalance"
  | "decimals"
  | "id"
  | "isExemptFromYieldProtocolFee"
  | "managedBalance"
  | "managements"
  | "name"
  | "poolId"
  | "priceRate"
  | "symbol"
  | "token"
  | "weight";

export interface Pool_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["Bytes"]>;
  address_contains?: InputMaybe<Scalars["Bytes"]>;
  address_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  address_not?: InputMaybe<Scalars["Bytes"]>;
  address_not_contains?: InputMaybe<Scalars["Bytes"]>;
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  alpha?: InputMaybe<Scalars["BigDecimal"]>;
  alpha_gt?: InputMaybe<Scalars["BigDecimal"]>;
  alpha_gte?: InputMaybe<Scalars["BigDecimal"]>;
  alpha_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  alpha_lt?: InputMaybe<Scalars["BigDecimal"]>;
  alpha_lte?: InputMaybe<Scalars["BigDecimal"]>;
  alpha_not?: InputMaybe<Scalars["BigDecimal"]>;
  alpha_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amp?: InputMaybe<Scalars["BigInt"]>;
  amp_gt?: InputMaybe<Scalars["BigInt"]>;
  amp_gte?: InputMaybe<Scalars["BigInt"]>;
  amp_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  amp_lt?: InputMaybe<Scalars["BigInt"]>;
  amp_lte?: InputMaybe<Scalars["BigInt"]>;
  amp_not?: InputMaybe<Scalars["BigInt"]>;
  amp_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  baseToken?: InputMaybe<Scalars["Bytes"]>;
  baseToken_contains?: InputMaybe<Scalars["Bytes"]>;
  baseToken_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  baseToken_not?: InputMaybe<Scalars["Bytes"]>;
  baseToken_not_contains?: InputMaybe<Scalars["Bytes"]>;
  baseToken_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  beta?: InputMaybe<Scalars["BigDecimal"]>;
  beta_gt?: InputMaybe<Scalars["BigDecimal"]>;
  beta_gte?: InputMaybe<Scalars["BigDecimal"]>;
  beta_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  beta_lt?: InputMaybe<Scalars["BigDecimal"]>;
  beta_lte?: InputMaybe<Scalars["BigDecimal"]>;
  beta_not?: InputMaybe<Scalars["BigDecimal"]>;
  beta_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  c?: InputMaybe<Scalars["BigDecimal"]>;
  c_gt?: InputMaybe<Scalars["BigDecimal"]>;
  c_gte?: InputMaybe<Scalars["BigDecimal"]>;
  c_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  c_lt?: InputMaybe<Scalars["BigDecimal"]>;
  c_lte?: InputMaybe<Scalars["BigDecimal"]>;
  c_not?: InputMaybe<Scalars["BigDecimal"]>;
  c_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  createTime?: InputMaybe<Scalars["Int"]>;
  createTime_gt?: InputMaybe<Scalars["Int"]>;
  createTime_gte?: InputMaybe<Scalars["Int"]>;
  createTime_in?: InputMaybe<Array<Scalars["Int"]>>;
  createTime_lt?: InputMaybe<Scalars["Int"]>;
  createTime_lte?: InputMaybe<Scalars["Int"]>;
  createTime_not?: InputMaybe<Scalars["Int"]>;
  createTime_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  dSq?: InputMaybe<Scalars["BigDecimal"]>;
  dSq_gt?: InputMaybe<Scalars["BigDecimal"]>;
  dSq_gte?: InputMaybe<Scalars["BigDecimal"]>;
  dSq_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  dSq_lt?: InputMaybe<Scalars["BigDecimal"]>;
  dSq_lte?: InputMaybe<Scalars["BigDecimal"]>;
  dSq_not?: InputMaybe<Scalars["BigDecimal"]>;
  dSq_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  expiryTime?: InputMaybe<Scalars["BigInt"]>;
  expiryTime_gt?: InputMaybe<Scalars["BigInt"]>;
  expiryTime_gte?: InputMaybe<Scalars["BigInt"]>;
  expiryTime_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  expiryTime_lt?: InputMaybe<Scalars["BigInt"]>;
  expiryTime_lte?: InputMaybe<Scalars["BigInt"]>;
  expiryTime_not?: InputMaybe<Scalars["BigInt"]>;
  expiryTime_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  factory?: InputMaybe<Scalars["Bytes"]>;
  factory_contains?: InputMaybe<Scalars["Bytes"]>;
  factory_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  factory_not?: InputMaybe<Scalars["Bytes"]>;
  factory_not_contains?: InputMaybe<Scalars["Bytes"]>;
  factory_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  historicalValues_?: InputMaybe<PoolHistoricalLiquidity_Filter>;
  holdersCount?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_gt?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_gte?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  holdersCount_lt?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_lte?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_not?: InputMaybe<Scalars["BigInt"]>;
  holdersCount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  lambda?: InputMaybe<Scalars["BigDecimal"]>;
  lambda_gt?: InputMaybe<Scalars["BigDecimal"]>;
  lambda_gte?: InputMaybe<Scalars["BigDecimal"]>;
  lambda_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  lambda_lt?: InputMaybe<Scalars["BigDecimal"]>;
  lambda_lte?: InputMaybe<Scalars["BigDecimal"]>;
  lambda_not?: InputMaybe<Scalars["BigDecimal"]>;
  lambda_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  lowerTarget?: InputMaybe<Scalars["BigDecimal"]>;
  lowerTarget_gt?: InputMaybe<Scalars["BigDecimal"]>;
  lowerTarget_gte?: InputMaybe<Scalars["BigDecimal"]>;
  lowerTarget_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  lowerTarget_lt?: InputMaybe<Scalars["BigDecimal"]>;
  lowerTarget_lte?: InputMaybe<Scalars["BigDecimal"]>;
  lowerTarget_not?: InputMaybe<Scalars["BigDecimal"]>;
  lowerTarget_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  mainIndex?: InputMaybe<Scalars["Int"]>;
  mainIndex_gt?: InputMaybe<Scalars["Int"]>;
  mainIndex_gte?: InputMaybe<Scalars["Int"]>;
  mainIndex_in?: InputMaybe<Array<Scalars["Int"]>>;
  mainIndex_lt?: InputMaybe<Scalars["Int"]>;
  mainIndex_lte?: InputMaybe<Scalars["Int"]>;
  mainIndex_not?: InputMaybe<Scalars["Int"]>;
  mainIndex_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  managementFee?: InputMaybe<Scalars["BigDecimal"]>;
  managementFee_gt?: InputMaybe<Scalars["BigDecimal"]>;
  managementFee_gte?: InputMaybe<Scalars["BigDecimal"]>;
  managementFee_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  managementFee_lt?: InputMaybe<Scalars["BigDecimal"]>;
  managementFee_lte?: InputMaybe<Scalars["BigDecimal"]>;
  managementFee_not?: InputMaybe<Scalars["BigDecimal"]>;
  managementFee_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  name?: InputMaybe<Scalars["String"]>;
  name_contains?: InputMaybe<Scalars["String"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_ends_with?: InputMaybe<Scalars["String"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_gt?: InputMaybe<Scalars["String"]>;
  name_gte?: InputMaybe<Scalars["String"]>;
  name_in?: InputMaybe<Array<Scalars["String"]>>;
  name_lt?: InputMaybe<Scalars["String"]>;
  name_lte?: InputMaybe<Scalars["String"]>;
  name_not?: InputMaybe<Scalars["String"]>;
  name_not_contains?: InputMaybe<Scalars["String"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  name_starts_with?: InputMaybe<Scalars["String"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  oracleEnabled?: InputMaybe<Scalars["Boolean"]>;
  oracleEnabled_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  oracleEnabled_not?: InputMaybe<Scalars["Boolean"]>;
  oracleEnabled_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  owner?: InputMaybe<Scalars["Bytes"]>;
  owner_contains?: InputMaybe<Scalars["Bytes"]>;
  owner_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  owner_not?: InputMaybe<Scalars["Bytes"]>;
  owner_not_contains?: InputMaybe<Scalars["Bytes"]>;
  owner_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  poolType?: InputMaybe<Scalars["String"]>;
  poolTypeVersion?: InputMaybe<Scalars["Int"]>;
  poolTypeVersion_gt?: InputMaybe<Scalars["Int"]>;
  poolTypeVersion_gte?: InputMaybe<Scalars["Int"]>;
  poolTypeVersion_in?: InputMaybe<Array<Scalars["Int"]>>;
  poolTypeVersion_lt?: InputMaybe<Scalars["Int"]>;
  poolTypeVersion_lte?: InputMaybe<Scalars["Int"]>;
  poolTypeVersion_not?: InputMaybe<Scalars["Int"]>;
  poolTypeVersion_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  poolType_contains?: InputMaybe<Scalars["String"]>;
  poolType_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolType_ends_with?: InputMaybe<Scalars["String"]>;
  poolType_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolType_gt?: InputMaybe<Scalars["String"]>;
  poolType_gte?: InputMaybe<Scalars["String"]>;
  poolType_in?: InputMaybe<Array<Scalars["String"]>>;
  poolType_lt?: InputMaybe<Scalars["String"]>;
  poolType_lte?: InputMaybe<Scalars["String"]>;
  poolType_not?: InputMaybe<Scalars["String"]>;
  poolType_not_contains?: InputMaybe<Scalars["String"]>;
  poolType_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolType_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolType_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolType_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolType_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolType_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolType_starts_with?: InputMaybe<Scalars["String"]>;
  poolType_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  priceRateProviders_?: InputMaybe<PriceRateProvider_Filter>;
  principalToken?: InputMaybe<Scalars["Bytes"]>;
  principalToken_contains?: InputMaybe<Scalars["Bytes"]>;
  principalToken_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  principalToken_not?: InputMaybe<Scalars["Bytes"]>;
  principalToken_not_contains?: InputMaybe<Scalars["Bytes"]>;
  principalToken_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  protocolAumFeeCache?: InputMaybe<Scalars["BigDecimal"]>;
  protocolAumFeeCache_gt?: InputMaybe<Scalars["BigDecimal"]>;
  protocolAumFeeCache_gte?: InputMaybe<Scalars["BigDecimal"]>;
  protocolAumFeeCache_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  protocolAumFeeCache_lt?: InputMaybe<Scalars["BigDecimal"]>;
  protocolAumFeeCache_lte?: InputMaybe<Scalars["BigDecimal"]>;
  protocolAumFeeCache_not?: InputMaybe<Scalars["BigDecimal"]>;
  protocolAumFeeCache_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  protocolSwapFeeCache?: InputMaybe<Scalars["BigDecimal"]>;
  protocolSwapFeeCache_gt?: InputMaybe<Scalars["BigDecimal"]>;
  protocolSwapFeeCache_gte?: InputMaybe<Scalars["BigDecimal"]>;
  protocolSwapFeeCache_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  protocolSwapFeeCache_lt?: InputMaybe<Scalars["BigDecimal"]>;
  protocolSwapFeeCache_lte?: InputMaybe<Scalars["BigDecimal"]>;
  protocolSwapFeeCache_not?: InputMaybe<Scalars["BigDecimal"]>;
  protocolSwapFeeCache_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  protocolYieldFeeCache?: InputMaybe<Scalars["BigDecimal"]>;
  protocolYieldFeeCache_gt?: InputMaybe<Scalars["BigDecimal"]>;
  protocolYieldFeeCache_gte?: InputMaybe<Scalars["BigDecimal"]>;
  protocolYieldFeeCache_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  protocolYieldFeeCache_lt?: InputMaybe<Scalars["BigDecimal"]>;
  protocolYieldFeeCache_lte?: InputMaybe<Scalars["BigDecimal"]>;
  protocolYieldFeeCache_not?: InputMaybe<Scalars["BigDecimal"]>;
  protocolYieldFeeCache_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  root3Alpha?: InputMaybe<Scalars["BigDecimal"]>;
  root3Alpha_gt?: InputMaybe<Scalars["BigDecimal"]>;
  root3Alpha_gte?: InputMaybe<Scalars["BigDecimal"]>;
  root3Alpha_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  root3Alpha_lt?: InputMaybe<Scalars["BigDecimal"]>;
  root3Alpha_lte?: InputMaybe<Scalars["BigDecimal"]>;
  root3Alpha_not?: InputMaybe<Scalars["BigDecimal"]>;
  root3Alpha_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  s?: InputMaybe<Scalars["BigDecimal"]>;
  s_gt?: InputMaybe<Scalars["BigDecimal"]>;
  s_gte?: InputMaybe<Scalars["BigDecimal"]>;
  s_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  s_lt?: InputMaybe<Scalars["BigDecimal"]>;
  s_lte?: InputMaybe<Scalars["BigDecimal"]>;
  s_not?: InputMaybe<Scalars["BigDecimal"]>;
  s_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  shares_?: InputMaybe<PoolShare_Filter>;
  snapshots_?: InputMaybe<PoolSnapshot_Filter>;
  sqrtAlpha?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtAlpha_gt?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtAlpha_gte?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtAlpha_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  sqrtAlpha_lt?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtAlpha_lte?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtAlpha_not?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtAlpha_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  sqrtBeta?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtBeta_gt?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtBeta_gte?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtBeta_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  sqrtBeta_lt?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtBeta_lte?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtBeta_not?: InputMaybe<Scalars["BigDecimal"]>;
  sqrtBeta_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  strategyType?: InputMaybe<Scalars["Int"]>;
  strategyType_gt?: InputMaybe<Scalars["Int"]>;
  strategyType_gte?: InputMaybe<Scalars["Int"]>;
  strategyType_in?: InputMaybe<Array<Scalars["Int"]>>;
  strategyType_lt?: InputMaybe<Scalars["Int"]>;
  strategyType_lte?: InputMaybe<Scalars["Int"]>;
  strategyType_not?: InputMaybe<Scalars["Int"]>;
  strategyType_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  swapEnabled?: InputMaybe<Scalars["Boolean"]>;
  swapEnabled_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  swapEnabled_not?: InputMaybe<Scalars["Boolean"]>;
  swapEnabled_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
  swapFee?: InputMaybe<Scalars["BigDecimal"]>;
  swapFee_gt?: InputMaybe<Scalars["BigDecimal"]>;
  swapFee_gte?: InputMaybe<Scalars["BigDecimal"]>;
  swapFee_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  swapFee_lt?: InputMaybe<Scalars["BigDecimal"]>;
  swapFee_lte?: InputMaybe<Scalars["BigDecimal"]>;
  swapFee_not?: InputMaybe<Scalars["BigDecimal"]>;
  swapFee_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  swapsCount?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_gt?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_gte?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  swapsCount_lt?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_lte?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_not?: InputMaybe<Scalars["BigInt"]>;
  swapsCount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  swaps_?: InputMaybe<Swap_Filter>;
  symbol?: InputMaybe<Scalars["String"]>;
  symbol_contains?: InputMaybe<Scalars["String"]>;
  symbol_contains_nocase?: InputMaybe<Scalars["String"]>;
  symbol_ends_with?: InputMaybe<Scalars["String"]>;
  symbol_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_gt?: InputMaybe<Scalars["String"]>;
  symbol_gte?: InputMaybe<Scalars["String"]>;
  symbol_in?: InputMaybe<Array<Scalars["String"]>>;
  symbol_lt?: InputMaybe<Scalars["String"]>;
  symbol_lte?: InputMaybe<Scalars["String"]>;
  symbol_not?: InputMaybe<Scalars["String"]>;
  symbol_not_contains?: InputMaybe<Scalars["String"]>;
  symbol_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  symbol_not_ends_with?: InputMaybe<Scalars["String"]>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_not_in?: InputMaybe<Array<Scalars["String"]>>;
  symbol_not_starts_with?: InputMaybe<Scalars["String"]>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_starts_with?: InputMaybe<Scalars["String"]>;
  symbol_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  tauAlphaX?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaX_gt?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaX_gte?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaX_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tauAlphaX_lt?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaX_lte?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaX_not?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaX_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tauAlphaY?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaY_gt?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaY_gte?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaY_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tauAlphaY_lt?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaY_lte?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaY_not?: InputMaybe<Scalars["BigDecimal"]>;
  tauAlphaY_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tauBetaX?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaX_gt?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaX_gte?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaX_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tauBetaX_lt?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaX_lte?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaX_not?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaX_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tauBetaY?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaY_gt?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaY_gte?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaY_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tauBetaY_lt?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaY_lte?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaY_not?: InputMaybe<Scalars["BigDecimal"]>;
  tauBetaY_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tokensList?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokensList_contains?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokensList_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokensList_not?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokensList_not_contains?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokensList_not_contains_nocase?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokens_?: InputMaybe<PoolToken_Filter>;
  totalLiquidity?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalLiquidity_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalShares?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalShares_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalShares_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapFee?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapFee_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalWeight?: InputMaybe<Scalars["BigDecimal"]>;
  totalWeight_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalWeight_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalWeight_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalWeight_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalWeight_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalWeight_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalWeight_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tx?: InputMaybe<Scalars["Bytes"]>;
  tx_contains?: InputMaybe<Scalars["Bytes"]>;
  tx_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  tx_not?: InputMaybe<Scalars["Bytes"]>;
  tx_not_contains?: InputMaybe<Scalars["Bytes"]>;
  tx_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  u?: InputMaybe<Scalars["BigDecimal"]>;
  u_gt?: InputMaybe<Scalars["BigDecimal"]>;
  u_gte?: InputMaybe<Scalars["BigDecimal"]>;
  u_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  u_lt?: InputMaybe<Scalars["BigDecimal"]>;
  u_lte?: InputMaybe<Scalars["BigDecimal"]>;
  u_not?: InputMaybe<Scalars["BigDecimal"]>;
  u_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  unitSeconds?: InputMaybe<Scalars["BigInt"]>;
  unitSeconds_gt?: InputMaybe<Scalars["BigInt"]>;
  unitSeconds_gte?: InputMaybe<Scalars["BigInt"]>;
  unitSeconds_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  unitSeconds_lt?: InputMaybe<Scalars["BigInt"]>;
  unitSeconds_lte?: InputMaybe<Scalars["BigInt"]>;
  unitSeconds_not?: InputMaybe<Scalars["BigInt"]>;
  unitSeconds_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  upperTarget?: InputMaybe<Scalars["BigDecimal"]>;
  upperTarget_gt?: InputMaybe<Scalars["BigDecimal"]>;
  upperTarget_gte?: InputMaybe<Scalars["BigDecimal"]>;
  upperTarget_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  upperTarget_lt?: InputMaybe<Scalars["BigDecimal"]>;
  upperTarget_lte?: InputMaybe<Scalars["BigDecimal"]>;
  upperTarget_not?: InputMaybe<Scalars["BigDecimal"]>;
  upperTarget_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  v?: InputMaybe<Scalars["BigDecimal"]>;
  v_gt?: InputMaybe<Scalars["BigDecimal"]>;
  v_gte?: InputMaybe<Scalars["BigDecimal"]>;
  v_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  v_lt?: InputMaybe<Scalars["BigDecimal"]>;
  v_lte?: InputMaybe<Scalars["BigDecimal"]>;
  v_not?: InputMaybe<Scalars["BigDecimal"]>;
  v_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  vaultID?: InputMaybe<Scalars["String"]>;
  vaultID_?: InputMaybe<Balancer_Filter>;
  vaultID_contains?: InputMaybe<Scalars["String"]>;
  vaultID_contains_nocase?: InputMaybe<Scalars["String"]>;
  vaultID_ends_with?: InputMaybe<Scalars["String"]>;
  vaultID_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  vaultID_gt?: InputMaybe<Scalars["String"]>;
  vaultID_gte?: InputMaybe<Scalars["String"]>;
  vaultID_in?: InputMaybe<Array<Scalars["String"]>>;
  vaultID_lt?: InputMaybe<Scalars["String"]>;
  vaultID_lte?: InputMaybe<Scalars["String"]>;
  vaultID_not?: InputMaybe<Scalars["String"]>;
  vaultID_not_contains?: InputMaybe<Scalars["String"]>;
  vaultID_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  vaultID_not_ends_with?: InputMaybe<Scalars["String"]>;
  vaultID_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  vaultID_not_in?: InputMaybe<Array<Scalars["String"]>>;
  vaultID_not_starts_with?: InputMaybe<Scalars["String"]>;
  vaultID_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  vaultID_starts_with?: InputMaybe<Scalars["String"]>;
  vaultID_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  w?: InputMaybe<Scalars["BigDecimal"]>;
  w_gt?: InputMaybe<Scalars["BigDecimal"]>;
  w_gte?: InputMaybe<Scalars["BigDecimal"]>;
  w_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  w_lt?: InputMaybe<Scalars["BigDecimal"]>;
  w_lte?: InputMaybe<Scalars["BigDecimal"]>;
  w_not?: InputMaybe<Scalars["BigDecimal"]>;
  w_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  weightUpdates_?: InputMaybe<GradualWeightUpdate_Filter>;
  wrappedIndex?: InputMaybe<Scalars["Int"]>;
  wrappedIndex_gt?: InputMaybe<Scalars["Int"]>;
  wrappedIndex_gte?: InputMaybe<Scalars["Int"]>;
  wrappedIndex_in?: InputMaybe<Array<Scalars["Int"]>>;
  wrappedIndex_lt?: InputMaybe<Scalars["Int"]>;
  wrappedIndex_lte?: InputMaybe<Scalars["Int"]>;
  wrappedIndex_not?: InputMaybe<Scalars["Int"]>;
  wrappedIndex_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  z?: InputMaybe<Scalars["BigDecimal"]>;
  z_gt?: InputMaybe<Scalars["BigDecimal"]>;
  z_gte?: InputMaybe<Scalars["BigDecimal"]>;
  z_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  z_lt?: InputMaybe<Scalars["BigDecimal"]>;
  z_lte?: InputMaybe<Scalars["BigDecimal"]>;
  z_not?: InputMaybe<Scalars["BigDecimal"]>;
  z_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type Pool_OrderBy =
  | "address"
  | "alpha"
  | "amp"
  | "baseToken"
  | "beta"
  | "c"
  | "createTime"
  | "dSq"
  | "expiryTime"
  | "factory"
  | "historicalValues"
  | "holdersCount"
  | "id"
  | "lambda"
  | "lowerTarget"
  | "mainIndex"
  | "managementFee"
  | "name"
  | "oracleEnabled"
  | "owner"
  | "poolType"
  | "poolTypeVersion"
  | "priceRateProviders"
  | "principalToken"
  | "protocolAumFeeCache"
  | "protocolSwapFeeCache"
  | "protocolYieldFeeCache"
  | "root3Alpha"
  | "s"
  | "shares"
  | "snapshots"
  | "sqrtAlpha"
  | "sqrtBeta"
  | "strategyType"
  | "swapEnabled"
  | "swapFee"
  | "swaps"
  | "swapsCount"
  | "symbol"
  | "tauAlphaX"
  | "tauAlphaY"
  | "tauBetaX"
  | "tauBetaY"
  | "tokens"
  | "tokensList"
  | "totalLiquidity"
  | "totalShares"
  | "totalSwapFee"
  | "totalSwapVolume"
  | "totalWeight"
  | "tx"
  | "u"
  | "unitSeconds"
  | "upperTarget"
  | "v"
  | "vaultID"
  | "w"
  | "weightUpdates"
  | "wrappedIndex"
  | "z";

export interface PriceRateProvider {
  __typename: "PriceRateProvider";
  address: Scalars["Bytes"];
  cacheDuration?: Maybe<Scalars["Int"]>;
  cacheExpiry?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  lastCached?: Maybe<Scalars["Int"]>;
  poolId: Pool;
  rate?: Maybe<Scalars["BigDecimal"]>;
  token: PoolToken;
}

export interface PriceRateProvider_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["Bytes"]>;
  address_contains?: InputMaybe<Scalars["Bytes"]>;
  address_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  address_not?: InputMaybe<Scalars["Bytes"]>;
  address_not_contains?: InputMaybe<Scalars["Bytes"]>;
  address_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  cacheDuration?: InputMaybe<Scalars["Int"]>;
  cacheDuration_gt?: InputMaybe<Scalars["Int"]>;
  cacheDuration_gte?: InputMaybe<Scalars["Int"]>;
  cacheDuration_in?: InputMaybe<Array<Scalars["Int"]>>;
  cacheDuration_lt?: InputMaybe<Scalars["Int"]>;
  cacheDuration_lte?: InputMaybe<Scalars["Int"]>;
  cacheDuration_not?: InputMaybe<Scalars["Int"]>;
  cacheDuration_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  cacheExpiry?: InputMaybe<Scalars["Int"]>;
  cacheExpiry_gt?: InputMaybe<Scalars["Int"]>;
  cacheExpiry_gte?: InputMaybe<Scalars["Int"]>;
  cacheExpiry_in?: InputMaybe<Array<Scalars["Int"]>>;
  cacheExpiry_lt?: InputMaybe<Scalars["Int"]>;
  cacheExpiry_lte?: InputMaybe<Scalars["Int"]>;
  cacheExpiry_not?: InputMaybe<Scalars["Int"]>;
  cacheExpiry_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  lastCached?: InputMaybe<Scalars["Int"]>;
  lastCached_gt?: InputMaybe<Scalars["Int"]>;
  lastCached_gte?: InputMaybe<Scalars["Int"]>;
  lastCached_in?: InputMaybe<Array<Scalars["Int"]>>;
  lastCached_lt?: InputMaybe<Scalars["Int"]>;
  lastCached_lte?: InputMaybe<Scalars["Int"]>;
  lastCached_not?: InputMaybe<Scalars["Int"]>;
  lastCached_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  rate?: InputMaybe<Scalars["BigDecimal"]>;
  rate_gt?: InputMaybe<Scalars["BigDecimal"]>;
  rate_gte?: InputMaybe<Scalars["BigDecimal"]>;
  rate_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  rate_lt?: InputMaybe<Scalars["BigDecimal"]>;
  rate_lte?: InputMaybe<Scalars["BigDecimal"]>;
  rate_not?: InputMaybe<Scalars["BigDecimal"]>;
  rate_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  token?: InputMaybe<Scalars["String"]>;
  token_?: InputMaybe<PoolToken_Filter>;
  token_contains?: InputMaybe<Scalars["String"]>;
  token_contains_nocase?: InputMaybe<Scalars["String"]>;
  token_ends_with?: InputMaybe<Scalars["String"]>;
  token_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token_gt?: InputMaybe<Scalars["String"]>;
  token_gte?: InputMaybe<Scalars["String"]>;
  token_in?: InputMaybe<Array<Scalars["String"]>>;
  token_lt?: InputMaybe<Scalars["String"]>;
  token_lte?: InputMaybe<Scalars["String"]>;
  token_not?: InputMaybe<Scalars["String"]>;
  token_not_contains?: InputMaybe<Scalars["String"]>;
  token_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  token_not_ends_with?: InputMaybe<Scalars["String"]>;
  token_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token_not_in?: InputMaybe<Array<Scalars["String"]>>;
  token_not_starts_with?: InputMaybe<Scalars["String"]>;
  token_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  token_starts_with?: InputMaybe<Scalars["String"]>;
  token_starts_with_nocase?: InputMaybe<Scalars["String"]>;
}

export type PriceRateProvider_OrderBy =
  | "address"
  | "cacheDuration"
  | "cacheExpiry"
  | "id"
  | "lastCached"
  | "poolId"
  | "rate"
  | "token";

export interface Query {
  __typename: "Query";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  ampUpdate?: Maybe<AmpUpdate>;
  ampUpdates: Array<AmpUpdate>;
  balancer?: Maybe<Balancer>;
  balancerSnapshot?: Maybe<BalancerSnapshot>;
  balancerSnapshots: Array<BalancerSnapshot>;
  balancers: Array<Balancer>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  gradualWeightUpdate?: Maybe<GradualWeightUpdate>;
  gradualWeightUpdates: Array<GradualWeightUpdate>;
  joinExit?: Maybe<JoinExit>;
  joinExits: Array<JoinExit>;
  latestPrice?: Maybe<LatestPrice>;
  latestPrices: Array<LatestPrice>;
  managementOperation?: Maybe<ManagementOperation>;
  managementOperations: Array<ManagementOperation>;
  pool?: Maybe<Pool>;
  poolHistoricalLiquidities: Array<PoolHistoricalLiquidity>;
  poolHistoricalLiquidity?: Maybe<PoolHistoricalLiquidity>;
  poolShare?: Maybe<PoolShare>;
  poolShares: Array<PoolShare>;
  poolSnapshot?: Maybe<PoolSnapshot>;
  poolSnapshots: Array<PoolSnapshot>;
  poolToken?: Maybe<PoolToken>;
  poolTokens: Array<PoolToken>;
  pools: Array<Pool>;
  priceRateProvider?: Maybe<PriceRateProvider>;
  priceRateProviders: Array<PriceRateProvider>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenPrice?: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  tokenSnapshot?: Maybe<TokenSnapshot>;
  tokenSnapshots: Array<TokenSnapshot>;
  tokens: Array<Token>;
  tradePair?: Maybe<TradePair>;
  tradePairSnapshot?: Maybe<TradePairSnapshot>;
  tradePairSnapshots: Array<TradePairSnapshot>;
  tradePairs: Array<TradePair>;
  user?: Maybe<User>;
  userInternalBalance?: Maybe<UserInternalBalance>;
  userInternalBalances: Array<UserInternalBalance>;
  users: Array<User>;
}

export interface Query_MetaArgs {
  block?: InputMaybe<Block_Height>;
}

export interface QueryAmpUpdateArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryAmpUpdatesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<AmpUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AmpUpdate_Filter>;
}

export interface QueryBalancerArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryBalancerSnapshotArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryBalancerSnapshotsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<BalancerSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BalancerSnapshot_Filter>;
}

export interface QueryBalancersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Balancer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Balancer_Filter>;
}

export interface QueryBlockArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryBlocksArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
}

export interface QueryGradualWeightUpdateArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGradualWeightUpdatesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GradualWeightUpdate_Filter>;
}

export interface QueryJoinExitArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryJoinExitsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<JoinExit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JoinExit_Filter>;
}

export interface QueryLatestPriceArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryLatestPricesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<LatestPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LatestPrice_Filter>;
}

export interface QueryManagementOperationArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryManagementOperationsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ManagementOperation_Filter>;
}

export interface QueryPoolArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolHistoricalLiquiditiesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
}

export interface QueryPoolHistoricalLiquidityArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolShareArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolSharesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolShare_Filter>;
}

export interface QueryPoolSnapshotArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolSnapshotsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolSnapshot_Filter>;
}

export interface QueryPoolTokenArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolTokensArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolToken_Filter>;
}

export interface QueryPoolsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
}

export interface QueryPriceRateProviderArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPriceRateProvidersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PriceRateProvider_Filter>;
}

export interface QuerySwapArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QuerySwapsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
}

export interface QueryTokenArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTokenPriceArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTokenPricesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TokenPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenPrice_Filter>;
}

export interface QueryTokenSnapshotArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTokenSnapshotsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TokenSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenSnapshot_Filter>;
}

export interface QueryTokensArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
}

export interface QueryTradePairArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTradePairSnapshotArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTradePairSnapshotsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TradePairSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradePairSnapshot_Filter>;
}

export interface QueryTradePairsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TradePair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradePair_Filter>;
}

export interface QueryUserArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryUserInternalBalanceArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryUserInternalBalancesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserInternalBalance_Filter>;
}

export interface QueryUsersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
}

export interface Subscription {
  __typename: "Subscription";
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  ampUpdate?: Maybe<AmpUpdate>;
  ampUpdates: Array<AmpUpdate>;
  balancer?: Maybe<Balancer>;
  balancerSnapshot?: Maybe<BalancerSnapshot>;
  balancerSnapshots: Array<BalancerSnapshot>;
  balancers: Array<Balancer>;
  block?: Maybe<Block>;
  blocks: Array<Block>;
  gradualWeightUpdate?: Maybe<GradualWeightUpdate>;
  gradualWeightUpdates: Array<GradualWeightUpdate>;
  joinExit?: Maybe<JoinExit>;
  joinExits: Array<JoinExit>;
  latestPrice?: Maybe<LatestPrice>;
  latestPrices: Array<LatestPrice>;
  managementOperation?: Maybe<ManagementOperation>;
  managementOperations: Array<ManagementOperation>;
  pool?: Maybe<Pool>;
  poolHistoricalLiquidities: Array<PoolHistoricalLiquidity>;
  poolHistoricalLiquidity?: Maybe<PoolHistoricalLiquidity>;
  poolShare?: Maybe<PoolShare>;
  poolShares: Array<PoolShare>;
  poolSnapshot?: Maybe<PoolSnapshot>;
  poolSnapshots: Array<PoolSnapshot>;
  poolToken?: Maybe<PoolToken>;
  poolTokens: Array<PoolToken>;
  pools: Array<Pool>;
  priceRateProvider?: Maybe<PriceRateProvider>;
  priceRateProviders: Array<PriceRateProvider>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenPrice?: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  tokenSnapshot?: Maybe<TokenSnapshot>;
  tokenSnapshots: Array<TokenSnapshot>;
  tokens: Array<Token>;
  tradePair?: Maybe<TradePair>;
  tradePairSnapshot?: Maybe<TradePairSnapshot>;
  tradePairSnapshots: Array<TradePairSnapshot>;
  tradePairs: Array<TradePair>;
  user?: Maybe<User>;
  userInternalBalance?: Maybe<UserInternalBalance>;
  userInternalBalances: Array<UserInternalBalance>;
  users: Array<User>;
}

export interface Subscription_MetaArgs {
  block?: InputMaybe<Block_Height>;
}

export interface SubscriptionAmpUpdateArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionAmpUpdatesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<AmpUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AmpUpdate_Filter>;
}

export interface SubscriptionBalancerArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionBalancerSnapshotArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionBalancerSnapshotsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<BalancerSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BalancerSnapshot_Filter>;
}

export interface SubscriptionBalancersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Balancer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Balancer_Filter>;
}

export interface SubscriptionBlockArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionBlocksArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Block_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Block_Filter>;
}

export interface SubscriptionGradualWeightUpdateArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGradualWeightUpdatesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GradualWeightUpdate_Filter>;
}

export interface SubscriptionJoinExitArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionJoinExitsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<JoinExit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JoinExit_Filter>;
}

export interface SubscriptionLatestPriceArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionLatestPricesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<LatestPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LatestPrice_Filter>;
}

export interface SubscriptionManagementOperationArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionManagementOperationsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ManagementOperation_Filter>;
}

export interface SubscriptionPoolArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolHistoricalLiquiditiesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
}

export interface SubscriptionPoolHistoricalLiquidityArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolShareArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolSharesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolShare_Filter>;
}

export interface SubscriptionPoolSnapshotArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolSnapshotsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolSnapshot_Filter>;
}

export interface SubscriptionPoolTokenArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolTokensArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolToken_Filter>;
}

export interface SubscriptionPoolsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
}

export interface SubscriptionPriceRateProviderArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPriceRateProvidersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PriceRateProvider_Filter>;
}

export interface SubscriptionSwapArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionSwapsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
}

export interface SubscriptionTokenArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTokenPriceArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTokenPricesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TokenPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenPrice_Filter>;
}

export interface SubscriptionTokenSnapshotArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTokenSnapshotsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TokenSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenSnapshot_Filter>;
}

export interface SubscriptionTokensArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
}

export interface SubscriptionTradePairArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTradePairSnapshotArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTradePairSnapshotsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TradePairSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradePairSnapshot_Filter>;
}

export interface SubscriptionTradePairsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TradePair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradePair_Filter>;
}

export interface SubscriptionUserArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionUserInternalBalanceArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars["ID"];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionUserInternalBalancesArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserInternalBalance_Filter>;
}

export interface SubscriptionUsersArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
}

export interface Swap {
  __typename: "Swap";
  caller: Scalars["Bytes"];
  id: Scalars["ID"];
  poolId: Pool;
  timestamp: Scalars["Int"];
  tokenAmountIn: Scalars["BigDecimal"];
  tokenAmountOut: Scalars["BigDecimal"];
  tokenIn: Scalars["Bytes"];
  tokenInSym: Scalars["String"];
  tokenOut: Scalars["Bytes"];
  tokenOutSym: Scalars["String"];
  tx: Scalars["Bytes"];
  userAddress: User;
  valueUSD: Scalars["BigDecimal"];
}

export interface Swap_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  caller?: InputMaybe<Scalars["Bytes"]>;
  caller_contains?: InputMaybe<Scalars["Bytes"]>;
  caller_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  caller_not?: InputMaybe<Scalars["Bytes"]>;
  caller_not_contains?: InputMaybe<Scalars["Bytes"]>;
  caller_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  tokenAmountIn?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountIn_gt?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountIn_gte?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountIn_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tokenAmountIn_lt?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountIn_lte?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountIn_not?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountIn_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tokenAmountOut?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountOut_gt?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountOut_gte?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountOut_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tokenAmountOut_lt?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountOut_lte?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountOut_not?: InputMaybe<Scalars["BigDecimal"]>;
  tokenAmountOut_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  tokenIn?: InputMaybe<Scalars["Bytes"]>;
  tokenInSym?: InputMaybe<Scalars["String"]>;
  tokenInSym_contains?: InputMaybe<Scalars["String"]>;
  tokenInSym_contains_nocase?: InputMaybe<Scalars["String"]>;
  tokenInSym_ends_with?: InputMaybe<Scalars["String"]>;
  tokenInSym_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  tokenInSym_gt?: InputMaybe<Scalars["String"]>;
  tokenInSym_gte?: InputMaybe<Scalars["String"]>;
  tokenInSym_in?: InputMaybe<Array<Scalars["String"]>>;
  tokenInSym_lt?: InputMaybe<Scalars["String"]>;
  tokenInSym_lte?: InputMaybe<Scalars["String"]>;
  tokenInSym_not?: InputMaybe<Scalars["String"]>;
  tokenInSym_not_contains?: InputMaybe<Scalars["String"]>;
  tokenInSym_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  tokenInSym_not_ends_with?: InputMaybe<Scalars["String"]>;
  tokenInSym_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  tokenInSym_not_in?: InputMaybe<Array<Scalars["String"]>>;
  tokenInSym_not_starts_with?: InputMaybe<Scalars["String"]>;
  tokenInSym_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  tokenInSym_starts_with?: InputMaybe<Scalars["String"]>;
  tokenInSym_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  tokenIn_contains?: InputMaybe<Scalars["Bytes"]>;
  tokenIn_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokenIn_not?: InputMaybe<Scalars["Bytes"]>;
  tokenIn_not_contains?: InputMaybe<Scalars["Bytes"]>;
  tokenIn_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokenOut?: InputMaybe<Scalars["Bytes"]>;
  tokenOutSym?: InputMaybe<Scalars["String"]>;
  tokenOutSym_contains?: InputMaybe<Scalars["String"]>;
  tokenOutSym_contains_nocase?: InputMaybe<Scalars["String"]>;
  tokenOutSym_ends_with?: InputMaybe<Scalars["String"]>;
  tokenOutSym_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  tokenOutSym_gt?: InputMaybe<Scalars["String"]>;
  tokenOutSym_gte?: InputMaybe<Scalars["String"]>;
  tokenOutSym_in?: InputMaybe<Array<Scalars["String"]>>;
  tokenOutSym_lt?: InputMaybe<Scalars["String"]>;
  tokenOutSym_lte?: InputMaybe<Scalars["String"]>;
  tokenOutSym_not?: InputMaybe<Scalars["String"]>;
  tokenOutSym_not_contains?: InputMaybe<Scalars["String"]>;
  tokenOutSym_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  tokenOutSym_not_ends_with?: InputMaybe<Scalars["String"]>;
  tokenOutSym_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  tokenOutSym_not_in?: InputMaybe<Array<Scalars["String"]>>;
  tokenOutSym_not_starts_with?: InputMaybe<Scalars["String"]>;
  tokenOutSym_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  tokenOutSym_starts_with?: InputMaybe<Scalars["String"]>;
  tokenOutSym_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  tokenOut_contains?: InputMaybe<Scalars["Bytes"]>;
  tokenOut_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  tokenOut_not?: InputMaybe<Scalars["Bytes"]>;
  tokenOut_not_contains?: InputMaybe<Scalars["Bytes"]>;
  tokenOut_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  tx?: InputMaybe<Scalars["Bytes"]>;
  tx_contains?: InputMaybe<Scalars["Bytes"]>;
  tx_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  tx_not?: InputMaybe<Scalars["Bytes"]>;
  tx_not_contains?: InputMaybe<Scalars["Bytes"]>;
  tx_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  userAddress?: InputMaybe<Scalars["String"]>;
  userAddress_?: InputMaybe<User_Filter>;
  userAddress_contains?: InputMaybe<Scalars["String"]>;
  userAddress_contains_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_ends_with?: InputMaybe<Scalars["String"]>;
  userAddress_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_gt?: InputMaybe<Scalars["String"]>;
  userAddress_gte?: InputMaybe<Scalars["String"]>;
  userAddress_in?: InputMaybe<Array<Scalars["String"]>>;
  userAddress_lt?: InputMaybe<Scalars["String"]>;
  userAddress_lte?: InputMaybe<Scalars["String"]>;
  userAddress_not?: InputMaybe<Scalars["String"]>;
  userAddress_not_contains?: InputMaybe<Scalars["String"]>;
  userAddress_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_not_ends_with?: InputMaybe<Scalars["String"]>;
  userAddress_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_not_in?: InputMaybe<Array<Scalars["String"]>>;
  userAddress_not_starts_with?: InputMaybe<Scalars["String"]>;
  userAddress_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_starts_with?: InputMaybe<Scalars["String"]>;
  userAddress_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  valueUSD?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_gt?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_gte?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  valueUSD_lt?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_lte?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_not?: InputMaybe<Scalars["BigDecimal"]>;
  valueUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type Swap_OrderBy =
  | "caller"
  | "id"
  | "poolId"
  | "timestamp"
  | "tokenAmountIn"
  | "tokenAmountOut"
  | "tokenIn"
  | "tokenInSym"
  | "tokenOut"
  | "tokenOutSym"
  | "tx"
  | "userAddress"
  | "valueUSD";

export interface Token {
  __typename: "Token";
  address: Scalars["String"];
  decimals: Scalars["Int"];
  id: Scalars["ID"];
  latestPrice?: Maybe<LatestPrice>;
  latestUSDPrice?: Maybe<Scalars["BigDecimal"]>;
  name?: Maybe<Scalars["String"]>;
  pool?: Maybe<Pool>;
  symbol?: Maybe<Scalars["String"]>;
  totalBalanceNotional: Scalars["BigDecimal"];
  totalBalanceUSD: Scalars["BigDecimal"];
  totalSwapCount: Scalars["BigInt"];
  totalVolumeNotional: Scalars["BigDecimal"];
  totalVolumeUSD: Scalars["BigDecimal"];
}

export interface TokenPrice {
  __typename: "TokenPrice";
  amount: Scalars["BigDecimal"];
  asset: Scalars["Bytes"];
  block: Scalars["BigInt"];
  id: Scalars["ID"];
  poolId: Pool;
  price: Scalars["BigDecimal"];
  pricingAsset: Scalars["Bytes"];
  timestamp: Scalars["Int"];
}

export interface TokenPrice_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars["BigDecimal"]>;
  amount_gt?: InputMaybe<Scalars["BigDecimal"]>;
  amount_gte?: InputMaybe<Scalars["BigDecimal"]>;
  amount_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  amount_lt?: InputMaybe<Scalars["BigDecimal"]>;
  amount_lte?: InputMaybe<Scalars["BigDecimal"]>;
  amount_not?: InputMaybe<Scalars["BigDecimal"]>;
  amount_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  asset?: InputMaybe<Scalars["Bytes"]>;
  asset_contains?: InputMaybe<Scalars["Bytes"]>;
  asset_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  asset_not?: InputMaybe<Scalars["Bytes"]>;
  asset_not_contains?: InputMaybe<Scalars["Bytes"]>;
  asset_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  block?: InputMaybe<Scalars["BigInt"]>;
  block_gt?: InputMaybe<Scalars["BigInt"]>;
  block_gte?: InputMaybe<Scalars["BigInt"]>;
  block_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  block_lt?: InputMaybe<Scalars["BigInt"]>;
  block_lte?: InputMaybe<Scalars["BigInt"]>;
  block_not?: InputMaybe<Scalars["BigInt"]>;
  block_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  poolId?: InputMaybe<Scalars["String"]>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars["String"]>;
  poolId_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_gt?: InputMaybe<Scalars["String"]>;
  poolId_gte?: InputMaybe<Scalars["String"]>;
  poolId_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_lt?: InputMaybe<Scalars["String"]>;
  poolId_lte?: InputMaybe<Scalars["String"]>;
  poolId_not?: InputMaybe<Scalars["String"]>;
  poolId_not_contains?: InputMaybe<Scalars["String"]>;
  poolId_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with?: InputMaybe<Scalars["String"]>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_not_in?: InputMaybe<Array<Scalars["String"]>>;
  poolId_not_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  poolId_starts_with?: InputMaybe<Scalars["String"]>;
  poolId_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["BigDecimal"]>;
  price_gt?: InputMaybe<Scalars["BigDecimal"]>;
  price_gte?: InputMaybe<Scalars["BigDecimal"]>;
  price_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  price_lt?: InputMaybe<Scalars["BigDecimal"]>;
  price_lte?: InputMaybe<Scalars["BigDecimal"]>;
  price_not?: InputMaybe<Scalars["BigDecimal"]>;
  price_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  pricingAsset?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_contains?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  pricingAsset_not?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_not_contains?: InputMaybe<Scalars["Bytes"]>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
}

export type TokenPrice_OrderBy =
  | "amount"
  | "asset"
  | "block"
  | "id"
  | "poolId"
  | "price"
  | "pricingAsset"
  | "timestamp";

export interface TokenSnapshot {
  __typename: "TokenSnapshot";
  id: Scalars["ID"];
  timestamp: Scalars["Int"];
  token: Token;
  totalBalanceNotional: Scalars["BigDecimal"];
  totalBalanceUSD: Scalars["BigDecimal"];
  totalSwapCount: Scalars["BigInt"];
  totalVolumeNotional: Scalars["BigDecimal"];
  totalVolumeUSD: Scalars["BigDecimal"];
}

export interface TokenSnapshot_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  token?: InputMaybe<Scalars["String"]>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars["String"]>;
  token_contains_nocase?: InputMaybe<Scalars["String"]>;
  token_ends_with?: InputMaybe<Scalars["String"]>;
  token_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token_gt?: InputMaybe<Scalars["String"]>;
  token_gte?: InputMaybe<Scalars["String"]>;
  token_in?: InputMaybe<Array<Scalars["String"]>>;
  token_lt?: InputMaybe<Scalars["String"]>;
  token_lte?: InputMaybe<Scalars["String"]>;
  token_not?: InputMaybe<Scalars["String"]>;
  token_not_contains?: InputMaybe<Scalars["String"]>;
  token_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  token_not_ends_with?: InputMaybe<Scalars["String"]>;
  token_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token_not_in?: InputMaybe<Array<Scalars["String"]>>;
  token_not_starts_with?: InputMaybe<Scalars["String"]>;
  token_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  token_starts_with?: InputMaybe<Scalars["String"]>;
  token_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  totalBalanceNotional?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalBalanceNotional_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalBalanceUSD?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalBalanceUSD_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapCount?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_gt?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_gte?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalSwapCount_lt?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_lte?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_not?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalVolumeNotional?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalVolumeNotional_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalVolumeUSD?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type TokenSnapshot_OrderBy =
  | "id"
  | "timestamp"
  | "token"
  | "totalBalanceNotional"
  | "totalBalanceUSD"
  | "totalSwapCount"
  | "totalVolumeNotional"
  | "totalVolumeUSD";

export interface Token_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars["String"]>;
  address_contains?: InputMaybe<Scalars["String"]>;
  address_contains_nocase?: InputMaybe<Scalars["String"]>;
  address_ends_with?: InputMaybe<Scalars["String"]>;
  address_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  address_gt?: InputMaybe<Scalars["String"]>;
  address_gte?: InputMaybe<Scalars["String"]>;
  address_in?: InputMaybe<Array<Scalars["String"]>>;
  address_lt?: InputMaybe<Scalars["String"]>;
  address_lte?: InputMaybe<Scalars["String"]>;
  address_not?: InputMaybe<Scalars["String"]>;
  address_not_contains?: InputMaybe<Scalars["String"]>;
  address_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  address_not_ends_with?: InputMaybe<Scalars["String"]>;
  address_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  address_not_in?: InputMaybe<Array<Scalars["String"]>>;
  address_not_starts_with?: InputMaybe<Scalars["String"]>;
  address_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  address_starts_with?: InputMaybe<Scalars["String"]>;
  address_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  decimals?: InputMaybe<Scalars["Int"]>;
  decimals_gt?: InputMaybe<Scalars["Int"]>;
  decimals_gte?: InputMaybe<Scalars["Int"]>;
  decimals_in?: InputMaybe<Array<Scalars["Int"]>>;
  decimals_lt?: InputMaybe<Scalars["Int"]>;
  decimals_lte?: InputMaybe<Scalars["Int"]>;
  decimals_not?: InputMaybe<Scalars["Int"]>;
  decimals_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  latestPrice?: InputMaybe<Scalars["String"]>;
  latestPrice_?: InputMaybe<LatestPrice_Filter>;
  latestPrice_contains?: InputMaybe<Scalars["String"]>;
  latestPrice_contains_nocase?: InputMaybe<Scalars["String"]>;
  latestPrice_ends_with?: InputMaybe<Scalars["String"]>;
  latestPrice_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  latestPrice_gt?: InputMaybe<Scalars["String"]>;
  latestPrice_gte?: InputMaybe<Scalars["String"]>;
  latestPrice_in?: InputMaybe<Array<Scalars["String"]>>;
  latestPrice_lt?: InputMaybe<Scalars["String"]>;
  latestPrice_lte?: InputMaybe<Scalars["String"]>;
  latestPrice_not?: InputMaybe<Scalars["String"]>;
  latestPrice_not_contains?: InputMaybe<Scalars["String"]>;
  latestPrice_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  latestPrice_not_ends_with?: InputMaybe<Scalars["String"]>;
  latestPrice_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  latestPrice_not_in?: InputMaybe<Array<Scalars["String"]>>;
  latestPrice_not_starts_with?: InputMaybe<Scalars["String"]>;
  latestPrice_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  latestPrice_starts_with?: InputMaybe<Scalars["String"]>;
  latestPrice_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  latestUSDPrice?: InputMaybe<Scalars["BigDecimal"]>;
  latestUSDPrice_gt?: InputMaybe<Scalars["BigDecimal"]>;
  latestUSDPrice_gte?: InputMaybe<Scalars["BigDecimal"]>;
  latestUSDPrice_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  latestUSDPrice_lt?: InputMaybe<Scalars["BigDecimal"]>;
  latestUSDPrice_lte?: InputMaybe<Scalars["BigDecimal"]>;
  latestUSDPrice_not?: InputMaybe<Scalars["BigDecimal"]>;
  latestUSDPrice_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  name?: InputMaybe<Scalars["String"]>;
  name_contains?: InputMaybe<Scalars["String"]>;
  name_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_ends_with?: InputMaybe<Scalars["String"]>;
  name_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_gt?: InputMaybe<Scalars["String"]>;
  name_gte?: InputMaybe<Scalars["String"]>;
  name_in?: InputMaybe<Array<Scalars["String"]>>;
  name_lt?: InputMaybe<Scalars["String"]>;
  name_lte?: InputMaybe<Scalars["String"]>;
  name_not?: InputMaybe<Scalars["String"]>;
  name_not_contains?: InputMaybe<Scalars["String"]>;
  name_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  name_not_ends_with?: InputMaybe<Scalars["String"]>;
  name_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  name_not_in?: InputMaybe<Array<Scalars["String"]>>;
  name_not_starts_with?: InputMaybe<Scalars["String"]>;
  name_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  name_starts_with?: InputMaybe<Scalars["String"]>;
  name_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  pool?: InputMaybe<Scalars["String"]>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars["String"]>;
  pool_contains_nocase?: InputMaybe<Scalars["String"]>;
  pool_ends_with?: InputMaybe<Scalars["String"]>;
  pool_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_gt?: InputMaybe<Scalars["String"]>;
  pool_gte?: InputMaybe<Scalars["String"]>;
  pool_in?: InputMaybe<Array<Scalars["String"]>>;
  pool_lt?: InputMaybe<Scalars["String"]>;
  pool_lte?: InputMaybe<Scalars["String"]>;
  pool_not?: InputMaybe<Scalars["String"]>;
  pool_not_contains?: InputMaybe<Scalars["String"]>;
  pool_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  pool_not_ends_with?: InputMaybe<Scalars["String"]>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_not_in?: InputMaybe<Array<Scalars["String"]>>;
  pool_not_starts_with?: InputMaybe<Scalars["String"]>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  pool_starts_with?: InputMaybe<Scalars["String"]>;
  pool_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol?: InputMaybe<Scalars["String"]>;
  symbol_contains?: InputMaybe<Scalars["String"]>;
  symbol_contains_nocase?: InputMaybe<Scalars["String"]>;
  symbol_ends_with?: InputMaybe<Scalars["String"]>;
  symbol_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_gt?: InputMaybe<Scalars["String"]>;
  symbol_gte?: InputMaybe<Scalars["String"]>;
  symbol_in?: InputMaybe<Array<Scalars["String"]>>;
  symbol_lt?: InputMaybe<Scalars["String"]>;
  symbol_lte?: InputMaybe<Scalars["String"]>;
  symbol_not?: InputMaybe<Scalars["String"]>;
  symbol_not_contains?: InputMaybe<Scalars["String"]>;
  symbol_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  symbol_not_ends_with?: InputMaybe<Scalars["String"]>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_not_in?: InputMaybe<Array<Scalars["String"]>>;
  symbol_not_starts_with?: InputMaybe<Scalars["String"]>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  symbol_starts_with?: InputMaybe<Scalars["String"]>;
  symbol_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  totalBalanceNotional?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalBalanceNotional_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceNotional_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalBalanceUSD?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalBalanceUSD_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalBalanceUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapCount?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_gt?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_gte?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalSwapCount_lt?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_lte?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_not?: InputMaybe<Scalars["BigInt"]>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
  totalVolumeNotional?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalVolumeNotional_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeNotional_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalVolumeUSD?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type Token_OrderBy =
  | "address"
  | "decimals"
  | "id"
  | "latestPrice"
  | "latestUSDPrice"
  | "name"
  | "pool"
  | "symbol"
  | "totalBalanceNotional"
  | "totalBalanceUSD"
  | "totalSwapCount"
  | "totalVolumeNotional"
  | "totalVolumeUSD";

export interface TradePair {
  __typename: "TradePair";
  /** Token Address - Token Address */
  id: Scalars["ID"];
  token0: Token;
  token1: Token;
  totalSwapFee: Scalars["BigDecimal"];
  totalSwapVolume: Scalars["BigDecimal"];
}

export interface TradePairSnapshot {
  __typename: "TradePairSnapshot";
  id: Scalars["ID"];
  pair: TradePair;
  timestamp: Scalars["Int"];
  totalSwapFee: Scalars["BigDecimal"];
  totalSwapVolume: Scalars["BigDecimal"];
}

export interface TradePairSnapshot_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  pair?: InputMaybe<Scalars["String"]>;
  pair_?: InputMaybe<TradePair_Filter>;
  pair_contains?: InputMaybe<Scalars["String"]>;
  pair_contains_nocase?: InputMaybe<Scalars["String"]>;
  pair_ends_with?: InputMaybe<Scalars["String"]>;
  pair_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  pair_gt?: InputMaybe<Scalars["String"]>;
  pair_gte?: InputMaybe<Scalars["String"]>;
  pair_in?: InputMaybe<Array<Scalars["String"]>>;
  pair_lt?: InputMaybe<Scalars["String"]>;
  pair_lte?: InputMaybe<Scalars["String"]>;
  pair_not?: InputMaybe<Scalars["String"]>;
  pair_not_contains?: InputMaybe<Scalars["String"]>;
  pair_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  pair_not_ends_with?: InputMaybe<Scalars["String"]>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  pair_not_in?: InputMaybe<Array<Scalars["String"]>>;
  pair_not_starts_with?: InputMaybe<Scalars["String"]>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  pair_starts_with?: InputMaybe<Scalars["String"]>;
  pair_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  timestamp?: InputMaybe<Scalars["Int"]>;
  timestamp_gt?: InputMaybe<Scalars["Int"]>;
  timestamp_gte?: InputMaybe<Scalars["Int"]>;
  timestamp_in?: InputMaybe<Array<Scalars["Int"]>>;
  timestamp_lt?: InputMaybe<Scalars["Int"]>;
  timestamp_lte?: InputMaybe<Scalars["Int"]>;
  timestamp_not?: InputMaybe<Scalars["Int"]>;
  timestamp_not_in?: InputMaybe<Array<Scalars["Int"]>>;
  totalSwapFee?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapFee_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type TradePairSnapshot_OrderBy =
  | "id"
  | "pair"
  | "timestamp"
  | "totalSwapFee"
  | "totalSwapVolume";

export interface TradePair_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  token0?: InputMaybe<Scalars["String"]>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars["String"]>;
  token0_contains_nocase?: InputMaybe<Scalars["String"]>;
  token0_ends_with?: InputMaybe<Scalars["String"]>;
  token0_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token0_gt?: InputMaybe<Scalars["String"]>;
  token0_gte?: InputMaybe<Scalars["String"]>;
  token0_in?: InputMaybe<Array<Scalars["String"]>>;
  token0_lt?: InputMaybe<Scalars["String"]>;
  token0_lte?: InputMaybe<Scalars["String"]>;
  token0_not?: InputMaybe<Scalars["String"]>;
  token0_not_contains?: InputMaybe<Scalars["String"]>;
  token0_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  token0_not_ends_with?: InputMaybe<Scalars["String"]>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token0_not_in?: InputMaybe<Array<Scalars["String"]>>;
  token0_not_starts_with?: InputMaybe<Scalars["String"]>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  token0_starts_with?: InputMaybe<Scalars["String"]>;
  token0_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  token1?: InputMaybe<Scalars["String"]>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars["String"]>;
  token1_contains_nocase?: InputMaybe<Scalars["String"]>;
  token1_ends_with?: InputMaybe<Scalars["String"]>;
  token1_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token1_gt?: InputMaybe<Scalars["String"]>;
  token1_gte?: InputMaybe<Scalars["String"]>;
  token1_in?: InputMaybe<Array<Scalars["String"]>>;
  token1_lt?: InputMaybe<Scalars["String"]>;
  token1_lte?: InputMaybe<Scalars["String"]>;
  token1_not?: InputMaybe<Scalars["String"]>;
  token1_not_contains?: InputMaybe<Scalars["String"]>;
  token1_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  token1_not_ends_with?: InputMaybe<Scalars["String"]>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  token1_not_in?: InputMaybe<Array<Scalars["String"]>>;
  token1_not_starts_with?: InputMaybe<Scalars["String"]>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  token1_starts_with?: InputMaybe<Scalars["String"]>;
  token1_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  totalSwapFee?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapFee_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_gte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  totalSwapVolume_lt?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_lte?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not?: InputMaybe<Scalars["BigDecimal"]>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
}

export type TradePair_OrderBy =
  | "id"
  | "token0"
  | "token1"
  | "totalSwapFee"
  | "totalSwapVolume";

export interface User {
  __typename: "User";
  id: Scalars["ID"];
  sharesOwned?: Maybe<Array<PoolShare>>;
  swaps?: Maybe<Array<Swap>>;
  userInternalBalances?: Maybe<Array<UserInternalBalance>>;
}

export interface UserSharesOwnedArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<PoolShare_Filter>;
}

export interface UserSwapsArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<Swap_Filter>;
}

export interface UserUserInternalBalancesArgs {
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<UserInternalBalance_Filter>;
}

export interface UserInternalBalance {
  __typename: "UserInternalBalance";
  balance: Scalars["BigDecimal"];
  id: Scalars["ID"];
  token: Scalars["Bytes"];
  userAddress?: Maybe<User>;
}

export interface UserInternalBalance_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  balance?: InputMaybe<Scalars["BigDecimal"]>;
  balance_gt?: InputMaybe<Scalars["BigDecimal"]>;
  balance_gte?: InputMaybe<Scalars["BigDecimal"]>;
  balance_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  balance_lt?: InputMaybe<Scalars["BigDecimal"]>;
  balance_lte?: InputMaybe<Scalars["BigDecimal"]>;
  balance_not?: InputMaybe<Scalars["BigDecimal"]>;
  balance_not_in?: InputMaybe<Array<Scalars["BigDecimal"]>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  token?: InputMaybe<Scalars["Bytes"]>;
  token_contains?: InputMaybe<Scalars["Bytes"]>;
  token_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  token_not?: InputMaybe<Scalars["Bytes"]>;
  token_not_contains?: InputMaybe<Scalars["Bytes"]>;
  token_not_in?: InputMaybe<Array<Scalars["Bytes"]>>;
  userAddress?: InputMaybe<Scalars["String"]>;
  userAddress_?: InputMaybe<User_Filter>;
  userAddress_contains?: InputMaybe<Scalars["String"]>;
  userAddress_contains_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_ends_with?: InputMaybe<Scalars["String"]>;
  userAddress_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_gt?: InputMaybe<Scalars["String"]>;
  userAddress_gte?: InputMaybe<Scalars["String"]>;
  userAddress_in?: InputMaybe<Array<Scalars["String"]>>;
  userAddress_lt?: InputMaybe<Scalars["String"]>;
  userAddress_lte?: InputMaybe<Scalars["String"]>;
  userAddress_not?: InputMaybe<Scalars["String"]>;
  userAddress_not_contains?: InputMaybe<Scalars["String"]>;
  userAddress_not_contains_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_not_ends_with?: InputMaybe<Scalars["String"]>;
  userAddress_not_ends_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_not_in?: InputMaybe<Array<Scalars["String"]>>;
  userAddress_not_starts_with?: InputMaybe<Scalars["String"]>;
  userAddress_not_starts_with_nocase?: InputMaybe<Scalars["String"]>;
  userAddress_starts_with?: InputMaybe<Scalars["String"]>;
  userAddress_starts_with_nocase?: InputMaybe<Scalars["String"]>;
}

export type UserInternalBalance_OrderBy =
  | "balance"
  | "id"
  | "token"
  | "userAddress";

export interface User_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Array<Scalars["ID"]>>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
  sharesOwned_?: InputMaybe<PoolShare_Filter>;
  swaps_?: InputMaybe<Swap_Filter>;
  userInternalBalances_?: InputMaybe<UserInternalBalance_Filter>;
}

export type User_OrderBy =
  | "id"
  | "sharesOwned"
  | "swaps"
  | "userInternalBalances";

export interface _Block_ {
  __typename: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]>;
  /** The block number */
  number: Scalars["Int"];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars["Int"]>;
}

/** The type for the top-level _meta field */
export interface _Meta_ {
  __typename: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"];
}

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | "allow"
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | "deny";

export type GetProtocolDataQueryVariables = Exact<{
  startTimestamp: Scalars["Int"];
  block24: Block_Height;
  block48: Block_Height;
}>;

export type GetProtocolDataQuery = {
  __typename: "Query";
  balancers: Array<{
    __typename: "Balancer";
    totalLiquidity: string;
    totalSwapCount: string;
    totalSwapFee: string;
    totalSwapVolume: string;
    poolCount: number;
  }>;
  balancers24: Array<{
    __typename: "Balancer";
    totalLiquidity: string;
    totalSwapCount: string;
    totalSwapFee: string;
    totalSwapVolume: string;
    poolCount: number;
  }>;
  balancers48: Array<{
    __typename: "Balancer";
    totalLiquidity: string;
    totalSwapCount: string;
    totalSwapFee: string;
    totalSwapVolume: string;
    poolCount: number;
  }>;
  balancerSnapshots: Array<{
    __typename: "BalancerSnapshot";
    id: string;
    timestamp: number;
    poolCount: number;
    totalLiquidity: string;
    totalSwapCount: string;
    totalSwapVolume: string;
    totalSwapFee: string;
  }>;
  whaleSwaps: Array<{
    __typename: "Swap";
    id: string;
    caller: string;
    tokenIn: string;
    tokenInSym: string;
    tokenOut: string;
    tokenOutSym: string;
    tokenAmountIn: string;
    tokenAmountOut: string;
    valueUSD: string;
    timestamp: number;
    tx: string;
    poolId: {
      __typename: "Pool";
      id: string;
      name?: string | null;
      address: string;
      swapFee: string;
    };
    userAddress: { __typename: "User"; id: string };
  }>;
};

export type GetTokenDataQueryVariables = Exact<{
  block24: Block_Height;
  blockWeek: Block_Height;
}>;

export type GetTokenDataQuery = {
  __typename: "Query";
  tokens: Array<{
    __typename: "Token";
    id: string;
    address: string;
    decimals: number;
    name?: string | null;
    symbol?: string | null;
    totalBalanceUSD: string;
    totalBalanceNotional: string;
    totalVolumeUSD: string;
    totalVolumeNotional: string;
    totalSwapCount: string;
    latestPrice?: {
      __typename: "LatestPrice";
      asset: string;
      pricingAsset: string;
      price: string;
      poolId: { __typename: "Pool"; id: string };
    } | null;
  }>;
  prices: Array<{
    __typename: "LatestPrice";
    asset: string;
    pricingAsset: string;
    price: string;
    poolId: { __typename: "Pool"; id: string };
  }>;
  tokens24: Array<{
    __typename: "Token";
    id: string;
    address: string;
    decimals: number;
    name?: string | null;
    symbol?: string | null;
    totalBalanceUSD: string;
    totalBalanceNotional: string;
    totalVolumeUSD: string;
    totalVolumeNotional: string;
    totalSwapCount: string;
    latestPrice?: {
      __typename: "LatestPrice";
      asset: string;
      pricingAsset: string;
      price: string;
      poolId: { __typename: "Pool"; id: string };
    } | null;
  }>;
  prices24: Array<{
    __typename: "LatestPrice";
    asset: string;
    pricingAsset: string;
    price: string;
    poolId: { __typename: "Pool"; id: string };
  }>;
  tokensWeek: Array<{
    __typename: "Token";
    id: string;
    address: string;
    decimals: number;
    name?: string | null;
    symbol?: string | null;
    totalBalanceUSD: string;
    totalBalanceNotional: string;
    totalVolumeUSD: string;
    totalVolumeNotional: string;
    totalSwapCount: string;
    latestPrice?: {
      __typename: "LatestPrice";
      asset: string;
      pricingAsset: string;
      price: string;
      poolId: { __typename: "Pool"; id: string };
    } | null;
  }>;
  pricesWeek: Array<{
    __typename: "LatestPrice";
    asset: string;
    pricingAsset: string;
    price: string;
    poolId: { __typename: "Pool"; id: string };
  }>;
};

export type GetTokenPageDataQueryVariables = Exact<{
  address: Scalars["String"];
  startTimestamp: Scalars["Int"];
}>;

export type GetTokenPageDataQuery = {
  __typename: "Query";
  tokenSnapshots: Array<{
    __typename: "TokenSnapshot";
    id: string;
    timestamp: number;
    totalBalanceUSD: string;
    totalBalanceNotional: string;
    totalVolumeUSD: string;
    totalVolumeNotional: string;
    totalSwapCount: string;
  }>;
};

export type GetTransactionDataQueryVariables = Exact<{
  addresses: Array<Scalars["Bytes"]> | Scalars["Bytes"];
  poolIds: Array<Scalars["String"]> | Scalars["String"];
  startTimestamp: Scalars["Int"];
}>;

export type GetTransactionDataQuery = {
  __typename: "Query";
  swapsIn: Array<{
    __typename: "Swap";
    id: string;
    caller: string;
    tokenIn: string;
    tokenInSym: string;
    tokenOut: string;
    tokenOutSym: string;
    tokenAmountIn: string;
    tokenAmountOut: string;
    valueUSD: string;
    timestamp: number;
    tx: string;
    poolId: {
      __typename: "Pool";
      id: string;
      name?: string | null;
      address: string;
      swapFee: string;
    };
    userAddress: { __typename: "User"; id: string };
  }>;
  swapsOut: Array<{
    __typename: "Swap";
    id: string;
    caller: string;
    tokenIn: string;
    tokenInSym: string;
    tokenOut: string;
    tokenOutSym: string;
    tokenAmountIn: string;
    tokenAmountOut: string;
    valueUSD: string;
    timestamp: number;
    tx: string;
    poolId: {
      __typename: "Pool";
      id: string;
      name?: string | null;
      address: string;
      swapFee: string;
    };
    userAddress: { __typename: "User"; id: string };
  }>;
  joinExits: Array<{
    __typename: "JoinExit";
    amounts: Array<string>;
    valueUSD?: string | null;
    id: string;
    sender: string;
    timestamp: number;
    tx: string;
    type: InvestType;
    user: { __typename: "User"; id: string };
    pool: { __typename: "Pool"; id: string; tokensList: Array<string> };
  }>;
};

export type TokenSnapshotFragment = {
  __typename: "TokenSnapshot";
  id: string;
  timestamp: number;
  totalBalanceUSD: string;
  totalBalanceNotional: string;
  totalVolumeUSD: string;
  totalVolumeNotional: string;
  totalSwapCount: string;
};

export type GetPoolDataQueryVariables = Exact<{
  block24: Block_Height;
  block48: Block_Height;
  blockWeek: Block_Height;
}>;

export type GetPoolDataQuery = {
  __typename: "Query";
  pools: Array<{
    __typename: "Pool";
    id: string;
    address: string;
    poolType?: string | null;
    symbol?: string | null;
    name?: string | null;
    swapFee: string;
    totalWeight?: string | null;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    createTime: number;
    owner?: string | null;
    strategyType: number;
    swapEnabled: boolean;
    tokens?: Array<{
      __typename: "PoolToken";
      id: string;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      balance: string;
      weight?: string | null;
      priceRate: string;
      poolId?: { __typename: "Pool"; id: string; address: string } | null;
    }> | null;
  }>;
  pools24: Array<{
    __typename: "Pool";
    id: string;
    address: string;
    poolType?: string | null;
    symbol?: string | null;
    name?: string | null;
    swapFee: string;
    totalWeight?: string | null;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    createTime: number;
    owner?: string | null;
    strategyType: number;
    swapEnabled: boolean;
    tokens?: Array<{
      __typename: "PoolToken";
      id: string;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      balance: string;
      weight?: string | null;
      priceRate: string;
      poolId?: { __typename: "Pool"; id: string; address: string } | null;
    }> | null;
  }>;
  pools48: Array<{
    __typename: "Pool";
    id: string;
    address: string;
    poolType?: string | null;
    symbol?: string | null;
    name?: string | null;
    swapFee: string;
    totalWeight?: string | null;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    createTime: number;
    owner?: string | null;
    strategyType: number;
    swapEnabled: boolean;
    tokens?: Array<{
      __typename: "PoolToken";
      id: string;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      balance: string;
      weight?: string | null;
      priceRate: string;
      poolId?: { __typename: "Pool"; id: string; address: string } | null;
    }> | null;
  }>;
  poolsWeek: Array<{
    __typename: "Pool";
    id: string;
    address: string;
    poolType?: string | null;
    symbol?: string | null;
    name?: string | null;
    swapFee: string;
    totalWeight?: string | null;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    createTime: number;
    owner?: string | null;
    strategyType: number;
    swapEnabled: boolean;
    tokens?: Array<{
      __typename: "PoolToken";
      id: string;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      balance: string;
      weight?: string | null;
      priceRate: string;
      poolId?: { __typename: "Pool"; id: string; address: string } | null;
    }> | null;
  }>;
  prices: Array<{
    __typename: "LatestPrice";
    asset: string;
    pricingAsset: string;
    price: string;
    poolId: { __typename: "Pool"; id: string };
  }>;
};

export type GetUserWalletPoolDataQueryVariables = Exact<{
  userAddress: Scalars["String"];
  block: Scalars["Int"];
}>;

export type GetUserWalletPoolDataQuery = {
  __typename: "Query";
  poolShares: Array<{
    __typename: "PoolShare";
    balance: string;
    poolId: {
      __typename: "Pool";
      id: string;
      totalLiquidity: string;
      totalShares: string;
    };
  }>;
};

export type GetPoolChartDataQueryVariables = Exact<{
  poolId: Scalars["String"];
  startTimestamp: Scalars["Int"];
}>;

export type GetPoolChartDataQuery = {
  __typename: "Query";
  poolSnapshots: Array<{
    __typename: "PoolSnapshot";
    id: string;
    amounts: Array<string>;
    swapVolume: string;
    swapFees: string;
    timestamp: number;
    swapsCount: string;
    holdersCount: string;
    pool: {
      __typename: "Pool";
      id: string;
      tokens?: Array<{ __typename: "PoolToken"; address: string }> | null;
    };
  }>;
};

export type BalancerPoolSwapFeeSnapshotQueryVariables = Exact<{
  startTimestamp: Scalars["Int"];
  endTimeStamp: Scalars["Int"];
}>;

export type BalancerPoolSwapFeeSnapshotQuery = {
  __typename: "Query";
  poolSnapshots: Array<{
    __typename: "PoolSnapshot";
    id: string;
    amounts: Array<string>;
    totalShares: string;
    swapVolume: string;
    swapFees: string;
    timestamp: number;
    swapsCount: string;
    holdersCount: string;
    pool: { __typename: "Pool"; id: string };
  }>;
};

export type LatestPriceFragment = {
  __typename: "LatestPrice";
  asset: string;
  pricingAsset: string;
  price: string;
  poolId: { __typename: "Pool"; id: string };
};

export type BalancerProtocolDataQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Balancer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Balancer_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerProtocolDataQuery = {
  __typename: "Query";
  balancers: Array<{
    __typename: "Balancer";
    id: string;
    totalLiquidity: string;
    totalSwapVolume: string;
    totalSwapFee: string;
    poolCount: number;
    totalSwapCount: string;
  }>;
};

export type BalancerUserQueryVariables = Exact<{
  id: Scalars["ID"];
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerUserQuery = {
  __typename: "Query";
  user?: {
    __typename: "User";
    id: string;
    sharesOwned?: Array<{
      __typename: "PoolShare";
      balance: string;
      poolId: { __typename: "Pool"; id: string };
    }> | null;
  } | null;
};

export type BalancerUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerUsersQuery = {
  __typename: "Query";
  users: Array<{
    __typename: "User";
    id: string;
    sharesOwned?: Array<{
      __typename: "PoolShare";
      balance: string;
      poolId: { __typename: "Pool"; id: string };
    }> | null;
  }>;
};

export type UserFragment = {
  __typename: "User";
  id: string;
  sharesOwned?: Array<{
    __typename: "PoolShare";
    balance: string;
    poolId: { __typename: "Pool"; id: string };
  }> | null;
};

export type BalancerTokenPricesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TokenPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenPrice_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerTokenPricesQuery = {
  __typename: "Query";
  tokenPrices: Array<{
    __typename: "TokenPrice";
    id: string;
    asset: string;
    amount: string;
    pricingAsset: string;
    price: string;
    block: string;
    timestamp: number;
    poolId: { __typename: "Pool"; id: string };
  }>;
};

export type BalancerChartTokenPricesQueryVariables = Exact<{
  asset: Scalars["Bytes"];
}>;

export type BalancerChartTokenPricesQuery = {
  __typename: "Query";
  prices1: Array<{
    __typename: "TokenPrice";
    id: string;
    timestamp: number;
    price: string;
    amount: string;
  }>;
  prices2: Array<{
    __typename: "TokenPrice";
    id: string;
    timestamp: number;
    price: string;
    amount: string;
  }>;
  prices3: Array<{
    __typename: "TokenPrice";
    id: string;
    timestamp: number;
    price: string;
    amount: string;
  }>;
  prices4: Array<{
    __typename: "TokenPrice";
    id: string;
    timestamp: number;
    price: string;
    amount: string;
  }>;
  prices5: Array<{
    __typename: "TokenPrice";
    id: string;
    timestamp: number;
    price: string;
    amount: string;
  }>;
  prices6: Array<{
    __typename: "TokenPrice";
    id: string;
    timestamp: number;
    price: string;
    amount: string;
  }>;
};

export type BalancerChartTokenPriceFragment = {
  __typename: "TokenPrice";
  id: string;
  timestamp: number;
  price: string;
  amount: string;
};

export type BalancerTokenPriceFragment = {
  __typename: "TokenPrice";
  id: string;
  asset: string;
  amount: string;
  pricingAsset: string;
  price: string;
  block: string;
  timestamp: number;
  poolId: { __typename: "Pool"; id: string };
};

export type BalancerPoolFragment = {
  __typename: "Pool";
  id: string;
  address: string;
  poolType?: string | null;
  symbol?: string | null;
  name?: string | null;
  swapFee: string;
  totalWeight?: string | null;
  totalSwapVolume: string;
  totalSwapFee: string;
  totalLiquidity: string;
  totalShares: string;
  swapsCount: string;
  holdersCount: string;
  createTime: number;
  owner?: string | null;
  strategyType: number;
  swapEnabled: boolean;
  tokens?: Array<{
    __typename: "PoolToken";
    id: string;
    symbol: string;
    name: string;
    decimals: number;
    address: string;
    balance: string;
    weight?: string | null;
    priceRate: string;
    poolId?: { __typename: "Pool"; id: string; address: string } | null;
  }> | null;
};

export type BalancerPoolTokenFragment = {
  __typename: "PoolToken";
  id: string;
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  balance: string;
  weight?: string | null;
  priceRate: string;
  poolId?: { __typename: "Pool"; id: string; address: string } | null;
};

export type GetBalancerPoolsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type GetBalancerPoolsQuery = {
  __typename: "Query";
  pools: Array<{
    __typename: "Pool";
    id: string;
    address: string;
    poolType?: string | null;
    symbol?: string | null;
    name?: string | null;
    swapFee: string;
    totalWeight?: string | null;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    createTime: number;
    owner?: string | null;
    strategyType: number;
    swapEnabled: boolean;
    tokens?: Array<{
      __typename: "PoolToken";
      id: string;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      balance: string;
      weight?: string | null;
      priceRate: string;
      poolId?: { __typename: "Pool"; id: string; address: string } | null;
    }> | null;
  }>;
};

export type GetBalancerPoolQueryVariables = Exact<{
  id: Scalars["ID"];
  block?: InputMaybe<Block_Height>;
}>;

export type GetBalancerPoolQuery = {
  __typename: "Query";
  pool?: {
    __typename: "Pool";
    id: string;
    address: string;
    poolType?: string | null;
    symbol?: string | null;
    name?: string | null;
    swapFee: string;
    totalWeight?: string | null;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    createTime: number;
    owner?: string | null;
    strategyType: number;
    swapEnabled: boolean;
    tokens?: Array<{
      __typename: "PoolToken";
      id: string;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      balance: string;
      weight?: string | null;
      priceRate: string;
      poolId?: { __typename: "Pool"; id: string; address: string } | null;
    }> | null;
  } | null;
};

export type BalancerPoolTokensQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolToken_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerPoolTokensQuery = {
  __typename: "Query";
  poolTokens: Array<{
    __typename: "PoolToken";
    id: string;
    symbol: string;
    name: string;
    decimals: number;
    address: string;
    balance: string;
    weight?: string | null;
    priceRate: string;
    poolId?: { __typename: "Pool"; id: string; address: string } | null;
  }>;
};

export type BalancerPoolHistoricalLiquiditiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerPoolHistoricalLiquiditiesQuery = {
  __typename: "Query";
  poolHistoricalLiquidities: Array<{
    __typename: "PoolHistoricalLiquidity";
    id: string;
    poolTotalShares: string;
    poolLiquidity: string;
    poolShareValue: string;
    pricingAsset: string;
    block: string;
    poolId: { __typename: "Pool"; id: string };
  }>;
};

export type BalancerPoolSnapshotsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolSnapshot_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerPoolSnapshotsQuery = {
  __typename: "Query";
  poolSnapshots: Array<{
    __typename: "PoolSnapshot";
    id: string;
    totalShares: string;
    swapVolume: string;
    swapFees: string;
    timestamp: number;
    pool: { __typename: "Pool"; id: string };
  }>;
};

export type BalancerPoolSnapshotFragment = {
  __typename: "PoolSnapshot";
  id: string;
  totalShares: string;
  swapVolume: string;
  swapFees: string;
  timestamp: number;
  pool: { __typename: "Pool"; id: string };
};

export type BalancerLatestPricesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<LatestPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LatestPrice_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerLatestPricesQuery = {
  __typename: "Query";
  latestPrices: Array<{
    __typename: "LatestPrice";
    id: string;
    asset: string;
    price: string;
    pricingAsset: string;
    poolId: { __typename: "Pool"; id: string };
  }>;
};

export type BalancerJoinExitsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<JoinExit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<JoinExit_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerJoinExitsQuery = {
  __typename: "Query";
  joinExits: Array<{
    __typename: "JoinExit";
    amounts: Array<string>;
    valueUSD?: string | null;
    id: string;
    sender: string;
    timestamp: number;
    tx: string;
    type: InvestType;
    user: { __typename: "User"; id: string };
    pool: { __typename: "Pool"; id: string; tokensList: Array<string> };
  }>;
};

export type BalancerJoinExitFragment = {
  __typename: "JoinExit";
  amounts: Array<string>;
  valueUSD?: string | null;
  id: string;
  sender: string;
  timestamp: number;
  tx: string;
  type: InvestType;
  user: { __typename: "User"; id: string };
  pool: { __typename: "Pool"; id: string; tokensList: Array<string> };
};

export type BalancePortfolioDataQueryVariables = Exact<{
  id: Scalars["ID"];
  previousBlockNumber: Scalars["Int"];
}>;

export type BalancePortfolioDataQuery = {
  __typename: "Query";
  user?: {
    __typename: "User";
    id: string;
    sharesOwned?: Array<{
      __typename: "PoolShare";
      balance: string;
      poolId: { __typename: "Pool"; id: string };
    }> | null;
  } | null;
  pools: Array<{
    __typename: "Pool";
    id: string;
    address: string;
    poolType?: string | null;
    symbol?: string | null;
    name?: string | null;
    swapFee: string;
    totalWeight?: string | null;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    createTime: number;
    owner?: string | null;
    strategyType: number;
    swapEnabled: boolean;
    tokens?: Array<{
      __typename: "PoolToken";
      id: string;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      balance: string;
      weight?: string | null;
      priceRate: string;
      poolId?: { __typename: "Pool"; id: string; address: string } | null;
    }> | null;
  }>;
  previousUser?: {
    __typename: "User";
    id: string;
    sharesOwned?: Array<{
      __typename: "PoolShare";
      balance: string;
      poolId: { __typename: "Pool"; id: string };
    }> | null;
  } | null;
  previousPools: Array<{
    __typename: "Pool";
    id: string;
    address: string;
    poolType?: string | null;
    symbol?: string | null;
    name?: string | null;
    swapFee: string;
    totalWeight?: string | null;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    createTime: number;
    owner?: string | null;
    strategyType: number;
    swapEnabled: boolean;
    tokens?: Array<{
      __typename: "PoolToken";
      id: string;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      balance: string;
      weight?: string | null;
      priceRate: string;
      poolId?: { __typename: "Pool"; id: string; address: string } | null;
    }> | null;
  }>;
};

export type BalancerSwapsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerSwapsQuery = {
  __typename: "Query";
  swaps: Array<{
    __typename: "Swap";
    id: string;
    caller: string;
    tokenIn: string;
    tokenInSym: string;
    tokenOut: string;
    tokenOutSym: string;
    tokenAmountIn: string;
    tokenAmountOut: string;
    valueUSD: string;
    timestamp: number;
    tx: string;
    poolId: {
      __typename: "Pool";
      id: string;
      name?: string | null;
      address: string;
      swapFee: string;
    };
    userAddress: { __typename: "User"; id: string };
  }>;
};

export type BalancerSwapFragment = {
  __typename: "Swap";
  id: string;
  caller: string;
  tokenIn: string;
  tokenInSym: string;
  tokenOut: string;
  tokenOutSym: string;
  tokenAmountIn: string;
  tokenAmountOut: string;
  valueUSD: string;
  timestamp: number;
  tx: string;
  poolId: {
    __typename: "Pool";
    id: string;
    name?: string | null;
    address: string;
    swapFee: string;
  };
  userAddress: { __typename: "User"; id: string };
};

export type GetBalancerTokensQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type GetBalancerTokensQuery = {
  __typename: "Query";
  tokens: Array<{
    __typename: "Token";
    id: string;
    address: string;
    decimals: number;
    name?: string | null;
    symbol?: string | null;
    totalBalanceUSD: string;
    totalBalanceNotional: string;
    totalVolumeUSD: string;
    totalVolumeNotional: string;
    totalSwapCount: string;
    latestPrice?: {
      __typename: "LatestPrice";
      asset: string;
      pricingAsset: string;
      price: string;
      poolId: { __typename: "Pool"; id: string };
    } | null;
  }>;
};

export type BalancerTokenFragment = {
  __typename: "Token";
  id: string;
  address: string;
  decimals: number;
  name?: string | null;
  symbol?: string | null;
  totalBalanceUSD: string;
  totalBalanceNotional: string;
  totalVolumeUSD: string;
  totalVolumeNotional: string;
  totalSwapCount: string;
  latestPrice?: {
    __typename: "LatestPrice";
    asset: string;
    pricingAsset: string;
    price: string;
    poolId: { __typename: "Pool"; id: string };
  } | null;
};

export type BalancerTradePairsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<TradePair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TradePair_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type BalancerTradePairsQuery = {
  __typename: "Query";
  tradePairs: Array<{
    __typename: "TradePair";
    id: string;
    totalSwapVolume: string;
    totalSwapFee: string;
    token0: {
      __typename: "Token";
      id: string;
      address: string;
      decimals: number;
      name?: string | null;
      symbol?: string | null;
      totalBalanceUSD: string;
      totalBalanceNotional: string;
      totalVolumeUSD: string;
      totalVolumeNotional: string;
      totalSwapCount: string;
      latestPrice?: {
        __typename: "LatestPrice";
        asset: string;
        pricingAsset: string;
        price: string;
        poolId: { __typename: "Pool"; id: string };
      } | null;
    };
    token1: {
      __typename: "Token";
      id: string;
      address: string;
      decimals: number;
      name?: string | null;
      symbol?: string | null;
      totalBalanceUSD: string;
      totalBalanceNotional: string;
      totalVolumeUSD: string;
      totalVolumeNotional: string;
      totalSwapCount: string;
      latestPrice?: {
        __typename: "LatestPrice";
        asset: string;
        pricingAsset: string;
        price: string;
        poolId: { __typename: "Pool"; id: string };
      } | null;
    };
  }>;
};

export type BalancerTradePairFragment = {
  __typename: "TradePair";
  id: string;
  totalSwapVolume: string;
  totalSwapFee: string;
  token0: {
    __typename: "Token";
    id: string;
    address: string;
    decimals: number;
    name?: string | null;
    symbol?: string | null;
    totalBalanceUSD: string;
    totalBalanceNotional: string;
    totalVolumeUSD: string;
    totalVolumeNotional: string;
    totalSwapCount: string;
    latestPrice?: {
      __typename: "LatestPrice";
      asset: string;
      pricingAsset: string;
      price: string;
      poolId: { __typename: "Pool"; id: string };
    } | null;
  };
  token1: {
    __typename: "Token";
    id: string;
    address: string;
    decimals: number;
    name?: string | null;
    symbol?: string | null;
    totalBalanceUSD: string;
    totalBalanceNotional: string;
    totalVolumeUSD: string;
    totalVolumeNotional: string;
    totalSwapCount: string;
    latestPrice?: {
      __typename: "LatestPrice";
      asset: string;
      pricingAsset: string;
      price: string;
      poolId: { __typename: "Pool"; id: string };
    } | null;
  };
};

export type GetBalancerSnapshotsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<BalancerSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BalancerSnapshot_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type GetBalancerSnapshotsQuery = {
  __typename: "Query";
  balancerSnapshots: Array<{
    __typename: "BalancerSnapshot";
    id: string;
    timestamp: number;
    poolCount: number;
    totalLiquidity: string;
    totalSwapCount: string;
    totalSwapVolume: string;
    totalSwapFee: string;
  }>;
};

export type BalancerSnapshotFragment = {
  __typename: "BalancerSnapshot";
  id: string;
  timestamp: number;
  poolCount: number;
  totalLiquidity: string;
  totalSwapCount: string;
  totalSwapVolume: string;
  totalSwapFee: string;
};

export type GetLatestPricesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]>;
  first?: InputMaybe<Scalars["Int"]>;
  orderBy?: InputMaybe<LatestPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LatestPrice_Filter>;
  block?: InputMaybe<Block_Height>;
}>;

export type GetLatestPricesQuery = {
  __typename: "Query";
  latestPrices: Array<{
    __typename: "LatestPrice";
    asset: string;
    pricingAsset: string;
    price: string;
    poolId: { __typename: "Pool"; id: string };
  }>;
};

export type GetLatestBlockQueryVariables = Exact<{ [key: string]: never }>;

export type GetLatestBlockQuery = {
  __typename: "Query";
  blocks: Array<{
    __typename: "Block";
    id: string;
    number: string;
    timestamp: string;
  }>;
};

export const TokenSnapshotFragmentDoc = gql`
  fragment TokenSnapshot on TokenSnapshot {
    id
    timestamp
    totalBalanceUSD
    totalBalanceNotional
    totalVolumeUSD
    totalVolumeNotional
    totalSwapCount
  }
`;
export const LatestPriceFragmentDoc = gql`
  fragment LatestPrice on LatestPrice {
    asset
    pricingAsset
    price
    poolId {
      id
    }
  }
`;
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    sharesOwned(first: 1000) {
      balance
      poolId {
        id
      }
    }
  }
`;
export const BalancerChartTokenPriceFragmentDoc = gql`
  fragment BalancerChartTokenPrice on TokenPrice {
    id
    timestamp
    price
    amount
  }
`;
export const BalancerTokenPriceFragmentDoc = gql`
  fragment BalancerTokenPrice on TokenPrice {
    id
    poolId {
      id
    }
    asset
    amount
    pricingAsset
    price
    block
    timestamp
  }
`;
export const BalancerPoolTokenFragmentDoc = gql`
  fragment BalancerPoolToken on PoolToken {
    id
    symbol
    name
    decimals
    address
    balance
    weight
    priceRate
    poolId {
      id
      address
    }
  }
`;
export const BalancerPoolFragmentDoc = gql`
  fragment BalancerPool on Pool {
    id
    address
    poolType
    symbol
    name
    swapFee
    totalWeight
    totalSwapVolume
    totalSwapFee
    totalLiquidity
    totalShares
    swapsCount
    holdersCount
    createTime
    owner
    strategyType
    swapEnabled
    tokens(first: 1000) {
      ...BalancerPoolToken
    }
  }
  ${BalancerPoolTokenFragmentDoc}
`;
export const BalancerPoolSnapshotFragmentDoc = gql`
  fragment BalancerPoolSnapshot on PoolSnapshot {
    id
    pool {
      id
    }
    totalShares
    swapVolume
    swapFees
    timestamp
  }
`;
export const BalancerJoinExitFragmentDoc = gql`
  fragment BalancerJoinExit on JoinExit {
    amounts
    valueUSD
    id
    sender
    timestamp
    tx
    type
    user {
      id
    }
    pool {
      id
      tokensList
    }
  }
`;
export const BalancerSwapFragmentDoc = gql`
  fragment BalancerSwap on Swap {
    id
    caller
    tokenIn
    tokenInSym
    tokenOut
    tokenOutSym
    tokenAmountIn
    tokenAmountOut
    valueUSD
    poolId {
      id
      name
      address
      swapFee
    }
    userAddress {
      id
    }
    timestamp
    tx
  }
`;
export const BalancerTokenFragmentDoc = gql`
  fragment BalancerToken on Token {
    id
    address
    decimals
    name
    symbol
    totalBalanceUSD
    totalBalanceNotional
    totalVolumeUSD
    totalVolumeNotional
    totalSwapCount
    latestPrice {
      asset
      pricingAsset
      price
      poolId {
        id
      }
    }
  }
`;
export const BalancerTradePairFragmentDoc = gql`
  fragment BalancerTradePair on TradePair {
    id
    token0 {
      ...BalancerToken
    }
    token1 {
      ...BalancerToken
    }
    totalSwapVolume
    totalSwapFee
  }
  ${BalancerTokenFragmentDoc}
`;
export const BalancerSnapshotFragmentDoc = gql`
  fragment BalancerSnapshot on BalancerSnapshot {
    id
    timestamp
    poolCount
    totalLiquidity
    totalSwapCount
    totalSwapVolume
    totalSwapFee
  }
`;
export const GetProtocolDataDocument = gql`
  query GetProtocolData(
    $startTimestamp: Int!
    $block24: Block_height!
    $block48: Block_height!
  ) {
    balancers(first: 1) {
      totalLiquidity
      totalSwapCount
      totalSwapFee
      totalSwapVolume
      poolCount
    }
    balancers24: balancers(first: 1, block: $block24) {
      totalLiquidity
      totalSwapCount
      totalSwapFee
      totalSwapVolume
      poolCount
    }
    balancers48: balancers(first: 1, block: $block48) {
      totalLiquidity
      totalSwapCount
      totalSwapFee
      totalSwapVolume
      poolCount
    }
    balancerSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gte: $startTimestamp }
    ) {
      ...BalancerSnapshot
    }
    whaleSwaps: swaps(
      first: 100
      orderBy: timestamp
      orderDirection: desc
      where: { valueUSD_gte: "10000" }
    ) {
      ...BalancerSwap
    }
  }
  ${BalancerSnapshotFragmentDoc}
  ${BalancerSwapFragmentDoc}
`;

/**
 * __useGetProtocolDataQuery__
 *
 * To run a query within a React component, call `useGetProtocolDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProtocolDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProtocolDataQuery({
 *   variables: {
 *      startTimestamp: // value for 'startTimestamp'
 *      block24: // value for 'block24'
 *      block48: // value for 'block48'
 *   },
 * });
 */
export function useGetProtocolDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProtocolDataQuery,
    GetProtocolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProtocolDataQuery, GetProtocolDataQueryVariables>(
    GetProtocolDataDocument,
    options
  );
}
export function useGetProtocolDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProtocolDataQuery,
    GetProtocolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProtocolDataQuery,
    GetProtocolDataQueryVariables
  >(GetProtocolDataDocument, options);
}
export type GetProtocolDataQueryHookResult = ReturnType<
  typeof useGetProtocolDataQuery
>;
export type GetProtocolDataLazyQueryHookResult = ReturnType<
  typeof useGetProtocolDataLazyQuery
>;
export type GetProtocolDataQueryResult = Apollo.QueryResult<
  GetProtocolDataQuery,
  GetProtocolDataQueryVariables
>;
export const GetTokenDataDocument = gql`
  query GetTokenData($block24: Block_height!, $blockWeek: Block_height!) {
    tokens: tokens(
      first: 1000
      orderBy: totalBalanceUSD
      orderDirection: desc
    ) {
      ...BalancerToken
    }
    prices: latestPrices(first: 1000) {
      ...LatestPrice
    }
    tokens24: tokens(
      first: 1000
      orderBy: totalBalanceUSD
      orderDirection: desc
      block: $block24
    ) {
      ...BalancerToken
    }
    prices24: latestPrices(first: 1000, block: $block24) {
      ...LatestPrice
    }
    tokensWeek: tokens(
      first: 1000
      orderBy: totalBalanceUSD
      orderDirection: desc
      block: $blockWeek
    ) {
      ...BalancerToken
    }
    pricesWeek: latestPrices(first: 1000, block: $blockWeek) {
      ...LatestPrice
    }
  }
  ${BalancerTokenFragmentDoc}
  ${LatestPriceFragmentDoc}
`;

/**
 * __useGetTokenDataQuery__
 *
 * To run a query within a React component, call `useGetTokenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenDataQuery({
 *   variables: {
 *      block24: // value for 'block24'
 *      blockWeek: // value for 'blockWeek'
 *   },
 * });
 */
export function useGetTokenDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTokenDataQuery,
    GetTokenDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTokenDataQuery, GetTokenDataQueryVariables>(
    GetTokenDataDocument,
    options
  );
}
export function useGetTokenDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTokenDataQuery,
    GetTokenDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTokenDataQuery, GetTokenDataQueryVariables>(
    GetTokenDataDocument,
    options
  );
}
export type GetTokenDataQueryHookResult = ReturnType<
  typeof useGetTokenDataQuery
>;
export type GetTokenDataLazyQueryHookResult = ReturnType<
  typeof useGetTokenDataLazyQuery
>;
export type GetTokenDataQueryResult = Apollo.QueryResult<
  GetTokenDataQuery,
  GetTokenDataQueryVariables
>;
export const GetTokenPageDataDocument = gql`
  query GetTokenPageData($address: String!, $startTimestamp: Int!) {
    tokenSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { token: $address, timestamp_gte: $startTimestamp }
    ) {
      ...TokenSnapshot
    }
  }
  ${TokenSnapshotFragmentDoc}
`;

/**
 * __useGetTokenPageDataQuery__
 *
 * To run a query within a React component, call `useGetTokenPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenPageDataQuery({
 *   variables: {
 *      address: // value for 'address'
 *      startTimestamp: // value for 'startTimestamp'
 *   },
 * });
 */
export function useGetTokenPageDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTokenPageDataQuery,
    GetTokenPageDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTokenPageDataQuery, GetTokenPageDataQueryVariables>(
    GetTokenPageDataDocument,
    options
  );
}
export function useGetTokenPageDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTokenPageDataQuery,
    GetTokenPageDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTokenPageDataQuery,
    GetTokenPageDataQueryVariables
  >(GetTokenPageDataDocument, options);
}
export type GetTokenPageDataQueryHookResult = ReturnType<
  typeof useGetTokenPageDataQuery
>;
export type GetTokenPageDataLazyQueryHookResult = ReturnType<
  typeof useGetTokenPageDataLazyQuery
>;
export type GetTokenPageDataQueryResult = Apollo.QueryResult<
  GetTokenPageDataQuery,
  GetTokenPageDataQueryVariables
>;
export const GetTransactionDataDocument = gql`
  query GetTransactionData(
    $addresses: [Bytes!]!
    $poolIds: [String!]!
    $startTimestamp: Int!
  ) {
    swapsIn: swaps(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: {
        tokenIn_in: $addresses
        poolId_in: $poolIds
        timestamp_gte: $startTimestamp
      }
    ) {
      ...BalancerSwap
    }
    swapsOut: swaps(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: {
        tokenOut_in: $addresses
        poolId_in: $poolIds
        timestamp_gte: $startTimestamp
      }
    ) {
      ...BalancerSwap
    }
    joinExits(
      first: 150
      orderBy: timestamp
      orderDirection: desc
      where: { pool_in: $poolIds, timestamp_gte: $startTimestamp }
    ) {
      ...BalancerJoinExit
    }
  }
  ${BalancerSwapFragmentDoc}
  ${BalancerJoinExitFragmentDoc}
`;

/**
 * __useGetTransactionDataQuery__
 *
 * To run a query within a React component, call `useGetTransactionDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionDataQuery({
 *   variables: {
 *      addresses: // value for 'addresses'
 *      poolIds: // value for 'poolIds'
 *      startTimestamp: // value for 'startTimestamp'
 *   },
 * });
 */
export function useGetTransactionDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTransactionDataQuery,
    GetTransactionDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTransactionDataQuery,
    GetTransactionDataQueryVariables
  >(GetTransactionDataDocument, options);
}
export function useGetTransactionDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTransactionDataQuery,
    GetTransactionDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTransactionDataQuery,
    GetTransactionDataQueryVariables
  >(GetTransactionDataDocument, options);
}
export type GetTransactionDataQueryHookResult = ReturnType<
  typeof useGetTransactionDataQuery
>;
export type GetTransactionDataLazyQueryHookResult = ReturnType<
  typeof useGetTransactionDataLazyQuery
>;
export type GetTransactionDataQueryResult = Apollo.QueryResult<
  GetTransactionDataQuery,
  GetTransactionDataQueryVariables
>;
export const GetPoolDataDocument = gql`
  query GetPoolData(
    $block24: Block_height!
    $block48: Block_height!
    $blockWeek: Block_height!
  ) {
    pools(first: 1000, orderBy: totalLiquidity, orderDirection: desc) {
      ...BalancerPool
    }
    pools24: pools(
      first: 1000
      orderBy: totalLiquidity
      orderDirection: desc
      block: $block24
    ) {
      ...BalancerPool
    }
    pools48: pools(
      first: 1000
      orderBy: totalLiquidity
      orderDirection: desc
      block: $block48
    ) {
      ...BalancerPool
    }
    poolsWeek: pools(
      first: 1000
      orderBy: totalLiquidity
      orderDirection: desc
      where: { totalLiquidity_gt: "0.01" }
      block: $blockWeek
    ) {
      ...BalancerPool
    }
    prices: latestPrices(first: 1000) {
      ...LatestPrice
    }
  }
  ${BalancerPoolFragmentDoc}
  ${LatestPriceFragmentDoc}
`;

/**
 * __useGetPoolDataQuery__
 *
 * To run a query within a React component, call `useGetPoolDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolDataQuery({
 *   variables: {
 *      block24: // value for 'block24'
 *      block48: // value for 'block48'
 *      blockWeek: // value for 'blockWeek'
 *   },
 * });
 */
export function useGetPoolDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPoolDataQuery,
    GetPoolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolDataQuery, GetPoolDataQueryVariables>(
    GetPoolDataDocument,
    options
  );
}
export function useGetPoolDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPoolDataQuery,
    GetPoolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPoolDataQuery, GetPoolDataQueryVariables>(
    GetPoolDataDocument,
    options
  );
}
export type GetPoolDataQueryHookResult = ReturnType<typeof useGetPoolDataQuery>;
export type GetPoolDataLazyQueryHookResult = ReturnType<
  typeof useGetPoolDataLazyQuery
>;
export type GetPoolDataQueryResult = Apollo.QueryResult<
  GetPoolDataQuery,
  GetPoolDataQueryVariables
>;
export const GetUserWalletPoolDataDocument = gql`
  query GetUserWalletPoolData($userAddress: String!, $block: Int!) {
    poolShares(
      block: { number: $block }
      first: 1000
      where: { userAddress: $userAddress, balance_gt: 0 }
    ) {
      balance
      poolId {
        id
        totalLiquidity
        totalShares
      }
    }
  }
`;

/**
 * __useGetUserWalletPoolDataQuery__
 *
 * To run a query within a React component, call `useGetUserWalletPoolDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWalletPoolDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWalletPoolDataQuery({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useGetUserWalletPoolDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserWalletPoolDataQuery,
    GetUserWalletPoolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetUserWalletPoolDataQuery,
    GetUserWalletPoolDataQueryVariables
  >(GetUserWalletPoolDataDocument, options);
}
export function useGetUserWalletPoolDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserWalletPoolDataQuery,
    GetUserWalletPoolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetUserWalletPoolDataQuery,
    GetUserWalletPoolDataQueryVariables
  >(GetUserWalletPoolDataDocument, options);
}
export type GetUserWalletPoolDataQueryHookResult = ReturnType<
  typeof useGetUserWalletPoolDataQuery
>;
export type GetUserWalletPoolDataLazyQueryHookResult = ReturnType<
  typeof useGetUserWalletPoolDataLazyQuery
>;
export type GetUserWalletPoolDataQueryResult = Apollo.QueryResult<
  GetUserWalletPoolDataQuery,
  GetUserWalletPoolDataQueryVariables
>;
export const GetPoolChartDataDocument = gql`
  query GetPoolChartData($poolId: String!, $startTimestamp: Int!) {
    poolSnapshots(
      first: 1000
      orderBy: timestamp
      orderDirection: asc
      where: { pool: $poolId, timestamp_gte: $startTimestamp }
    ) {
      id
      amounts
      swapVolume
      swapFees
      timestamp
      swapsCount
      holdersCount
      pool {
        id
        tokens {
          address
        }
      }
    }
  }
`;

/**
 * __useGetPoolChartDataQuery__
 *
 * To run a query within a React component, call `useGetPoolChartDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPoolChartDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPoolChartDataQuery({
 *   variables: {
 *      poolId: // value for 'poolId'
 *      startTimestamp: // value for 'startTimestamp'
 *   },
 * });
 */
export function useGetPoolChartDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPoolChartDataQuery,
    GetPoolChartDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPoolChartDataQuery, GetPoolChartDataQueryVariables>(
    GetPoolChartDataDocument,
    options
  );
}
export function useGetPoolChartDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPoolChartDataQuery,
    GetPoolChartDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPoolChartDataQuery,
    GetPoolChartDataQueryVariables
  >(GetPoolChartDataDocument, options);
}
export type GetPoolChartDataQueryHookResult = ReturnType<
  typeof useGetPoolChartDataQuery
>;
export type GetPoolChartDataLazyQueryHookResult = ReturnType<
  typeof useGetPoolChartDataLazyQuery
>;
export type GetPoolChartDataQueryResult = Apollo.QueryResult<
  GetPoolChartDataQuery,
  GetPoolChartDataQueryVariables
>;
export const BalancerPoolSwapFeeSnapshotDocument = gql`
  query BalancerPoolSwapFeeSnapshot(
    $startTimestamp: Int!
    $endTimeStamp: Int!
  ) {
    poolSnapshots(
      first: 1000
      orderBy: swapFees
      orderDirection: desc
      where: { timestamp_in: [$startTimestamp, $endTimeStamp] }
    ) {
      id
      amounts
      totalShares
      swapVolume
      swapFees
      timestamp
      swapsCount
      holdersCount
      pool {
        id
      }
    }
  }
`;

/**
 * __useBalancerPoolSwapFeeSnapshotQuery__
 *
 * To run a query within a React component, call `useBalancerPoolSwapFeeSnapshotQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerPoolSwapFeeSnapshotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerPoolSwapFeeSnapshotQuery({
 *   variables: {
 *      startTimestamp: // value for 'startTimestamp'
 *      endTimeStamp: // value for 'endTimeStamp'
 *   },
 * });
 */
export function useBalancerPoolSwapFeeSnapshotQuery(
  baseOptions: Apollo.QueryHookOptions<
    BalancerPoolSwapFeeSnapshotQuery,
    BalancerPoolSwapFeeSnapshotQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerPoolSwapFeeSnapshotQuery,
    BalancerPoolSwapFeeSnapshotQueryVariables
  >(BalancerPoolSwapFeeSnapshotDocument, options);
}
export function useBalancerPoolSwapFeeSnapshotLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerPoolSwapFeeSnapshotQuery,
    BalancerPoolSwapFeeSnapshotQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerPoolSwapFeeSnapshotQuery,
    BalancerPoolSwapFeeSnapshotQueryVariables
  >(BalancerPoolSwapFeeSnapshotDocument, options);
}
export type BalancerPoolSwapFeeSnapshotQueryHookResult = ReturnType<
  typeof useBalancerPoolSwapFeeSnapshotQuery
>;
export type BalancerPoolSwapFeeSnapshotLazyQueryHookResult = ReturnType<
  typeof useBalancerPoolSwapFeeSnapshotLazyQuery
>;
export type BalancerPoolSwapFeeSnapshotQueryResult = Apollo.QueryResult<
  BalancerPoolSwapFeeSnapshotQuery,
  BalancerPoolSwapFeeSnapshotQueryVariables
>;
export const BalancerProtocolDataDocument = gql`
  query BalancerProtocolData(
    $skip: Int
    $first: Int
    $orderBy: Balancer_orderBy
    $orderDirection: OrderDirection
    $where: Balancer_filter
    $block: Block_height
  ) {
    balancers(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      totalLiquidity
      totalSwapVolume
      totalSwapFee
      poolCount
      totalSwapCount
    }
  }
`;

/**
 * __useBalancerProtocolDataQuery__
 *
 * To run a query within a React component, call `useBalancerProtocolDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerProtocolDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerProtocolDataQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerProtocolDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerProtocolDataQuery,
    BalancerProtocolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerProtocolDataQuery,
    BalancerProtocolDataQueryVariables
  >(BalancerProtocolDataDocument, options);
}
export function useBalancerProtocolDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerProtocolDataQuery,
    BalancerProtocolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerProtocolDataQuery,
    BalancerProtocolDataQueryVariables
  >(BalancerProtocolDataDocument, options);
}
export type BalancerProtocolDataQueryHookResult = ReturnType<
  typeof useBalancerProtocolDataQuery
>;
export type BalancerProtocolDataLazyQueryHookResult = ReturnType<
  typeof useBalancerProtocolDataLazyQuery
>;
export type BalancerProtocolDataQueryResult = Apollo.QueryResult<
  BalancerProtocolDataQuery,
  BalancerProtocolDataQueryVariables
>;
export const BalancerUserDocument = gql`
  query BalancerUser($id: ID!, $block: Block_height) {
    user(id: $id, block: $block) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useBalancerUserQuery__
 *
 * To run a query within a React component, call `useBalancerUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    BalancerUserQuery,
    BalancerUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BalancerUserQuery, BalancerUserQueryVariables>(
    BalancerUserDocument,
    options
  );
}
export function useBalancerUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerUserQuery,
    BalancerUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BalancerUserQuery, BalancerUserQueryVariables>(
    BalancerUserDocument,
    options
  );
}
export type BalancerUserQueryHookResult = ReturnType<
  typeof useBalancerUserQuery
>;
export type BalancerUserLazyQueryHookResult = ReturnType<
  typeof useBalancerUserLazyQuery
>;
export type BalancerUserQueryResult = Apollo.QueryResult<
  BalancerUserQuery,
  BalancerUserQueryVariables
>;
export const BalancerUsersDocument = gql`
  query BalancerUsers(
    $skip: Int
    $first: Int
    $orderBy: User_orderBy
    $orderDirection: OrderDirection
    $where: User_filter
    $block: Block_height
  ) {
    users(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useBalancerUsersQuery__
 *
 * To run a query within a React component, call `useBalancerUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerUsersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerUsersQuery,
    BalancerUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BalancerUsersQuery, BalancerUsersQueryVariables>(
    BalancerUsersDocument,
    options
  );
}
export function useBalancerUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerUsersQuery,
    BalancerUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BalancerUsersQuery, BalancerUsersQueryVariables>(
    BalancerUsersDocument,
    options
  );
}
export type BalancerUsersQueryHookResult = ReturnType<
  typeof useBalancerUsersQuery
>;
export type BalancerUsersLazyQueryHookResult = ReturnType<
  typeof useBalancerUsersLazyQuery
>;
export type BalancerUsersQueryResult = Apollo.QueryResult<
  BalancerUsersQuery,
  BalancerUsersQueryVariables
>;
export const BalancerTokenPricesDocument = gql`
  query BalancerTokenPrices(
    $skip: Int
    $first: Int
    $orderBy: TokenPrice_orderBy
    $orderDirection: OrderDirection
    $where: TokenPrice_filter
    $block: Block_height
  ) {
    tokenPrices(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerTokenPrice
    }
  }
  ${BalancerTokenPriceFragmentDoc}
`;

/**
 * __useBalancerTokenPricesQuery__
 *
 * To run a query within a React component, call `useBalancerTokenPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerTokenPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerTokenPricesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerTokenPricesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerTokenPricesQuery,
    BalancerTokenPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerTokenPricesQuery,
    BalancerTokenPricesQueryVariables
  >(BalancerTokenPricesDocument, options);
}
export function useBalancerTokenPricesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerTokenPricesQuery,
    BalancerTokenPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerTokenPricesQuery,
    BalancerTokenPricesQueryVariables
  >(BalancerTokenPricesDocument, options);
}
export type BalancerTokenPricesQueryHookResult = ReturnType<
  typeof useBalancerTokenPricesQuery
>;
export type BalancerTokenPricesLazyQueryHookResult = ReturnType<
  typeof useBalancerTokenPricesLazyQuery
>;
export type BalancerTokenPricesQueryResult = Apollo.QueryResult<
  BalancerTokenPricesQuery,
  BalancerTokenPricesQueryVariables
>;
export const BalancerChartTokenPricesDocument = gql`
  query BalancerChartTokenPrices($asset: Bytes!) {
    prices1: tokenPrices(
      skip: 0
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices2: tokenPrices(
      skip: 1000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices3: tokenPrices(
      skip: 2000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices4: tokenPrices(
      skip: 3000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices5: tokenPrices(
      skip: 4000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
    prices6: tokenPrices(
      skip: 5000
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { asset: $asset }
    ) {
      ...BalancerChartTokenPrice
    }
  }
  ${BalancerChartTokenPriceFragmentDoc}
`;

/**
 * __useBalancerChartTokenPricesQuery__
 *
 * To run a query within a React component, call `useBalancerChartTokenPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerChartTokenPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerChartTokenPricesQuery({
 *   variables: {
 *      asset: // value for 'asset'
 *   },
 * });
 */
export function useBalancerChartTokenPricesQuery(
  baseOptions: Apollo.QueryHookOptions<
    BalancerChartTokenPricesQuery,
    BalancerChartTokenPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerChartTokenPricesQuery,
    BalancerChartTokenPricesQueryVariables
  >(BalancerChartTokenPricesDocument, options);
}
export function useBalancerChartTokenPricesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerChartTokenPricesQuery,
    BalancerChartTokenPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerChartTokenPricesQuery,
    BalancerChartTokenPricesQueryVariables
  >(BalancerChartTokenPricesDocument, options);
}
export type BalancerChartTokenPricesQueryHookResult = ReturnType<
  typeof useBalancerChartTokenPricesQuery
>;
export type BalancerChartTokenPricesLazyQueryHookResult = ReturnType<
  typeof useBalancerChartTokenPricesLazyQuery
>;
export type BalancerChartTokenPricesQueryResult = Apollo.QueryResult<
  BalancerChartTokenPricesQuery,
  BalancerChartTokenPricesQueryVariables
>;
export const GetBalancerPoolsDocument = gql`
  query GetBalancerPools(
    $skip: Int
    $first: Int
    $orderBy: Pool_orderBy
    $orderDirection: OrderDirection
    $where: Pool_filter
    $block: Block_height
  ) {
    pools(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerPool
    }
  }
  ${BalancerPoolFragmentDoc}
`;

/**
 * __useGetBalancerPoolsQuery__
 *
 * To run a query within a React component, call `useGetBalancerPoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalancerPoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalancerPoolsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useGetBalancerPoolsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetBalancerPoolsQuery,
    GetBalancerPoolsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBalancerPoolsQuery, GetBalancerPoolsQueryVariables>(
    GetBalancerPoolsDocument,
    options
  );
}
export function useGetBalancerPoolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBalancerPoolsQuery,
    GetBalancerPoolsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBalancerPoolsQuery,
    GetBalancerPoolsQueryVariables
  >(GetBalancerPoolsDocument, options);
}
export type GetBalancerPoolsQueryHookResult = ReturnType<
  typeof useGetBalancerPoolsQuery
>;
export type GetBalancerPoolsLazyQueryHookResult = ReturnType<
  typeof useGetBalancerPoolsLazyQuery
>;
export type GetBalancerPoolsQueryResult = Apollo.QueryResult<
  GetBalancerPoolsQuery,
  GetBalancerPoolsQueryVariables
>;
export const GetBalancerPoolDocument = gql`
  query GetBalancerPool($id: ID!, $block: Block_height) {
    pool(id: $id, block: $block) {
      ...BalancerPool
    }
  }
  ${BalancerPoolFragmentDoc}
`;

/**
 * __useGetBalancerPoolQuery__
 *
 * To run a query within a React component, call `useGetBalancerPoolQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalancerPoolQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalancerPoolQuery({
 *   variables: {
 *      id: // value for 'id'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useGetBalancerPoolQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBalancerPoolQuery,
    GetBalancerPoolQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBalancerPoolQuery, GetBalancerPoolQueryVariables>(
    GetBalancerPoolDocument,
    options
  );
}
export function useGetBalancerPoolLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBalancerPoolQuery,
    GetBalancerPoolQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBalancerPoolQuery,
    GetBalancerPoolQueryVariables
  >(GetBalancerPoolDocument, options);
}
export type GetBalancerPoolQueryHookResult = ReturnType<
  typeof useGetBalancerPoolQuery
>;
export type GetBalancerPoolLazyQueryHookResult = ReturnType<
  typeof useGetBalancerPoolLazyQuery
>;
export type GetBalancerPoolQueryResult = Apollo.QueryResult<
  GetBalancerPoolQuery,
  GetBalancerPoolQueryVariables
>;
export const BalancerPoolTokensDocument = gql`
  query BalancerPoolTokens(
    $skip: Int
    $first: Int
    $orderBy: PoolToken_orderBy
    $orderDirection: OrderDirection
    $where: PoolToken_filter
    $block: Block_height
  ) {
    poolTokens(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerPoolToken
    }
  }
  ${BalancerPoolTokenFragmentDoc}
`;

/**
 * __useBalancerPoolTokensQuery__
 *
 * To run a query within a React component, call `useBalancerPoolTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerPoolTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerPoolTokensQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerPoolTokensQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerPoolTokensQuery,
    BalancerPoolTokensQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerPoolTokensQuery,
    BalancerPoolTokensQueryVariables
  >(BalancerPoolTokensDocument, options);
}
export function useBalancerPoolTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerPoolTokensQuery,
    BalancerPoolTokensQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerPoolTokensQuery,
    BalancerPoolTokensQueryVariables
  >(BalancerPoolTokensDocument, options);
}
export type BalancerPoolTokensQueryHookResult = ReturnType<
  typeof useBalancerPoolTokensQuery
>;
export type BalancerPoolTokensLazyQueryHookResult = ReturnType<
  typeof useBalancerPoolTokensLazyQuery
>;
export type BalancerPoolTokensQueryResult = Apollo.QueryResult<
  BalancerPoolTokensQuery,
  BalancerPoolTokensQueryVariables
>;
export const BalancerPoolHistoricalLiquiditiesDocument = gql`
  query BalancerPoolHistoricalLiquidities(
    $skip: Int
    $first: Int
    $orderBy: PoolHistoricalLiquidity_orderBy
    $orderDirection: OrderDirection
    $where: PoolHistoricalLiquidity_filter
    $block: Block_height
  ) {
    poolHistoricalLiquidities(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      poolId {
        id
      }
      poolTotalShares
      poolLiquidity
      poolShareValue
      pricingAsset
      block
    }
  }
`;

/**
 * __useBalancerPoolHistoricalLiquiditiesQuery__
 *
 * To run a query within a React component, call `useBalancerPoolHistoricalLiquiditiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerPoolHistoricalLiquiditiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerPoolHistoricalLiquiditiesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerPoolHistoricalLiquiditiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerPoolHistoricalLiquiditiesQuery,
    BalancerPoolHistoricalLiquiditiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerPoolHistoricalLiquiditiesQuery,
    BalancerPoolHistoricalLiquiditiesQueryVariables
  >(BalancerPoolHistoricalLiquiditiesDocument, options);
}
export function useBalancerPoolHistoricalLiquiditiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerPoolHistoricalLiquiditiesQuery,
    BalancerPoolHistoricalLiquiditiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerPoolHistoricalLiquiditiesQuery,
    BalancerPoolHistoricalLiquiditiesQueryVariables
  >(BalancerPoolHistoricalLiquiditiesDocument, options);
}
export type BalancerPoolHistoricalLiquiditiesQueryHookResult = ReturnType<
  typeof useBalancerPoolHistoricalLiquiditiesQuery
>;
export type BalancerPoolHistoricalLiquiditiesLazyQueryHookResult = ReturnType<
  typeof useBalancerPoolHistoricalLiquiditiesLazyQuery
>;
export type BalancerPoolHistoricalLiquiditiesQueryResult = Apollo.QueryResult<
  BalancerPoolHistoricalLiquiditiesQuery,
  BalancerPoolHistoricalLiquiditiesQueryVariables
>;
export const BalancerPoolSnapshotsDocument = gql`
  query BalancerPoolSnapshots(
    $skip: Int
    $first: Int
    $orderBy: PoolSnapshot_orderBy
    $orderDirection: OrderDirection
    $where: PoolSnapshot_filter
    $block: Block_height
  ) {
    poolSnapshots(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerPoolSnapshot
    }
  }
  ${BalancerPoolSnapshotFragmentDoc}
`;

/**
 * __useBalancerPoolSnapshotsQuery__
 *
 * To run a query within a React component, call `useBalancerPoolSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerPoolSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerPoolSnapshotsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerPoolSnapshotsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerPoolSnapshotsQuery,
    BalancerPoolSnapshotsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerPoolSnapshotsQuery,
    BalancerPoolSnapshotsQueryVariables
  >(BalancerPoolSnapshotsDocument, options);
}
export function useBalancerPoolSnapshotsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerPoolSnapshotsQuery,
    BalancerPoolSnapshotsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerPoolSnapshotsQuery,
    BalancerPoolSnapshotsQueryVariables
  >(BalancerPoolSnapshotsDocument, options);
}
export type BalancerPoolSnapshotsQueryHookResult = ReturnType<
  typeof useBalancerPoolSnapshotsQuery
>;
export type BalancerPoolSnapshotsLazyQueryHookResult = ReturnType<
  typeof useBalancerPoolSnapshotsLazyQuery
>;
export type BalancerPoolSnapshotsQueryResult = Apollo.QueryResult<
  BalancerPoolSnapshotsQuery,
  BalancerPoolSnapshotsQueryVariables
>;
export const BalancerLatestPricesDocument = gql`
  query BalancerLatestPrices(
    $skip: Int
    $first: Int
    $orderBy: LatestPrice_orderBy
    $orderDirection: OrderDirection
    $where: LatestPrice_filter
    $block: Block_height
  ) {
    latestPrices(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      id
      asset
      price
      poolId {
        id
      }
      pricingAsset
    }
  }
`;

/**
 * __useBalancerLatestPricesQuery__
 *
 * To run a query within a React component, call `useBalancerLatestPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerLatestPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerLatestPricesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerLatestPricesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerLatestPricesQuery,
    BalancerLatestPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerLatestPricesQuery,
    BalancerLatestPricesQueryVariables
  >(BalancerLatestPricesDocument, options);
}
export function useBalancerLatestPricesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerLatestPricesQuery,
    BalancerLatestPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerLatestPricesQuery,
    BalancerLatestPricesQueryVariables
  >(BalancerLatestPricesDocument, options);
}
export type BalancerLatestPricesQueryHookResult = ReturnType<
  typeof useBalancerLatestPricesQuery
>;
export type BalancerLatestPricesLazyQueryHookResult = ReturnType<
  typeof useBalancerLatestPricesLazyQuery
>;
export type BalancerLatestPricesQueryResult = Apollo.QueryResult<
  BalancerLatestPricesQuery,
  BalancerLatestPricesQueryVariables
>;
export const BalancerJoinExitsDocument = gql`
  query BalancerJoinExits(
    $skip: Int
    $first: Int
    $orderBy: JoinExit_orderBy
    $orderDirection: OrderDirection
    $where: JoinExit_filter
    $block: Block_height
  ) {
    joinExits(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerJoinExit
    }
  }
  ${BalancerJoinExitFragmentDoc}
`;

/**
 * __useBalancerJoinExitsQuery__
 *
 * To run a query within a React component, call `useBalancerJoinExitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerJoinExitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerJoinExitsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerJoinExitsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerJoinExitsQuery,
    BalancerJoinExitsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerJoinExitsQuery,
    BalancerJoinExitsQueryVariables
  >(BalancerJoinExitsDocument, options);
}
export function useBalancerJoinExitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerJoinExitsQuery,
    BalancerJoinExitsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerJoinExitsQuery,
    BalancerJoinExitsQueryVariables
  >(BalancerJoinExitsDocument, options);
}
export type BalancerJoinExitsQueryHookResult = ReturnType<
  typeof useBalancerJoinExitsQuery
>;
export type BalancerJoinExitsLazyQueryHookResult = ReturnType<
  typeof useBalancerJoinExitsLazyQuery
>;
export type BalancerJoinExitsQueryResult = Apollo.QueryResult<
  BalancerJoinExitsQuery,
  BalancerJoinExitsQueryVariables
>;
export const BalancePortfolioDataDocument = gql`
  query BalancePortfolioData($id: ID!, $previousBlockNumber: Int!) {
    user(id: $id) {
      ...User
    }
    pools(first: 1000, where: { totalShares_gt: "0" }) {
      ...BalancerPool
    }
    previousUser: user(id: $id, block: { number: $previousBlockNumber }) {
      ...User
    }
    previousPools: pools(
      first: 1000
      where: { totalShares_gt: "0" }
      block: { number: $previousBlockNumber }
    ) {
      ...BalancerPool
    }
  }
  ${UserFragmentDoc}
  ${BalancerPoolFragmentDoc}
`;

/**
 * __useBalancePortfolioDataQuery__
 *
 * To run a query within a React component, call `useBalancePortfolioDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancePortfolioDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancePortfolioDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *      previousBlockNumber: // value for 'previousBlockNumber'
 *   },
 * });
 */
export function useBalancePortfolioDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    BalancePortfolioDataQuery,
    BalancePortfolioDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancePortfolioDataQuery,
    BalancePortfolioDataQueryVariables
  >(BalancePortfolioDataDocument, options);
}
export function useBalancePortfolioDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancePortfolioDataQuery,
    BalancePortfolioDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancePortfolioDataQuery,
    BalancePortfolioDataQueryVariables
  >(BalancePortfolioDataDocument, options);
}
export type BalancePortfolioDataQueryHookResult = ReturnType<
  typeof useBalancePortfolioDataQuery
>;
export type BalancePortfolioDataLazyQueryHookResult = ReturnType<
  typeof useBalancePortfolioDataLazyQuery
>;
export type BalancePortfolioDataQueryResult = Apollo.QueryResult<
  BalancePortfolioDataQuery,
  BalancePortfolioDataQueryVariables
>;
export const BalancerSwapsDocument = gql`
  query BalancerSwaps(
    $skip: Int
    $first: Int
    $orderBy: Swap_orderBy
    $orderDirection: OrderDirection
    $where: Swap_filter
    $block: Block_height
  ) {
    swaps(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerSwap
    }
  }
  ${BalancerSwapFragmentDoc}
`;

/**
 * __useBalancerSwapsQuery__
 *
 * To run a query within a React component, call `useBalancerSwapsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerSwapsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerSwapsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerSwapsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerSwapsQuery,
    BalancerSwapsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BalancerSwapsQuery, BalancerSwapsQueryVariables>(
    BalancerSwapsDocument,
    options
  );
}
export function useBalancerSwapsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerSwapsQuery,
    BalancerSwapsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BalancerSwapsQuery, BalancerSwapsQueryVariables>(
    BalancerSwapsDocument,
    options
  );
}
export type BalancerSwapsQueryHookResult = ReturnType<
  typeof useBalancerSwapsQuery
>;
export type BalancerSwapsLazyQueryHookResult = ReturnType<
  typeof useBalancerSwapsLazyQuery
>;
export type BalancerSwapsQueryResult = Apollo.QueryResult<
  BalancerSwapsQuery,
  BalancerSwapsQueryVariables
>;
export const GetBalancerTokensDocument = gql`
  query GetBalancerTokens(
    $skip: Int
    $first: Int
    $orderBy: Token_orderBy
    $orderDirection: OrderDirection
    $where: Token_filter
    $block: Block_height
  ) {
    tokens(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerToken
    }
  }
  ${BalancerTokenFragmentDoc}
`;

/**
 * __useGetBalancerTokensQuery__
 *
 * To run a query within a React component, call `useGetBalancerTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalancerTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalancerTokensQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useGetBalancerTokensQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetBalancerTokensQuery,
    GetBalancerTokensQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetBalancerTokensQuery,
    GetBalancerTokensQueryVariables
  >(GetBalancerTokensDocument, options);
}
export function useGetBalancerTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBalancerTokensQuery,
    GetBalancerTokensQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBalancerTokensQuery,
    GetBalancerTokensQueryVariables
  >(GetBalancerTokensDocument, options);
}
export type GetBalancerTokensQueryHookResult = ReturnType<
  typeof useGetBalancerTokensQuery
>;
export type GetBalancerTokensLazyQueryHookResult = ReturnType<
  typeof useGetBalancerTokensLazyQuery
>;
export type GetBalancerTokensQueryResult = Apollo.QueryResult<
  GetBalancerTokensQuery,
  GetBalancerTokensQueryVariables
>;
export const BalancerTradePairsDocument = gql`
  query BalancerTradePairs(
    $skip: Int
    $first: Int
    $orderBy: TradePair_orderBy
    $orderDirection: OrderDirection
    $where: TradePair_filter
    $block: Block_height
  ) {
    tradePairs(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerTradePair
    }
  }
  ${BalancerTradePairFragmentDoc}
`;

/**
 * __useBalancerTradePairsQuery__
 *
 * To run a query within a React component, call `useBalancerTradePairsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalancerTradePairsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalancerTradePairsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useBalancerTradePairsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BalancerTradePairsQuery,
    BalancerTradePairsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BalancerTradePairsQuery,
    BalancerTradePairsQueryVariables
  >(BalancerTradePairsDocument, options);
}
export function useBalancerTradePairsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BalancerTradePairsQuery,
    BalancerTradePairsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BalancerTradePairsQuery,
    BalancerTradePairsQueryVariables
  >(BalancerTradePairsDocument, options);
}
export type BalancerTradePairsQueryHookResult = ReturnType<
  typeof useBalancerTradePairsQuery
>;
export type BalancerTradePairsLazyQueryHookResult = ReturnType<
  typeof useBalancerTradePairsLazyQuery
>;
export type BalancerTradePairsQueryResult = Apollo.QueryResult<
  BalancerTradePairsQuery,
  BalancerTradePairsQueryVariables
>;
export const GetBalancerSnapshotsDocument = gql`
  query GetBalancerSnapshots(
    $skip: Int
    $first: Int
    $orderBy: BalancerSnapshot_orderBy
    $orderDirection: OrderDirection
    $where: BalancerSnapshot_filter
    $block: Block_height
  ) {
    balancerSnapshots(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...BalancerSnapshot
    }
  }
  ${BalancerSnapshotFragmentDoc}
`;

/**
 * __useGetBalancerSnapshotsQuery__
 *
 * To run a query within a React component, call `useGetBalancerSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalancerSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalancerSnapshotsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useGetBalancerSnapshotsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetBalancerSnapshotsQuery,
    GetBalancerSnapshotsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetBalancerSnapshotsQuery,
    GetBalancerSnapshotsQueryVariables
  >(GetBalancerSnapshotsDocument, options);
}
export function useGetBalancerSnapshotsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBalancerSnapshotsQuery,
    GetBalancerSnapshotsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBalancerSnapshotsQuery,
    GetBalancerSnapshotsQueryVariables
  >(GetBalancerSnapshotsDocument, options);
}
export type GetBalancerSnapshotsQueryHookResult = ReturnType<
  typeof useGetBalancerSnapshotsQuery
>;
export type GetBalancerSnapshotsLazyQueryHookResult = ReturnType<
  typeof useGetBalancerSnapshotsLazyQuery
>;
export type GetBalancerSnapshotsQueryResult = Apollo.QueryResult<
  GetBalancerSnapshotsQuery,
  GetBalancerSnapshotsQueryVariables
>;
export const GetLatestPricesDocument = gql`
  query GetLatestPrices(
    $skip: Int
    $first: Int
    $orderBy: LatestPrice_orderBy
    $orderDirection: OrderDirection
    $where: LatestPrice_filter
    $block: Block_height
  ) {
    latestPrices(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
      block: $block
    ) {
      ...LatestPrice
    }
  }
  ${LatestPriceFragmentDoc}
`;

/**
 * __useGetLatestPricesQuery__
 *
 * To run a query within a React component, call `useGetLatestPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestPricesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *      block: // value for 'block'
 *   },
 * });
 */
export function useGetLatestPricesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLatestPricesQuery,
    GetLatestPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLatestPricesQuery, GetLatestPricesQueryVariables>(
    GetLatestPricesDocument,
    options
  );
}
export function useGetLatestPricesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLatestPricesQuery,
    GetLatestPricesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetLatestPricesQuery,
    GetLatestPricesQueryVariables
  >(GetLatestPricesDocument, options);
}
export type GetLatestPricesQueryHookResult = ReturnType<
  typeof useGetLatestPricesQuery
>;
export type GetLatestPricesLazyQueryHookResult = ReturnType<
  typeof useGetLatestPricesLazyQuery
>;
export type GetLatestPricesQueryResult = Apollo.QueryResult<
  GetLatestPricesQuery,
  GetLatestPricesQueryVariables
>;
export const GetLatestBlockDocument = gql`
  query GetLatestBlock {
    blocks(first: 1, orderBy: timestamp, orderDirection: desc) {
      id
      number
      timestamp
    }
  }
`;

/**
 * __useGetLatestBlockQuery__
 *
 * To run a query within a React component, call `useGetLatestBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestBlockQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLatestBlockQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLatestBlockQuery,
    GetLatestBlockQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLatestBlockQuery, GetLatestBlockQueryVariables>(
    GetLatestBlockDocument,
    options
  );
}
export function useGetLatestBlockLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLatestBlockQuery,
    GetLatestBlockQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLatestBlockQuery, GetLatestBlockQueryVariables>(
    GetLatestBlockDocument,
    options
  );
}
export type GetLatestBlockQueryHookResult = ReturnType<
  typeof useGetLatestBlockQuery
>;
export type GetLatestBlockLazyQueryHookResult = ReturnType<
  typeof useGetLatestBlockLazyQuery
>;
export type GetLatestBlockQueryResult = Apollo.QueryResult<
  GetLatestBlockQuery,
  GetLatestBlockQueryVariables
>;
