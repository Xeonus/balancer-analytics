import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ServiceProviderEntry } from '../../../types';

interface ServiceProviderCardProps {
    sp: ServiceProviderEntry
}

export default function ServiceProviderCard({ sp } : ServiceProviderCardProps) {

    const imgSource = require('../../../assets/png/' + sp.img_ref)
    return (
        <Card key={sp.name} sx={{ maxWidth: 345, boxShadow: 3}}>
            <CardMedia
                component="img"
                height="140"
                image={imgSource}
                alt="SP Image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {sp.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {sp.short_description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={sp.site_url} target="_blank" size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}