import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { getPlaces } from '../../services/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Getplaces(category) {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    getPlaces(category).then(res => {
      console.log(res);
      setTimeout(() => {
        setPlaces(res);
      }, 2000);
    });
  }, []);
  return places;
}

export default function Category(prop) {
  const classes = useStyles();
  console.log(prop)
  const places = Getplaces(prop.location.state.name);
  
  return (
    <Grid
      container
      justifycontent='center'
      alignItems='center'
      component='main'
      spacing={4}
      className='category-container'
    >
      {/* Title */}
      <Typography item component="h3" variant="h3" className="h3 center">
        Adventure
      </Typography>

      {/* Location Card List*/}
      <Grid
        container
        justify="space-around"
        item
        spacing={40}
        className="Location-Cards"
      >
        <Card item className="Location-Card">
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

        <Card item className="Location-Card">
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

      {places ? (
        places.map(place => (
          <Grid item xs={12} sm={6} md={4} lg={3} className='places' key={place.name}>
            <Card className='location-card'>
              <CardMedia className='card-image' image={place.image1} />
              <CardContent>
                <Typography component='h5' variant='h5' className='h5'>
                  {place.name}
                </Typography>
                <Typography>${place.price} USD</Typography>
                <Typography>Tiempo: 3 days</Typography>
                <Typography>Calificacion: 5.0⋆ (20)</Typography>
              </CardContent>
              <CardActions>
                <Link className="link-button" to={{ pathname: '/Place', state: { name: place.name } }}><Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  className="book-button">
                  Book
                </Button></Link>
              </CardActions>
            </Card>
          </Grid>
        ))
      ) : (
          <div className={classes.root}>
            <CircularProgress color='secondary' size={80} />
          </div>
        )}
    </Grid>
  </Grid>
  );
}
