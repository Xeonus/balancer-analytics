import { useMemo } from 'react'
import dayjs from 'dayjs'
import isoWeek from "dayjs/plugin/isoWeek";
import { GenericChartEntry } from '../types'

import { BalancerChartDataItem } from '../data/balancer/balancerTypes';


function unixToType(unix: number, type: 'month' | 'week') {
    dayjs.extend(isoWeek);
  const date = dayjs.unix(unix)

  switch (type) {
    case 'month':
      return date.format('YYYY-MM')
    case 'week':
      let week = String(date.isoWeek())
      if (week.length === 1) {
        week = `0${week}`
      }
      return `${date.year()}-${week}`
  }
}


export function useTransformedVolumeData(
  chartData: BalancerChartDataItem[] | undefined,
  type: 'month' | 'week'
) {
  return useMemo(() => {
    if (chartData) {
      const data: Record<string, GenericChartEntry> = {}

      chartData.forEach(({ time, value }: { time: string; value: number }) => {
        const group = unixToType(Math.floor(new Date(time).getTime() / 1000), type)
        if (data[group]) {
          data[group].value += value
        } else {
          data[group] = {
            time: time,
            value: value,
          }
        }
      })

      return Object.values(data)
    } else {
      return []
    }
  }, [chartData, type])
}