import {useEffect, useState} from "react";
import {BalancerStakingGauges} from "./balancerTypes";

const useGetBalancerStakingGauges = (): BalancerStakingGauges[] => {
  const [gaugeData, setGaugeData] = useState<BalancerStakingGauges[]>([]);


  //
  const fetchVotingGauges = async () : Promise<BalancerStakingGauges[]> => {
    let result: BalancerStakingGauges[] = [];
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/src/data/voting-gauges.json"
      );
      const jsonData = await response.json();

      const networkName = jsonData.map((e: any) => {
        return e;
      });

      const poolIds = new Map();
      const noDupes = networkName.filter((e: any) => {
        if (e.isKilled === false) {
          const id = e.pool.id;
          poolIds.set(id, (poolIds.get(id) || 0) + 1);
          return true;
        }
        return false;
      });

      const maxTimestamp = new Map();
      noDupes.forEach((e: any) => {
        const id = e.pool.id;
        if (poolIds.get(id) > 1) {
          if (!maxTimestamp.has(id) || e.addedTimestamp > maxTimestamp.get(id)) {
            maxTimestamp.set(id, e.addedTimestamp);
          }
        }
      });

      result = noDupes.map((e: any) => {
        const id = e.pool.id;
        if (poolIds.get(id) > 1 && e.addedTimestamp === maxTimestamp.get(id)) {
          e.newTag = "NEW";
        } else {
          e.newTag = "";
        }
        return e;
      });

      return result;
    } catch (error) {
      console.error("Error fetching gauge data:", error);
    }

    //Filter testnets
    result = result.filter((gauge) => gauge.network !== '5');

    return result;
  };

  //Fetch voting gauges
  useEffect(() => {
    fetchVotingGauges().then(data => setGaugeData(data)).catch((error) => {
      console.error("Error fetching gauges:", error)
    });
  }, []);

  return gaugeData;

}

export default useGetBalancerStakingGauges;
