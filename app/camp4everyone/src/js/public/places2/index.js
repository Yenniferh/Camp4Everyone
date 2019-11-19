import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CardMedia, Container, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import manhattan from './Manhattan Tower Center.jpg';
import romantic from './Romantic.jpg';
import adventure from './Adventure.jpg';

export default function Places2() {
    return (
        <Grid
            container
            direction="collumn"
            justify="center"
            className="place-Container"
        >
            <Paper className="paper-Place">
                <Grid item container direction="row" className="first-Container" justify="center">
                    <img item src={manhattan} className="imagen1" />
                    <Grid item container direction="column" className="info-Container" justify="center">
                        <Typography component="h3" variant="h3" className="place-Title" >Manhattan Center</Typography>
                        <Typography className="place-Description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                    </Grid>
                </Grid>
                <Grid item container direction="row" className="second-Container" justify="center">
                    <img item src={romantic} className="imagen2" />
                    <img item src={adventure} className="imagen3" />
                    <Grid item container direction="row" className="paper2" justify="center">
                        <Container item className="place-details">
                            <Typography>
                                Business > Manhathan, USA
                            </Typography>
                            <Typography>
                                $250 USD per hour
                            </Typography>
                            <Typography>
                                40 people maximum.
                            </Typography>
                        </Container>
                        <Container item className="place-action">
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
                        </Container>
                    </Grid>
                </Grid>
            </Paper>

        </Grid >
    );
}