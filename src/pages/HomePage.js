import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import {Container, Typography } from '@mui/material';
import Feed from '../components/feed/Feed';


// ----------------------------------------------------------------------

export default function HomePage() {
  

  return (
    <>
      <Helmet>
        <title> Home | SocialLite </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Feed
        </Typography>

        <Feed/>
        

        
      </Container>
    </>
  );
}
