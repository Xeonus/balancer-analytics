import dayjs from 'dayjs';
import { BalancerChartDataItem } from '../../data/balancer/balancerTypes';
import { TransactionHistory } from '../../data/debank/debankTypes';


export function extractTransactionsByTokenAndType(txnHistory: TransactionHistory, tokenAddress: string, type: string) {
    
    const tnxChartData: BalancerChartDataItem[] = []
    txnHistory.history_list.forEach((el) => {
        let date = dayjs.unix(el.time_at);
        if (el.cate_id === type ) {
            el.receives.forEach(
                receive => {
                    if (tokenAddress === receive.token_id) {
                        tnxChartData.push(
                            {
                                value: receive.amount,
                                time: date.format("YYYY-MM-DD"),
                            }
                        )
                    }
                
                }
            )
            
        }
    })

    //sort by time
    //tnxChartData.sort(function(a, b) {
    //    return new Date(a.time) - new Date(b.time);
    //});

    return tnxChartData;

}