import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { green, orange } from '@mui/material/colors';
import { useActiveNetworkVersion, useSubgraphStatus } from '../../state/application/hooks'
import { getEtherscanLink } from '../../utils'
import { EthereumNetworkInfo } from '../../constants/networks'
import { Link, CircularProgress, Box, IconButton } from '@mui/material'


export default function Polling () {
  const theme = useTheme()
  const mode = theme.palette.mode;
  const [activeNetwork] = useActiveNetworkVersion()
  const [status] = useSubgraphStatus()
  const [isMounted, setIsMounted] = useState(true)
  const latestBlock = activeNetwork === EthereumNetworkInfo ? status.headBlock : status.syncedBlock

  useEffect(
    () => {
      const timer1 = setTimeout(() => setIsMounted(true), 1000)

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        setIsMounted(false)
        clearTimeout(timer1)
      }
    },
    [status] //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  )

  return (

    <Box display="flex" justifyContent="space-between" paddingY="20px">
      <IconButton
        sx={{
          mr: 1,
          animationDuration: 2,
          height: 20,
          borderRadius: 1,
          backgroundColor: "background.paper",
          boxShadow: 2,
        }}>

        <Link color={mode === 'dark' ? 'white' : 'black'} variant="caption" display="block" underline="none" target="_blank" rel="noopener noreferrer" href={latestBlock ? getEtherscanLink(latestBlock.toString(), 'block', activeNetwork) : ''}>
          Synced block: {isMounted ? latestBlock : ' '}
        </Link>
        <Box mr={0.5}></Box>
        <CircularProgress
          size={12}
          thickness={isMounted ? 22 : 10}
          variant={isMounted ? "determinate" : "indeterminate"}
          value={100}
          sx={{
            color: isMounted ? green[500] : orange[500]
          }}
        />
      </IconButton>
    </Box>

  )
}