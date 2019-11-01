import React, { useState ,Fragment } from 'react'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { getCurrentUser, updatePhoto, ChangeName, ChangeEmail } from './../../services/firebase'

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
export default function Profile() {
  let photo = React.createRef()
  let uploadPhoto = React.createRef()
  let tooltip = React.createRef()
  let output = React.createRef()
  const [values, setValues] = React.useState({
    email: "",
    name:"",
  });
  const [reload, setReload] = useState(false);
  const handleClick = () => {
    photo.current.click()
  }

  const handleChange = ev => {
    console.log(photo)

    let input = ev.target
    let reader = new FileReader()

    reader.onload = function() {
      let dataURL = reader.result
      output.current.src = dataURL
    }
    reader.readAsDataURL(input.files[0])

    if (photo.current.value) {
      tooltip.current.innerHTML = photo.current.value.replace(/^.*\\/, '')
    } else {
      tooltip.current.innerHTML = 'No photo chosen, yet.'
    }
  }
  const handleClickEmail = () => {
    ChangeEmail(values.email);
    alert("Email Changed");
  }
  const handleClickName = () => {

    ChangeName(values.name);
    alert(values.name);
  }

  const handleChangeName = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChangeEmail = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleSubmitEmail = evt => {
    evt.preventDefault();
    ChangeEmail(values.email)
    setReload(true);

  }
   
  const handleSubmitName = evt => {
    evt.preventDefault();
    ChangeName(values.name)
    setReload(true);
    
  }
  return (
    <Fragment>
      {reload ? <Redirect to="/profile" /> : null}
      <Grid container className='profile'>
        <Grid item className='head'>
          <Container maxWidth='md' className='head-info'>
            <Avatar className='head-info_avatar'>RM</Avatar>
            <Typography variant='h4' component='h1' className='head-info_name'>
              Ryan Musk
            </Typography>
          </Container>
        </Grid>
        <Grid item className='info-details'>
          <Container maxWidth='md' className='details'>
            <input
              type='file'
              id='photo'
              accept='image/*'
              hidden
              ref={photo}
              onChange={handleChange}
            ></input>
            <Button
              type='button'
              variant='contained'
              color='secondary'
              size='large'
              id='upload-photo'
              ref={uploadPhoto}
              onClick={handleClick}
            >
              upload photo
            </Button>
            <Typography
              variant='body2'
              component='p'
              id='tooltip'
              ref={tooltip}
            >
              No photo chosen, yet.
            </Typography>
          </Container>
          <img id='output' ref={output}></img>
          <br></br>
          <form onSubmit={handleSubmitEmail} noValidate>
          <CssTextField
              required
              fullWidth
              label="Email"
              variant="outlined"
              id="email"
              type="email"
              name="email"
              inputProps={{ style: { color: "black" } }}
              autoComplete="email"
              value={values.email}
              onChange={handleChangeEmail("email")}
            />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: "0.8rem" }}
            >
              NEW EMAIL
            </Button>
          </form>
          <br></br>
          <form onSubmit={handleSubmitName} noValidate>
          <CssTextField
              required
              fullWidth
              label="name"
              variant="outlined"
              id="name"
              type="text"
              name="email"
              inputProps={{ style: { color: "black" } }}
              autoComplete="name"
              value={values.name}
              onChange={handleChangeName("name")}
            />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: "0.8rem" }}
            >
              NEW NAME
            </Button>
          </form>
        </Grid>        
      </Grid>
    </Fragment>
  )
}
