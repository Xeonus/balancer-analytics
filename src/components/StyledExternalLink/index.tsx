import { NetworkInfo } from "../../constants/networks";
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from "@mui/material";
import { getEtherscanLink } from "../../utils";

interface StyledLinkProps {
    address: string,
    activeNetwork: NetworkInfo
}

export default function StyledExternalLink({address, activeNetwork} : StyledLinkProps) {

    const link = getEtherscanLink(address, 'address', activeNetwork);
 return (
    <Link target="_blank" href={link}><LaunchIcon sx={{height: '20px'}}/></Link>
 )
}