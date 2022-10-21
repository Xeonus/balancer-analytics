import { FormControl, Select, MenuItem } from "@mui/material"
import { Box } from "@mui/system"
import ReactRoundedImage from "react-rounded-image";
import ArbitrumLogo from './../assets/svg/arbitrum.svg'
import EtherLogo from './../assets/svg/ethereum.svg'
import PolygonLogo from './../assets/svg/polygon.svg'



<FormControl size="small">
<Select
    color="primary"
    labelId="networkSelectLabel"
    id="chainSelect"
    value={networkId}
    onChange={handleNetworkChange}
    inputProps={{
        name: 'chainId',
        id: 'chainId-native-simple',
    }}
>
    <MenuItem value={'ethereum'} key="eth">
        <Box display="flex" alignItems="center">
            <Box mr={0.5}>
                <ReactRoundedImage
                    image={EtherLogo}
                    imageWidth="20"
                    imageHeight="20"
                    roundedSize="0"
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
                <ReactRoundedImage
                    image={PolygonLogo}
                    imageWidth="20"
                    imageHeight="20"
                    roundedSize="0"
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
                <ReactRoundedImage
                    image={ArbitrumLogo}
                    imageWidth="20"
                    imageHeight="20"
                    roundedSize="0"
                />
            </Box>
            <Box>
                Arbitrum
            </Box>
        </Box>
    </MenuItem>
    <MenuItem value={'fantom'} key="ftm">
        <Box display="flex" alignItems="center">
            <Box mr={0.5}>
                <ReactRoundedImage
                    image={FantomLogo}
                    imageWidth="20"
                    imageHeight="20"
                    roundedSize="0"
                />
            </Box>
            <Box>
                Fantom
            </Box>
        </Box>
    </MenuItem>
    <MenuItem value={'optimism'} key="op">
        <Box display="flex" alignItems="center">
            <Box mr={0.5}>
                <ReactRoundedImage
                    image={OptimismLogo}
                    imageWidth="20"
                    imageHeight="20"
                    roundedSize="0"
                />
            </Box>
            <Box>
                Optimism
            </Box>
        </Box>
    </MenuItem>
</Select>
</FormControl>