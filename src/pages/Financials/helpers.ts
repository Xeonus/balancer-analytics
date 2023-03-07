import dayjs from 'dayjs';
import { KARPATKEY_SAFE, SERVICE_PROVIDER_WALLETS } from '../../constants/wallets';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import { TransactionHistory } from '../../data/debank/debankTypes';


export function extractTransactionsByTokenAndType(txnHistory: TransactionHistory, tokenAddress: string, type: string, sender?: string) {

    const tnxChartData: BalancerChartDataItem[] = []
    txnHistory.history_list.forEach((el) => {
        let date = dayjs.unix(el.time_at);
        if (el.cate_id === type && type === 'receive') {
            el.receives.forEach(
                receive => {
                    if (tokenAddress === receive.token_id) {
                        if (sender ? receive.from_addr === sender : true) {
                            tnxChartData.push(
                                {
                                    value: receive.amount,
                                    time: date.format("YYYY-MM-DD"),
                                }
                            )
                        }
                    }

                }
            )

        }
        if (type === 'send') {
            el.sends.forEach(
                send => {
                    
                    //Only list taxations that happened between the DAO and SP wallets
                    const wallet = SERVICE_PROVIDER_WALLETS.find( el => el.walletId.toLowerCase() === send.to_addr)
                    if (tokenAddress === send.token_id && wallet) {
                        tnxChartData.push(
                            {
                                value: send.amount < 0 ? send.amount : - send.amount,
                                time: date.format("YYYY-MM-DD"),
                            }
                        )
                    }

                }
            )

        }
    })

    //sort by time
    tnxChartData.sort(function (a, b) {
        const date1 = new Date(a.time)
        const date2 = new Date(b.time)
        return date1.getTime() - date2.getTime();
    })
    return tnxChartData;
}

export function getChartDataByQuarter(chartData: BalancerChartDataItem[]) {
    const quarterData: BalancerChartDataItem[] = [];
    let quarterSum = 0;
    let currentQuarter = '';

    chartData.forEach(item => {
        let quarter = Math.floor((new Date(item.time).getMonth() + 3) / 3);
        let year = new Date(item.time).getFullYear();
        let currentQuarterYear = `Q${quarter}-${year}`;

        if (currentQuarter !== currentQuarterYear) {
            if (currentQuarter !== '') {
                quarterData.push({
                    time: currentQuarter,
                    value: quarterSum,
                });
            }
            currentQuarter = currentQuarterYear;
            quarterSum = 0;
        }
        quarterSum += item.value;
    });
    // Push the last set of data
    quarterData.push({
        time: currentQuarter,
        value: quarterSum,
    });
    return quarterData;
}

export function getChartDataByMonth(chartData: BalancerChartDataItem[]) {
    const quarterData: BalancerChartDataItem[] = [];
    let quarterSum = 0;
    let currentMonth = '';

    chartData.forEach(item => {
        let month = new Date(item.time).getMonth();
        let year = new Date(item.time).getFullYear();
        let currentMonthYear = `${new Date(item.time).toLocaleString('default', { month: 'short' })}-${year}`;

        if (currentMonth !== currentMonthYear) {
            if (currentMonth !== '') {
                quarterData.push({
                    time: currentMonth,
                    value: quarterSum,
                });
            }
            currentMonth = currentMonthYear;
            quarterSum = 0;
        }
        quarterSum += item.value;
    });
    // Push the last set of data
    quarterData.push({
        time: currentMonth,
        value: quarterSum,
    });
    return quarterData;
}

export function getMonthlyChartDataByDateRange(chartData: BalancerChartDataItem[], start: Date, end: Date) {
        let monthlyData: BalancerChartDataItem[] = [];
        //Create new object to remove pointer reference!
        let startDate = new Date(start.getTime());
        let endDate = new Date(end.getTime());
        let currentMonth = '';
        let monthSum = 0

    chartData.forEach(item => {
        let month = new Date(item.time).getMonth();
        let year = new Date(item.time).getFullYear();
        let currentMonthYear = `${new Date(item.time).toLocaleString('default', { month: 'short' })}-${year}`;

        if (currentMonth !== currentMonthYear) {
            if (currentMonth !== '') {
                monthlyData.push({
                    time: currentMonth,
                    value: monthSum,
                });
            }
            currentMonth = currentMonthYear;
            monthSum = 0;
        }
        monthSum += item.value;
    });

    // Push the last set of data
    monthlyData.push({
        time: currentMonth,
        value: monthSum,
    });

    return monthlyData;

}

export function getDailyChartDataByDateRange(chartData: BalancerChartDataItem[], start: Date, end: Date) {
    let dailyData: BalancerChartDataItem[] = [];
        //Create new object to remove pointer reference!
        let startDate = new Date(start.getTime());
        let endDate = new Date(end.getTime());
  
    while (startDate <= endDate) {
      let day = startDate.toISOString().slice(0, 10);
      let obj = chartData.find(o => o.time === day);
      dailyData.push(obj ? obj : { time: day, value: 0 });
      startDate.setDate(startDate.getDate() + 1);
    }
    return dailyData;
  }

export function getCumulativeSumTrace(chartData: BalancerChartDataItem[], start: Date, end: Date) {

    const cumulativeChartData: BalancerChartDataItem[] = [];
    //Create new object to remove pointer reference!
    let startDate = new Date(start.getTime());
    let endDate = new Date(end.getTime());

    while (startDate <= endDate) {
        cumulativeChartData.push({ value: 0, time: startDate.toISOString().slice(0, 10) });
        startDate.setDate(startDate.getDate() + 1);
    }

    let cumulativeSum = 0;
    cumulativeChartData.forEach(item => {
        cumulativeSum += item.value
        const index = chartData.findIndex(obj => obj.time === item.time);
        if (index && chartData[index]) {
            cumulativeSum += chartData[index].value
        }
        item.value = cumulativeSum

    })
    return cumulativeChartData;
}