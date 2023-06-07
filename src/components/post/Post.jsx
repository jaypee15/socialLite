import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import ReactTimeAgo from 'react-time-ago'


import { databases, functions } from '../../appwrite/appwriteConfig';



export default function Post({ post, onPostRemoved, onLikePostCallback }) {

  const onRemovePost = async () => {


    try {
      await databases.deleteDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        post.$id
      );
      onPostRemoved(post);
    } catch (error) {
      console.log(error)
    }
  };

  const onLikePost = async () => {
    try {
      
      await functions.createExecution(
        process.env.REACT_APP_LIKEPOSTBYID_FUNCTION,
        JSON.stringify({
          postId: post.$id,
          likes: (post.likes || 0) + 1,
        }),
        true
      );
      onLikePostCallback({ ...post, likes: (post.likes || 0) + 1 });
    } catch (error) {
      console.log(error);
    }
  };
// menu list composition 
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Card sx={{ maxWidth: 345, m: '1rem' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <div>
          <IconButton 
          aria-label="settings" 
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
            <MoreVertIcon />
          </IconButton>
          <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper sx={{backgroundColor: 'black'}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    
                  >
                    <MenuItem onClick={onRemovePost} sx={{ color: 'white', '&:hover': {backgroundColor: 'gray'} }}>Delete Post</MenuItem>
                    <MenuItem onClick={handleClose} sx={{ color: 'white', '&:hover': {backgroundColor: 'gray'} }}>Follow</MenuItem>
                    <MenuItem onClick={handleClose} sx={{ color: 'white', '&:hover': {backgroundColor: 'gray'} }}>Report Post</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>
        }
        title={post.username}
        subheader={<ReactTimeAgo date={Date.parse(post.$createdAt)} locale="en-US" timeStyle="twitter"/>}

        
      />
      {post.image && <CardMedia
        component="img"
        height="194"
        image={post.image}
        alt={post.text}
      />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLikePost}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

      </CardActions>
      
    </Card>
    
  );
}      





