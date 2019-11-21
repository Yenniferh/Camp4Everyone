import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import businessImage from './Manhattan Tower Center.jpg';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export default function PlacePopUp() {
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className="Place"
        >
            <Card item className="place-card">
                <CardMedia
                    component="img"
                    image={businessImage}
                    className="card-image"
                />
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Typography item component="h3" variant="h3">Manhattan Center</Typography>
                        <Typography item className="descripcion-place">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Typography>
                        <Grid
                            item
                            container
                            direction="column"
                            alignItems="center"
                        >
                            <Typography item component="h5" variant="h5">Hours:</Typography>
                            <Typography item component="h5" variant="h5">Total: $100</Typography>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                style={{ width: '250px', marginTop: '0.8rem' }}
                            >
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}