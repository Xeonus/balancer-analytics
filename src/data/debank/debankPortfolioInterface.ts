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
