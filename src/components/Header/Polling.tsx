import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import { green, orange } from '@mui/material/colors';
import { useActiveNetworkVersion, useSubgraphStatus } from '../../state/application/hooks'
import { getEtherscanLink } from '../../utils'
import { EthereumNetworkInfo } from '../../constants/networks'
import { Link, Typography, CircularProgress, Box, IconButton } from '@mui/material'
import { fontSize, fontWeight } from '@mui/system';


export default function Polling() {
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
    
    <Box display="flex" alignItems="center" alignContent="center">
      <IconButton
                    sx={{
                      mr: 1,
                      animationDuration: 2,
                      height: 30,
                      borderRadius: 2,
                      backgroundColor: "background.paper",
                      boxShadow: 2,
                    }}>
    <CircularProgress 
      size={12} 
      thickness={isMounted ? 22: 10}
      variant={isMounted ? "determinate": "indeterminate"}
      value={100}
      sx={{
        color: isMounted ? green[500] : orange[500]
      }}
      /> 
    <Link color={mode === 'dark'? 'white' : 'black'} variant="caption" display="block" underline="none" href={latestBlock ? getEtherscanLink(1, latestBlock.toString(), 'block', activeNetwork) : ''}>
          {latestBlock}
    </Link>
    </IconButton>
    </Box>

  )
}