import { Avatar, Box, Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { formatDollarAmount, formatNumber } from '../../../utils/numbers';
import { blue, green } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { NavLink } from "react-router-dom";

export type ExploreCardProps = {
  linkTarget: string,
  linkName: string,
  svgPath?: string,
  MetricIcon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

const ExploreCard = ({
  linkTarget,
  linkName,
  svgPath,
  MetricIcon,
}: ExploreCardProps) => {


  return (
    <IconButton
      component={NavLink}
      to={linkTarget}
      sx={{
        mr: 1,
        animationDuration: 2,
        borderRadius: 2,
        //color: blue[500],
        backgroundColor: "background.paper",
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        boxShadow: 3,
      }}

    >
      <Box display="flex" alignItems="center" alignContent="center" justifyContent='space-around'>
        <Box mr={1}>
          <Typography>Explore {linkName}</Typography>
        </Box>
        <Box mr={0.5}>
          {MetricIcon ?
          <Box mb={-0.5}>
            <MetricIcon fontSize='small'/>
            </Box>
          :
          <Avatar
            sx={{
              height: 20,
              width: 20
            }}
            src={svgPath ? svgPath : MetricIcon}
          />
          }
        </Box>
      </Box>
    </IconButton>


    // <Card
    // >
    //   <CardContent>
    //     <Grid
    //       container
    //       spacing={1}
    //       sx={{ justifyContent: 'space-between' }}
    //     >
    //       <Grid item>
    //         <Typography
    //           color="textSecondary"
    //           gutterBottom
    //           variant="h6"
    //         >
    //           {linkName}
    //         </Typography>
    //       </Grid>
    //       <Grid item>
    //       <CardActions>
    //           <Button component={NavLink} to={linkTarget} size="small">Explore</Button>
    //       </CardActions>
    //        <ArrowCircleRightIcon />
    //       </Grid>
    //     </Grid>
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         alignItems: 'center'
    //       }}
    //     >
    //     </Box>
    //   </CardContent>
    //     </Card>

  );
}
export default ExploreCard;