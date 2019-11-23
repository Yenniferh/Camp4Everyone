import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import romanticImage from './Romantic.jpg';
import auditoriumImage from './Auditorium.jpg';
import businessImage from './Business.jpg';
import adventureImage from './Adventure.jpg';

export default function CategoryNavigation() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="categorys-fondo"
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        className="most-checked-section"
      >
        <Typography component="h4" variant="h4" className="h4 center">
          Most Checked Categories
        </Typography>
        <Grid
          container
          justify="center"
          alignItems="center"
          className="category-cards"
        >
          <Card item className="category-card">
            <CardContent className="card-title">
              <Typography component="h5" variant="h5" className="h5">
                Romantic
              </Typography>
            </CardContent>
            <CardMedia image={romanticImage} className="card-image" />
          </Card>
          <Card item className="category-card">
            <CardContent>
              <Typography component="h5" variant="h5" className="h5">
                Auditorium
              </Typography>
            </CardContent>
            <CardMedia image={auditoriumImage} className="card-image" />
          </Card>
          <Card item className="category-card">
            <CardContent>
              <Typography component="h5" variant="h5" className="h5">
                Business
              </Typography>
            </CardContent>
            <CardMedia image={businessImage} className="card-image" />
          </Card>
          <Card item className="category-card">
            <CardContent>
              <Typography component="h5" variant="h5" className="h5">
                Adventure
              </Typography>
            </CardContent>
            <CardMedia image={adventureImage} className="card-image" />
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        alignItems="center"
        className="normal-section"
      >
        <Typography component="h4" variant="h4" className="h4 center">
          List
        </Typography>
        <Grid
          container
          justify="center"
          alignItems="center"
          className="category-cards"
        >
          <Grid
            container
            justify="center"
            alignItems="center"
            className="category-cards"
          >
            <Card item className="category-card">
              <CardContent className="card-title">
                <Typography component="h5" variant="h5" className="h5">
                  Romantic
                </Typography>
              </CardContent>
              <CardMedia image={romanticImage} className="card-image" />
            </Card>
            <Card item className="category-card">
              <CardContent>
                <Typography component="h5" variant="h5" className="h5">
                  Auditorium
                </Typography>
              </CardContent>
              <CardMedia image={auditoriumImage} className="card-image" />
            </Card>
            <Card item className="category-card">
              <CardContent>
                <Typography component="h5" variant="h5" className="h5">
                  Business
                </Typography>
              </CardContent>
              <CardMedia image={businessImage} className="card-image" />
            </Card>
            <Card item className="category-card">
              <CardContent>
                <Typography component="h5" variant="h5" className="h5">
                  Adventure
                </Typography>
              </CardContent>
              <CardMedia image={adventureImage} className="card-image" />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
