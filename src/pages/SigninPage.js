import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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

export default function SigninPage() {
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
})

//signin
  const signinUser = async (e) => {
    e.preventDefault()
    try{
      await account.createEmailSession(user.email, user.password)
      navigate("/home/profile")
    } catch (error) {
      console.log(error);
    }
  }



  const [showPassword, setShowPassword] = useState(false);


  return (
    <>
      <Helmet>
        <title> Login | SocialLite </title>
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
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign In to SocialLite
            </Typography>

           

            

           

            <Stack spacing={3}>
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={signinUser}>
        SignIn
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
              Don't have an account? {''}
              <Link component={RouterLink} to="/signup">SignUp</Link>
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
