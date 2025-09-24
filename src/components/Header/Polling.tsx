import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { green, orange } from '@mui/material/colors';
import {useActiveNetworkVersion, useClients} from '../../state/application/hooks'
import { getEtherscanLink } from '../../utils'
import {EthereumNetworkInfo} from '../../constants/networks'
import { Link, CircularProgress, Box, IconButton } from '@mui/material'
import {useLatestBlock} from "../../data/blocks/useLatestBlock";


export default function Polling() {
    const theme = useTheme()
    const mode = theme.palette.mode;
    const [activeNetwork] = useActiveNetworkVersion()
    const { blockClient } = useClients();
    const [isMounted, setIsMounted] = useState(true)
    const { blockNumber, loading } = useLatestBlock(blockClient);
    const activeBlock = blockNumber
    useEffect(
        () => {
            const timer1 = setTimeout(() => setIsMounted(true), 1000)

            // this will clear Timeout when component unmount like in willComponentUnmount
            return () => {
                setIsMounted(false)
                clearTimeout(timer1)
            }
        },
        [loading] //useEffect will run only one time
        //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
    )

    return (

        <Box display="flex" alignItems="center" justifyContent="space-between" paddingY="20px">
            <IconButton
                sx={{
                    mr: 1,
                    animationDuration: 2,
                    height: 25,
                    borderRadius: 1,
                    backgroundColor: "background.paper",
                    boxShadow: 2,
                }}>
                <Box  display="flex" alignContent="center" justifyItems={"center"} justifyContent="center" alignItems="center" flexDirection={"row"}>
                    <Box>
                        <Link
                            color={mode === 'dark' ? 'white' : 'black'}
                            variant="caption" display="block"
                            underline="none" target="_blank"
                            rel="noopener noreferrer"
                            href={activeBlock ? getEtherscanLink(activeBlock.toString(), 'block', activeNetwork) : ''}>
                            Synced block: {isMounted ? activeBlock : ' '}
                        </Link>
                    </Box>
                    <Box ml={0.5} mb={1}>
                        <CircularProgress
                            size={10}
                            thickness={isMounted ? 22 : 10}
                            variant={isMounted ? "determinate" : "indeterminate"}
                            value={100}
                            sx={{
                                color: isMounted ? green[500] : orange[500]
                            }}
                        />
                    </Box>
                </Box>
            </IconButton>
        </Box>

    )
}
