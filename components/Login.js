import { Button, Grid } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const Login = ({type, color}) => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
  }
  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
          <h1>TODO APP</h1>
          <h2> SIGN IN TO TODO APP </h2>
          <Button variant='contained' startIcon={<GoogleIcon/ >} onClick={loginWithGoogle}> SIGN IN GOOGLE</Button>

    </Grid>
  )
}

export default Login