import { useEffect, useState } from "react";
import { TokenData } from "../data/balancer/balancerTypes";
import { ethers } from "ethers";
import ERC20_INTERFACE from "../constants/abis/erc20";

const collectorAddress = '0xce88686553686da562ce7cea497ce749da109f9f';
const mainnetProvider = new ethers.providers.InfuraProvider("homestead" ,'bd237506d816456797b7bede8375e021');

export function GetProtocolFeeTokenSet (formattedTokens: TokenData[]) {
        const [tokenData, setTokenData] = useState("");
        //Fetch Balancer Front-End Json containing incentives data:
        useEffect(() => {
            const fetchData = async () => {
                try {
                    for (let i= 0; i < 3; i++) {
                        const contract = new ethers.Contract(formattedTokens[i].address, ERC20_INTERFACE, mainnetProvider);
                        const tokenBalance = await contract.balanceOf(collectorAddress);
                        const decimals = await contract.decimals();
                        setTokenData(ethers.utils.formatEther(tokenBalance));
                        console.log("balance of", formattedTokens[i].address, " is ", Number(parseInt(tokenBalance) / (10 ** decimals)))
                    }
                    
                    //Find newest week and store it in global data state
                    
                } catch (error) {
                    console.log("error", error);
                }
            };
    
            fetchData();
        }, [formattedTokens.length]);
}

