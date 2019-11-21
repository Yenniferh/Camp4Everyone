import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CardMedia, Container, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import manhattan from './Manhattan Tower Center.jpg';
import romantic from './Romantic.jpg';
import adventure from './Adventure.jpg';
import { readPlace } from '../../services/firebase'

export default function Place() {
    let photo1 = React.createRef()
    let photo2 = React.createRef()
    let photo3 = React.createRef()
    let title = React.createRef()
    let description = readPlace("Twin Towers") + ""

    const handleClicPrueba = () => {
        Promise(description = readPlace("Twin Towers")).then(function (snapshot) {
            console.log(snapshot)
        });
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            className="place-Container"
        >
            <Paper className="paper-Place">
                <Grid item container direction="row" className="first-Container" justify="center">
                    <img src={manhattan} className="imagen1" />
                    <Grid item container direction="column" className="info-Container" justify="center">
                        <Typography component="h3" variant="h3" className="place-Title" >Manhattan Center</Typography>
                        <Typography className="place-Description" >{description}</Typography>
                    </Grid>
                </Grid>
                <Grid item container direction="row" className="second-Container" justify="center">
                    <img src={romantic} className="imagen2" />
                    <img src={adventure} className="imagen3" />
                    <Grid item container direction="row" className="paper2" justify="center">
                        <Container className="place-details">
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
                        <Container className="place-action">
                            <Typography component="h5" variant="h5">Hours:</Typography>
                            <Typography component="h5" variant="h5">Total: $100</Typography>
                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                style={{ width: '250px', marginTop: '0.8rem' }}
                                onClick={handleClicPrueba}
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