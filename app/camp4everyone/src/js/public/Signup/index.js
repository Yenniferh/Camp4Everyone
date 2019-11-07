import React from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import { Link, Redirect } from "react-router-dom";
import { SnackbarContentWrapper } from "../../utils/SnackbarContentWrapper";
import Loading from "./../../utils/Loading";
import { signup, addUser } from "./../../services/firebase";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#3a9679"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#3a9679"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "#3a9679"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3a9679"
      }
    }
  }
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function Signup(props) {
  const classes = useStyles();

  const [variant, setVariant] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [toHome, setToHome] = React.useState(false);

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (
      values.name &&
      values.email &&
      values.password &&
      values.confirmPassword
    ) {
      if (values.password === values.confirmPassword) {
        setLoading(true);
        signup(values.email, values.password)
          .then(user => {
            setVariant("success");
            setMessage("Cuenta creada exitosamente");
            setOpen(true);
            setTimeout(() => {
              sessionStorage.setItem("user", user.user.uid);
              addUser(values.name, values.email);
              setLoading(false);
              setToHome(true);
              props.setAuthentication(true);
            }, 2000);
          })
          .catch(err => {
            setTimeout(() => {
              setVariant("error");
              setMessage("Datos inválidos");
              setOpen(true);
              values.password = "";
              values.confirmPassword = "";
              setLoading(false);
            }, 2000);
          });
      } else {
        setVariant("error");
        setMessage("Las contraseñas no coinciden");
        setOpen(true);
        values.password = "";
        values.confirmPassword = "";
      }
    } else {
      setVariant("error");
      setMessage("Digite todos los campos");
      setOpen(true);
      values.password = "";
      values.confirmPassword = "";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="div" className="login-container">
      <Container
        component="main"
        maxWidth="xs"
        className="login"
        color="primary"
      >
        {loading && <Loading />}
        {toHome ? <Redirect to="/home" /> : null}
        <form className={classes.root} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography component="h1" variant="h5">
                Create your account in Camp4Everyone
              </Typography>
            </Grid>
            <CssTextField
              className={classes.margin}
              required
              fullWidth
              label="Name"
              variant="outlined"
              id="name"
              type="name"
              name="name"
              inputProps={{ style: { color: "white" } }}
              autoComplete="name"
              value={values.name}
              onChange={handleChange("name")}
            />
            <CssTextField
              className={classes.margin}
              required
              fullWidth
              label="Email"
              variant="outlined"
              id="email"
              type="email"
              name="email"
              inputProps={{ style: { color: "white" } }}
              autoComplete="email"
              value={values.email}
              onChange={handleChange("email")}
            />
            <CssTextField
              className={classes.margin}
              required
              fullWidth
              label="Password"
              variant="outlined"
              id="password"
              type="password"
              name="password"
              inputProps={{ style: { color: "white" } }}
              autoComplete="password"
              value={values.password}
              onChange={handleChange("password")}
            />
            <CssTextField
              className={classes.margin}
              required
              fullWidth
              label="Confirm password"
              variant="outlined"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              inputProps={{ style: { color: "white" } }}
              autoComplete="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
          </Grid>
          <Grid item xs={12} style={{ paddingTop: 1 + "rem" }}>
            <Typography>
              By clicking Sign up you are accepting our{" "}
              <Link to="/termsandconditions">Terms and Conditions</Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: "0.8rem" }}
            >
              Sign up
            </Button>
          </Grid>
        </form>
      </Container>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    </Container>
  );
}
