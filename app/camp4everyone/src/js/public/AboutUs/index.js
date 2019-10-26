import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import DavidImage from './DavidImage.jpeg';
import YenniImage from './YenniImage.jpeg';
import IsaacImage from './IsaacImage.jpg';
import { Typography } from '@material-ui/core';

export default function AboutUs() {
  return (
    <Grid container justify="space-around" className="AboutUs">
      {/*Title*/}
      <Typography item component="h2" variant="h2" className="h2">
        About Us
      </Typography>
      <Grid
        item
        container
        justify="space-around"
        component="main"
        className="AboutUs-Grid"
      >
        {/* David Cuentas */}
        <Card item className="OneOfUs-Card">
          <CardMedia className="Card-Image" image={DavidImage} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              David Cuentas
            </Typography>
            <Typography>Age: 21</Typography>
            <Typography>Universidad del Norte Student</Typography>
            <Typography>
              Working all day, partying all night (He doesn't sleep).
            </Typography>
          </CardContent>
        </Card>

        {/* Yennifer Herrera */}
        <Card item className="OneOfUs-Card">
          <CardMedia className="Card-Image" image={YenniImage} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Yennifer Herrera
            </Typography>
            <Typography>Age: 20</Typography>
            <Typography>Universidad del Norte Student</Typography>
            <Typography>
              She has more than a thousand likes on her Facebook profile
              picture.
            </Typography>
          </CardContent>
        </Card>

        {/* Isaac Palacio */}
        <Card item className="OneOfUs-Card">
          <CardMedia className="Card-Image" image={IsaacImage} />
          <CardContent>
            <Typography component="h5" variant="h5" className="h5">
              Isaac Palacio
            </Typography>
            <Typography>Age: 22</Typography>
            <Typography>Universidad del Norte Student</Typography>
            <Typography>Whith big dreams but an empty wallet.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
