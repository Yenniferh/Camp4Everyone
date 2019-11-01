import React from 'react';
import {changeEmail} from '../../services/firebase';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3a9679',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#3a9679',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: '#3a9679',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3a9679',
      },
    },
  },
})(TextField);
function Profile(props) {
  const [values, setValues] = React.useState({
    email: '',
  });

  const handleSubmit = evt => {
    evt.preventDefault();
    changeEmail(values.email,'test@test.com');
    console.log('sss');
  }
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <main>
      <h1>PROFILE</h1>
      <form onSubmit={handleSubmit} noValidate>
      <CssTextField
              required
              fullWidth
              label='Email'
              variant='outlined'
              id='email'
              type='email'
              name='email'
              inputProps={{ style: { color: 'black' } }}
              autoComplete='email'
              value={values.email}
              onChange={handleChange('email')}
            />
                        <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              style={{ marginTop: '0.8rem' }}
            >
SEND            </Button>
      </form>
    </main>
  );
}
export default Profile;
