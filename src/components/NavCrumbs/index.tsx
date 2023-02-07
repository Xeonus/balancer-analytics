import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useActiveNetworkVersion } from '../../state/application/hooks';
import { networkPrefix } from '../../utils/networkPrefix';
import { NavLink } from 'react-router-dom';

export interface NavElement {
  name: string,
  link: string,
}

export interface NavCrumbProbs {
  crumbSet: NavElement[],
  destination: string,
}

//Alternative constructor: build crumbSet from useLoc and useActiveNetwork hooks

export default function NavCrumbs({ crumbSet, destination }: NavCrumbProbs) {

  const [activeNetwork] = useActiveNetworkVersion();
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {crumbSet.map(crumb =>
        <Link key={crumb.name} underline="hover" color="inherit" component={NavLink} to={networkPrefix(activeNetwork) + crumb.link}>
          {crumb.name}
        </Link>
      )}
      <Typography color="text.primary" sx={{
        overflow: 'auto',
        maxWidth: { xs: '250px', md: '900px' },
        textOverflow: 'ellipsis' 
      }}
      >{destination}</Typography>
    </Breadcrumbs>
  );
}
