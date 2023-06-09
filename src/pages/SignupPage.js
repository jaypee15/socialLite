import { useState } from 'react';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import {  } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, IconButton, InputAdornment, TextField, } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';

import {v4 as uuidv4} from 'uuid';
//appwrite
import { account } from '../appwrite/appwriteConfig'; 


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
})

//signup
const signupUser = async(e) => {
  e.preventDefault()

  const promise = account.create(
    uuidv4(),
    user.email,
    user.password,
    user.name
  );

  promise.then(
    function(response) {
      //signup successfull
      console.log(response);
      navigate("/profile")

    },
    function(error) {
      // signup failed
      console.log(error)
    }
  )
}

  const [showPassword, setShowPassword] = useState(false);



  return (
    <>
      <Helmet>
        <title> Signup | SocialLite </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome 
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign Up to SocialLite
            </Typography>

           

            

           

            <Stack spacing={3}>
          <TextField name="name" label="User name"
          onChange={(e) => {
            setUser({
                ...user,
                name: e.target.value
            })
        }} />
        <TextField name="email" label="Email address" 
        onChange={(e) => {
          setUser({
              ...user,
              email: e.target.value
          })
      }}/>
        

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setUser({
                ...user,
                password: e.target.value
            })
        }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={signupUser}>
        SignUp
      </LoadingButton> 
      <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>
      <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <Link component={RouterLink} to="/signin">SignIn</Link>
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
      
    </>
  );
}
