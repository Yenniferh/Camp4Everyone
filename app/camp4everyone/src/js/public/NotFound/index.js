import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotFoundLeft from "../../../images/not_found_60.svg";
import NotFoundRight from "../../../images/page_not_found.svg";

export default function NotFound() {
  return (
    <Grid container className="not-found">
      <Grid item sm={6} className="left-image">
        <img src={NotFoundLeft} alt="Ups"></img>
      </Grid>
      <Grid item sm={6} className="right-image">
        <img src={NotFoundRight} alt="A problem has happen"></img>
        <Typography variant="h4" component="p">
          Ups! what you are looking for has disappeared in the forest.
        </Typography>
        <Typography variant="body2" component="p" className="right-paragraph">
          But keep calm, you can view other places. Try to check our{" "}
          <Link to="/category">category section</Link>.
        </Typography>
      </Grid>
    </Grid>
  );
}
