import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { databases, id, storage } from '../../appwrite/appwriteConfig';
import useUser from '../../hooks/useUser';

import './create-post-form.css';

export default function CreatePostForm({ onPostCreated }) {
  const { currentAccount } = useUser();

  const [postForm, setPostForm] = React.useState({
    text: '',
    image: null,
  });

  const onFileChange = (event) => {
    setPostForm((currentPostForm) => ({
      ...currentPostForm,
      image: event.target.files[0],
    }));
  };

  const onChangeInput = (event) => {
    const {
      target: { name, value },
    } = event;
    setPostForm((currentPostForm) => ({ ...currentPostForm, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      let downloadUrl = '';
      if (postForm.image) {
        const file = postForm.image;
        const fileId = id.unique();
        await storage.createFile(process.env.REACT_APP_BUCKET_ID, fileId, file);
        downloadUrl = await storage.getFileDownloadUrl(fileId);
      }

        if (!downloadUrl === '') {
      return;
    }

      const post = await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        id.unique(),
        {
          useremail: currentAccount.email,
          username: currentAccount.name,
          text: postForm.text,
          image: downloadUrl,
        }
      );
      setPostForm({ text: '', image: null });
      onPostCreated(post);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField
            fullWidth
            label="What's on your mind?"
            id="text"
            onChange={onChangeInput}
            value={postForm.text}
            name="text"
            inputProps={{ maxLength: 280 }}
          />
        </Box>
      </div>

      <div>
        
        <input type="file" name="image" id="image" accept="image/*"onChange={onFileChange} label="add image" placeholder="add image" />
      </div>

      <div className="post-button">
        <Button type="submit" variant="contained">
          Post
        </Button>
      </div>
    </form>
  );
}



