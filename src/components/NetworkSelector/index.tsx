
import { FormControl, Select, MenuItem, Avatar, Divider, SelectChangeEvent } from "@mui/material"
import { Box } from "@mui/system"
import {
    ArbitrumNetworkInfo,
    EthereumNetworkInfo,
    GnosisNetworkInfo, NetworkInfo,
    PolygonNetworkInfo,
    PolygonZkEVMNetworkInfo,
    AvalancheNetworkInfo
} from "../../constants/networks"
import { useActiveNetworkVersion } from "../../state/application/hooks"
import ArbitrumLogo from '../../assets/svg/arbitrum.svg'
import EtherLogo from '../../assets/svg/ethereum.svg'
import PolygonLogo from '../../assets/svg/polygon.svg'
import GnosisLogo from '../../assets/svg/gnosis.svg'
import PolygonZkevmLogo from '../../assets/svg/zkevm.svg'
import AvalancheLogo from '../../assets/svg/avalancheLogo.svg'
import {useLocation, useNavigate} from "react-router-dom";

const updatePathForNetwork = (network: NetworkInfo, currentPath: string) => {
    const pathParts = currentPath.split('/');
    console.log("pathParts", pathParts)
    let newPath;
    if (network === EthereumNetworkInfo) {
        newPath = `/${pathParts[pathParts.length - 1]}`;
    } else if (pathParts.length <= 2 && pathParts[pathParts.length - 1] === '') {
        newPath = `/${network.route.toLowerCase()}/chain`;
    } else {
        newPath = `/${network.route.toLowerCase()}/${pathParts[pathParts.length - 1]}`;
    }

    return newPath;
};

export default function NetworkSelector() {

    const [activeNetwork, update] = useActiveNetworkVersion();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNetworkChange = (evt: SelectChangeEvent) => {
        const chainId = evt.target.value as string;
        if (chainId === EthereumNetworkInfo.chainId) {
            update(EthereumNetworkInfo)
            const newPath = updatePathForNetwork(EthereumNetworkInfo, location.pathname)
            navigate(newPath)
        } else if (chainId === PolygonNetworkInfo.chainId) {
            update(PolygonNetworkInfo)
            const newPath = updatePathForNetwork(PolygonNetworkInfo, location.pathname)
            navigate(newPath)
        } else if (chainId === ArbitrumNetworkInfo.chainId) {
            update(ArbitrumNetworkInfo)
            const newPath = updatePathForNetwork(ArbitrumNetworkInfo, location.pathname)
            navigate(newPath)
        } else if (chainId === GnosisNetworkInfo.chainId) {
            update(GnosisNetworkInfo)
            const newPath = updatePathForNetwork(GnosisNetworkInfo, location.pathname)
            navigate(newPath)
        } else if (chainId === PolygonZkEVMNetworkInfo.chainId) {
            update(PolygonZkEVMNetworkInfo)
            const newPath = updatePathForNetwork(PolygonZkEVMNetworkInfo, location.pathname)
            navigate(newPath)
        } else if (chainId === AvalancheNetworkInfo.chainId) {
            update(AvalancheNetworkInfo)
            const newPath = updatePathForNetwork(AvalancheNetworkInfo, location.pathname)
            navigate(newPath)
        }

    };

    return (
        <FormControl size="small">
            <Select
                sx={{
                    backgroundColor: "background.paper",
                    boxShadow: 2,
                    borderRadius: 2,
                    borderColor: 0,
                }}
                color="primary"
                labelId="networkSelectLabel"
                id="chainSelect"
                onChange={handleNetworkChange}
                value={activeNetwork.chainId ? activeNetwork.chainId : ' '}
                inputProps={{
                    name: 'chainId',
                    id: 'chainId-native-simple',
                }}
            >
                <MenuItem disabled={true} dense={true}>Network selection:</MenuItem>
                <Divider/>
                <MenuItem value={EthereumNetworkInfo.chainId} key="eth">
                    <Box display="flex" alignItems="center">
                        <Box mr={0.5}>
                            <Avatar
                                sx={{
                                    height: 20,
                                    width: 20
                                }}
                                src={EtherLogo}
                            />
                        </Box>
                        <Box>
                            Ethereum
                        </Box>
                    </Box>
                </MenuItem>
                <MenuItem value={PolygonNetworkInfo.chainId} key="poly">
                    <Box display="flex" alignItems="center">
                        <Box mr={0.5}>
                            <Avatar
                                sx={{
                                    height: 20,
                                    width: 20
                                }}
                                src={PolygonLogo}
                            />
                        </Box>
                        <Box>
                            Polygon
                        </Box>
                    </Box>
                </MenuItem>
                <MenuItem value={PolygonZkEVMNetworkInfo.chainId} key="zkevm">
                    <Box display="flex" alignItems="center">
                        <Box mr={0.5}>
                            <Avatar
                                sx={{
                                    height: 20,
                                    width: 20
                                }}
                                src={PolygonZkevmLogo}
                            />
                        </Box>
                        <Box>
                            Polygon zkEVM
                        </Box>
                    </Box>
                </MenuItem>
                <MenuItem value={ArbitrumNetworkInfo.chainId} key="arb">
                    <Box display="flex" alignItems="center">
                        <Box mr={0.5}>
                            <Avatar
                                sx={{
                                    height: 20,
                                    width: 20
                                }}
                                src={ArbitrumLogo}
                            />
                        </Box>
                        <Box>
                            Arbitrum
                        </Box>
                    </Box>
                </MenuItem>
                <MenuItem value={GnosisNetworkInfo.chainId} key="gnosis">
                    <Box display="flex" alignItems="center">
                        <Box mr={0.5}>
                            <Avatar
                                sx={{
                                    height: 20,
                                    width: 20
                                }}
                                src={GnosisLogo}
                            />
                        </Box>
                        <Box>
                            Gnosis
                        </Box>
                    </Box>
                </MenuItem>
                <MenuItem value={AvalancheNetworkInfo.chainId} key="avalanche">
                    <Box display="flex" alignItems="center">
                        <Box mr={0.5}>
                            <Avatar
                                sx={{
                                    height: 20,
                                    width: 20
                                }}
                                src={AvalancheLogo}
                            />
                        </Box>
                        <Box>
                            Avalanche
                        </Box>
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}
