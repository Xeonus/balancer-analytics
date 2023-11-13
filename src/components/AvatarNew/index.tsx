import { useTheme } from '@mui/material/styles'
import { Avatar, Box, Typography } from "@mui/material";
import { formatPercentageAmount } from '../../utils/numbers'

interface AvatarProps {
    text: string;
    size?: number;
}

export default function AvatarNew({ text, size = 24 }: AvatarProps) {

    const theme = useTheme();

    return (
        <Box display="flex" justifyContent='flex-start' >
            <Avatar
                key={text + Math.random() * 10}
                variant="rounded"
                sx={{
                    height: size,
                    width: 'auto',
                    fontSize: 10,
                    borderColor: theme.palette.mode === 'dark' ? 'rgb(30, 41, 59)' : 'gb(241, 245, 249)',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)',
                    color: theme.palette.mode === 'dark' ? 'white' : 'black',
                    borderRadius: '0.5rem',
                    marginLeft: '-0.5rem',
                }}
            >
                <Typography m={1} color={theme.palette.mode === 'dark' ? 'white' : 'black'} sx={{ fontWeight: 'bold' }} variant="caption">
                    {text}
                </Typography>
            </Avatar>
        </Box>
    )
}