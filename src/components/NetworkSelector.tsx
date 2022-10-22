import { FormControl, Select, MenuItem, Avatar, Divider } from "@mui/material"
import { Box } from "@mui/system"
import ArbitrumLogo from './../assets/svg/arbitrum.svg'
import EtherLogo from './../assets/svg/ethereum.svg'
import PolygonLogo from './../assets/svg/polygon.svg'

const networkId = 'ethereum';

export default function NetworkSelector() {

    return (
        <FormControl size="small" >
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
                value={networkId}
                //onChange={handleNetworkChange}
                inputProps={{
                    name: 'chainId',
                    id: 'chainId-native-simple',
                }}
            >
                <MenuItem disabled={true} dense={true}>Network selection:</MenuItem>
                <Divider/>
                <MenuItem value={'ethereum'} key="eth">
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
                <MenuItem value={'polygon'} key="poly">
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
                <MenuItem value={'arbitrum'} key="arb">
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
            </Select>
        </FormControl>
    );
}