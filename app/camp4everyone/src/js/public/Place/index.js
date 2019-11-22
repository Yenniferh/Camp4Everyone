import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { readPlace } from '../../services/firebase'
import { Redirect } from 'react-router-dom'

function GetInfo(nombre) {
    const [place, setPlace] = useState([]);
    useEffect(() => {
        readPlace(nombre).then(res => {
            setPlace(res[0]);
        });
    }, []);
    return place;
}

export default function Place(props) {
    if (props.location.state) {
        const info = GetInfo(props.location.state.name);

        return (
            <Grid
                container
                direction="column"
                justify="center"
                className="place-Container"
            >
                {info ? (
                    <Paper className="paper-Place">
                        <Grid item container className="first-Container" justify="center">
                            <img src={info.image1} className="imagen1" />
                            <Grid item container direction="row" className="info-Container" justify="center">
                                <Typography component="h3" variant="h3" className="place-Title" > {info.name}</Typography>
                                <Typography component="h5" variant="h5" className="place-Description" >{info.description}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" className="second-Container" justify="center">
                            <img src={info.image2} className="imagen2" />
                            <img src={info.image3} className="imagen3" />
                            <Grid item container direction="row" className="paper2" justify="center">
                                <Container className="place-details">
                                    <Typography component="h5" variant="h5">
                                        {info.address}
                                    </Typography>
                                    <Typography component="h5" variant="h5">
                                        ${info.price} USD per hour
                            </Typography>
                                    <Typography component="h5" variant="h5">
                                        {info.maxCap} people maximum.
                            </Typography>
                                </Container>
                                <Container className="place-action">
                                    <Typography component="h5" variant="h5">Hours:</Typography>
                                    <Typography component="h5" variant="h5">Total: $...</Typography>
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
                ) : ('Cargando')}
            </Grid >
        );

    } else {
        return <Redirect to='/NotFound' />
    }
}