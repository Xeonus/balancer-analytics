import { Avatar, IconButton, Typography, SvgIcon } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 75,
                height: 75,
                borderRadius: '50%',
                backgroundColor: "background.paper",
                backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                '&:hover': {
                    backgroundColor: "background.paper",
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                },
                boxShadow: 3,
                transition: 'all 0.3s ease',
            }}
        >
            {MetricIcon ? (
                <SvgIcon component={MetricIcon} sx={{ fontSize: 25 }} />
            ) : (
                <Avatar
                    src={svgPath}
                    sx={{ width: 25, height: 25 }} // Adjust based on your design preference
                />
            )}
            <Typography variant="caption" sx={{ mt: 1 }}>
                {linkName}
            </Typography>
        </IconButton>
    );
};

export default ExploreCard;
