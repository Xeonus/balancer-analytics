import { NetworkInfo } from "../../constants/networks";
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from "@mui/material";
import { getEtherscanLink } from "../../utils";

interface StyledLinkProps {
    address: string,
    type: 'transaction' | 'token' | 'address' | 'block' | 'debank',
    activeNetwork: NetworkInfo
}

export default function StyledExternalLink({address, type, activeNetwork} : StyledLinkProps) {
    let link = '';
    if (type === 'debank') {
        link = 'https://debank.com/profile/' + address
    } else {
        link = getEtherscanLink(address, type, activeNetwork);
    }
 return (
    <Link target="_blank" href={link}><LaunchIcon sx={{height: '20px'}}/></Link>
 )
}