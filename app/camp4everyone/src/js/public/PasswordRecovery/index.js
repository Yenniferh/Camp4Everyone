import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import CardActions from "@material-ui/core/CardActions";

export default function PasswordRecovery() {
  return (
    <Grid container justify="center" alignItems="center" className="fondo">
      <Card item className="recovery-card">
        <CardContent>
          <Typography component="h4" variant="h4" className="h4 center">
            Recover Password
          </Typography>
        </CardContent>

        <Input
          placeholder="Email"
          inputProps={{
            "aria-label": "description"
          }}
          className="input"
        />

        <CardActions>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            size="large"
            className="recover-button"
          >
            Recover
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
