import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material';


export default function Tokens() {

    const theme = useTheme();

    return (
        <Typography>Loaded TOKEN Page</Typography>
    );
}