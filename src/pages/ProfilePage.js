import { Helmet } from 'react-helmet-async';
import React, {useState, useEffect} from 'react'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate, Link} from 'react-router-dom'
import { Grid, Typography, Avatar, Breakpoints } from '@material-ui/core';


// ----------------------------------------------------------------------



export default function ProfilePage() {
  const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState()

    useEffect(() => {
      const getData = account.get()
      getData.then(
        function(response){
            setUserDetails(response)
            //console.log(userDetails);
        },
        function(error){
            console.log(error);
        }
      )
    }, [])

    const handleLogout = async () => {
        try {
            await account.deleteSession("current")
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const user = {
      name: 'Bard',
      username: '@bard',
      profile_image_url: 'https://example.com/bard.jpg',
      bio: 'I am a large language model from Google AI, trained on a massive dataset of text and code. I can generate text, translate languages, write different kinds of creative content, and answer your questions in an informative way. I am still under development, but I have learned to perform many kinds of tasks.',
      tweets: [
        {
          id: 1,
          text: 'I am a large language model from Google AI.',
          created_at: '2023-05-29T14:37:23.000Z',
        },
        {
          id: 2,
          text: 'I can generate text, translate languages, write different kinds of creative content, and answer your questions in an informative way.',
          created_at: '2023-05-29T14:37:23.000Z',
        },
      ],
      following_count: 100,
      followers_count: 1000,
    };
    


  return (
    <>
      <Helmet>
        <title> Profile | socialLite </title>
      </Helmet>

      
      {userDetails ? (
        <>
          <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
            <div>
              <p className="text-xl">Hello {userDetails.name}</p>
            </div>
            <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Avatar src={user.profile_image_url} />
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1">
            @{user.username}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1" gutterBottom>
            {user.bio}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">
                Tweets: {user.tweets_count}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Following: {user.following_count}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Followers: {user.followers_count}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {user.tweets.map((tweet) => (
              <Grid item xs={12}>
                <Typography variant="h6">
                  {tweet.text}
                </Typography>
                <Typography variant="body1">
                  {tweet.created_at}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
            <div>
              <button
                className="bg-red-400 text-white p-1 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          
        </>
      ) : (
        <p className="mt-4">
          Please Signin to see Profile{" "}
          <Link to="/signin">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Signin
            </span>
          </Link>
        </p>
      )}

      
    </>
  );
}
