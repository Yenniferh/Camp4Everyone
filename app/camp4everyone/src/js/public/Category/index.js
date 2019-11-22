import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';
import imagen1 from './Imagen1.jpg';
import imagen2 from './Imagen2.jpg';
import imagen3 from './Imagen3.jpg';
import imagen4 from './Imagen4.jpg';

export default function Category() {


  return (
    <Grid
      container
      justify="space-around"
      component="main"
      spacing={10}
      className="Category"
    >
      {/* Title */}
      <Typography component="h3" variant="h3" className="h3 center">
        Aventura
      </Typography>

      {/* Location Card List*/}
      <Grid
        container
        justify="space-around"
        item
        spacing={10}
        className="Location-Cards"
        id="list_of_places"
      >
        <Card className="Location-Card">
          <CardMedia className="Card-Image" image={imagen1} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Ockla Forest
            </Typography>
            <Typography>$120 USD</Typography>
            <Typography>Tiempo: 3 days</Typography>
            <Typography>Calificacion: 5.0⋆ (20)</Typography>
          </CardContent>
          <CardActions>
            <Link to='/Place name="Twin Towers"'><Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              className="Book-Button"
            >
              Book
            </Button></Link>
          </CardActions>
        </Card>

        <Card className="Location-Card">
          <CardMedia className="Card-Image" image={imagen2} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Canyon Camp
            </Typography>
            <Typography>$120 USD</Typography>
            <Typography>Tiempo: 3 days</Typography>
            <Typography>Calificacion: 5.0⋆ (20)</Typography>
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              className="Book-Button"
            >
              Book
            </Button>
          </CardActions>
        </Card>

        <Card className="Location-Card">
          <CardMedia className="Card-Image" image={imagen3} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Frozen Forest
            </Typography>
            <Typography>$120 USD</Typography>
            <Typography>Tiempo: 3 days</Typography>
            <Typography>Calificacion: 5.0⋆ (20)</Typography>
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              className="Book-Button"
            >
              Book
            </Button>
          </CardActions>
        </Card>

        <Card className="Location-Card">
          <CardMedia className="Card-Image" image={imagen4} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Lucky River
            </Typography>
            <Typography>$120 USD</Typography>
            <Typography>Tiempo: 3 days</Typography>
            <Typography>Calificacion: 5.0⋆ (20)</Typography>
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              className="Book-Button"
            >
              Book
            </Button>
          </CardActions>
        </Card>

        <Card className="Location-Card">
          <CardMedia className="Card-Image" image={imagen1} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Ockla Forest
            </Typography>
            <Typography>$120 USD</Typography>
            <Typography>Tiempo: 3 days</Typography>
            <Typography>Calificacion: 5.0⋆ (20)</Typography>
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              className="Book-Button"
            >
              Book
            </Button>
          </CardActions>
        </Card>

        <Card className="Location-Card">
          <CardMedia className="Card-Image" image={imagen2} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Canyon Camp
            </Typography>
            <Typography>$120 USD</Typography>
            <Typography>Tiempo: 3 days</Typography>
            <Typography>Calificacion: 5.0⋆ (20)</Typography>
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              className="Book-Button"
            >
              Book
            </Button>
          </CardActions>
        </Card>

        <Card className="Location-Card">
          <CardMedia className="Card-Image" image={imagen3} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Frozen Forest
            </Typography>
            <Typography>$120 USD</Typography>
            <Typography>Tiempo: 3 days</Typography>
            <Typography>Calificacion: 5.0⋆ (20)</Typography>
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              className="Book-Button"
            >
              Book
            </Button>
          </CardActions>
        </Card>

        <Card className="Location-Card">
          <CardMedia className="Card-Image" image={imagen4} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Lucky River
            </Typography>
            <Typography>$120 USD</Typography>
            <Typography>Tiempo: 3 days</Typography>
            <Typography>Calificacion: 5.0⋆ (20)</Typography>
          </CardContent>
          <CardActions>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              className="Book-Button"
            >
              Book
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );


}

