import { BalancerPieChartDataItem } from "../../data/balancer/balancerTypes";

export function mergeArrays(array1 : BalancerPieChartDataItem[], array2: BalancerPieChartDataItem[]) {
    let result: BalancerPieChartDataItem[] = [];
  
    for (let i = 0; i < array1.length; i++) {
      let found = false;
      for (let j = 0; j < array2.length; j++) {
        if (array1[i].name === array2[j].name) {
          result.push({ name: array1[i].name, value: array1[i].value + array2[j].value });
          found = true;
          break;
        }
      }
      if (!found) result.push(array1[i]);
    }
  
    for (let i = 0; i < array2.length; i++) {
      let found = false;
      for (let j = 0; j < array1.length; j++) {
        if (array2[i].name === array1[j].name) {
          found = true;
          break;
        }
      }
      if (!found) result.push(array2[i]);
    }
  
    return result;
  }