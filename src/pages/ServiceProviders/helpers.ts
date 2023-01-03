import { useState, useEffect } from 'react';
import { BalancerPieChartDataItem } from '../../data/balancer/balancerTypes';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { Budget, ServiceProviderEntry, ServiceProvidersConfig } from '../../types';
import { CoingeckoRawData } from '../../data/balancer/useTokens';
import { createData, Data } from '../../components/Tables/ServiceProviderSpendingTable';
//Import quarter plugin
dayjs.extend(quarterOfYear);


export function useGetQuarterlyTotalSpendData(sps: ServiceProvidersConfig, year: number, quarter: number, balPriceData: CoingeckoRawData | undefined) {

    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';
    const quarterlyBAL = sps.service_provider.reduce((acc, sp) => {
        const budget = sp.budgets.find(el => el.quarter === quarter && el.year === year)
        return budget ? budget.budget_requested.BAL + acc : acc
    }, 0)
    const quarterlyBALVested = sps.service_provider.reduce((acc, sp) => {
        const budget = sp.budgets.find(el => el.quarter === quarter && el.year === year)
        return budget ? budget.budget_requested.BAL_VESTED + acc : acc
    }, 0)
    const quarterlyUSDC = sps.service_provider.reduce((acc, sp) => {
        const budget = sp.budgets.find(el => el.quarter === quarter && el.year === year)
        return budget ? budget.budget_requested.USDC + acc : acc
    }, 0)

    const [quarterlyPie, setQuarterlyPie] = useState<BalancerPieChartDataItem[]>([]);
    const [quarterlyTotalBudget, setQuarterlyTotalBudget] = useState(0)

    //Create Pie Chart data points
    useEffect(() => {
        if (balPriceData && balPriceData[balAddress]) {
            const pie: BalancerPieChartDataItem[] = []
            pie.push(
                {
                    value: quarterlyBALVested * balPriceData[balAddress].usd,
                    name: 'Vested BAL'
                }
            )
            pie.push(
                {
                    value: quarterlyBAL * balPriceData[balAddress].usd,
                    name: 'Liquid BAL'
                }
            )
            pie.push(
                {
                    value: quarterlyUSDC,
                    name: 'USDC'
                }
            )
            const totalBudget = (quarterlyBALVested * balPriceData[balAddress].usd + quarterlyBAL * balPriceData[balAddress].usd + quarterlyUSDC)
            setQuarterlyPie(pie);
            setQuarterlyTotalBudget(totalBudget);
        }
    }, [balPriceData !== undefined]);

    return [quarterlyPie, quarterlyTotalBudget] as const;
}

export function useGetSPTableEntry(sps: ServiceProvidersConfig, year: number, quarter: number, balPriceData: CoingeckoRawData | undefined) {


    const balAddress = '0xba100000625a3754423978a60c9317c58a424e3d';

    const initialSpRows = sps.service_provider.map(el => {
        const budget = el.budgets.find(el => el.quarter === quarter && el.year === year)
        const quarterlyBAL = budget ? budget.budget_requested.BAL : 0
        const quarterlyBALVested = budget ? budget.budget_requested.BAL_VESTED : 0
        const quarterlyUSDC = budget ? budget.budget_requested.USDC : 0
        const quarterlyTotalBudget = 0;
        return createData(el.name, quarterlyUSDC, quarterlyBAL, quarterlyBALVested, quarterlyTotalBudget)
    });

    const [spRows, setSpRows] = useState<Data[]>([]);

    useEffect(() => {
        if (balPriceData && balPriceData[balAddress]) {
            const updatedRows = initialSpRows.map((item) => {
                return {
                    ...item,
                    quarterlyTotal: (item.quarterlyBALVested * balPriceData[balAddress].usd + item.quarterlyBAL * balPriceData[balAddress].usd + item.quarterlyUSDC),
                };
            });
            setSpRows(updatedRows);
        }
    }, [balPriceData !== undefined]);

    return spRows
}

export function getTotalsBySp(spRows: Data[]) {
    const pie: BalancerPieChartDataItem[] = []
    spRows.forEach(sp => {
        pie.push(
            {
                value: sp.quarterlyTotal,
            name: sp.spName
            }
        )
    })
    return pie;
}