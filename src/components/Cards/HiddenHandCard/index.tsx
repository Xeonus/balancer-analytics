import {Card, CardContent, CardMedia, Grid, Link, Typography} from '@mui/material';
import { styled } from '@mui/system';
import HHLogo from '../../../assets/png/hiddenHandLogo.png';
import OrbBg from '../../../assets/png/orbz.png';

const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    maxWidth: 500,
    padding: theme.spacing(2),
    boxShadow: "rgb(51, 65, 85) 0px 0px 0px 0.5px",
    pointerEvents: 'auto',
}));

const ContentContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between', // Add this line to distribute items evenly along the horizontal axis
    marginBottom: theme.spacing(2),

}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
}));

const Description = styled(Typography)(({ theme }) => ({

}));

const LogoImage = styled('img')({
    height: '80px',
    objectFit: 'contain',
    alignSelf: 'flex-end',
    backgroundImage: `url(${OrbBg})`,
    backgroundSize: 'cover',
});

const LogoContainer = styled(Grid)({
    display: 'flex',
    alignItems: 'flex-end',
});

const HiddenHandCard = () => {
    return (
        <StyledCard>
            <ContentContainer container>
                <Grid item xs={9}>
                    <Title variant="h5">HiddenHand</Title>
                    <Description variant="body1">
                        Explore a range of voting incentives available
                    </Description>
                </Grid>

                <LogoContainer item xs={3}>
                    <LogoImage src={HHLogo} alt="HiddenHand Logo" />
                </LogoContainer>

            </ContentContainer>
            <Link
                href="https://hiddenhand.finance/balancer"
                underline="none"
                target="_blank"
                rel="noopener noreferrer"
            >Go to HiddenHand to learn more</Link>
        </StyledCard>
    );
};

export default HiddenHandCard;
