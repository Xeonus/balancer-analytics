//Total Balance for Wallet Interface
export type TotalTokenBalances = TokenBalance[]

export interface TokenBalance {
  id: string
  chain: string
  name: string
  symbol: string
  display_symbol?: string
  optimized_symbol: string
  decimals: number
  logo_url?: string
  protocol_id: string
  price: number
  is_verified: boolean
  is_core: boolean
  is_wallet: boolean
  time_at?: number
  amount: number
  raw_amount: number
  raw_amount_hex_str: string
}

//Supported chain Portfolio for wallet interface
export type Portfolio = ChainPortfolio[]

export interface ChainPortfolio {
  id: string
  chain: string
  name: string
  site_url: string
  logo_url: string
  has_supported_portfolio: boolean
  tvl: number
  portfolio_item_list: PortfolioItemList[]
}

export interface PortfolioItemList {
  stats: Stats
  asset_dict: AssetDict[]
  update_at: number
  name: string
  detail_types: string[]
  detail: Detail
  proxy_detail: ProxyDetail
  pool: Pool
}

export interface Stats {
  asset_usd_value: number
  debt_usd_value: number
  net_usd_value: number
}

export interface AssetDict {
  [key: string]: number
}

export interface Detail {
  supply_token_list: SupplyTokenList[]
  description?: string
  health_rate?: number
  reward_token_list?: RewardTokenList[]
}

export interface SupplyTokenList {
  id: string
  chain: string
  amount: number
  name: string
  symbol: string
  display_symbol?: string
  optimized_symbol: string
  decimals: number
  logo_url?: string
  protocol_id: string
  price: number
  is_verified: boolean
  is_core: boolean
  is_wallet: boolean
  time_at?: number
}

export interface RewardTokenList {
  id: string
  chain: string
  amount: number
  name: string
  symbol: string
  display_symbol: any
  optimized_symbol: string
  decimals: number
  logo_url?: string
  protocol_id: string
  price: number
  is_verified: boolean
  is_core: boolean
  is_wallet: boolean
  time_at: number
}

export interface ProxyDetail {}

export interface Pool {
  id: string
  chain: string
  project_id: string
  adapter_id: string
  controller: string
  index: any
  time_at: number
}

//Transaction types

export interface TransactionHistory {
  cate_dict: CateDict
  history_list: HistoryList[]
  project_dict: ProjectDict
  token_dict: TokenDict
}

export interface CateDict {
  approve: Approve
  receive: Receive
  send: Send
}

export interface Approve {
  id: string
  name: string
}

export interface Receive {
  id: string
  name: string
}

export interface Send {
  id: string
  name: string
}

export interface HistoryList {
  cate_id: string
  chain: string
  id: string
  project_id?: string
  receives: any[]
  sends: Send2[]
  time_at: number
  token_approve?: TokenApprove
  tx: Tx
  other_addr?: string
}

export interface Send2 {
  amount: number
  to_addr: string
  token_id: string
}

export interface TokenApprove {
  spender: string
  token_id: string
  value: number
}

export interface Tx {
  eth_gas_fee: number
  from_addr: string
  name: string
  params: any[]
  status: number
  to_addr: string
  usd_gas_fee: number
  value: number
}

export interface ProjectDict {
  zkswap: Zkswap
}

export interface Zkswap {
  chain: string
  id: string
  logo_url: string
  name: string
  site_url: string
}

export interface TokenDict {
  [key: string]: Eth
}

export interface Eth {
  chain: string
  decimals: number
  display_symbol: any
  id: string
  is_core: boolean
  is_verified: boolean
  is_wallet: boolean
  logo_url: string
  name: string
  optimized_symbol: string
  price: number
  protocol_id: string
  symbol: string
  time_at: number
}

