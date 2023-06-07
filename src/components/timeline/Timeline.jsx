import React from 'react';

import Post from '../post/Post';
import CreatePostForm from '../create-post-form/CreatePostForm';

export default function Timeline({ posts: postsProp }) {
  const [posts, setPosts] = React.useState(postsProp);

  const onPostCreated = (newPost) => {
    setPosts((currentPosts) => [newPost, ...currentPosts]);
  };

  const onPostRemoved = (postToRemove) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.$id !== postToRemove.$id)
    );
  };

  const onLikePostCallback = (newPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.$id === newPost.$id) {
          return newPost;
        }
        return post;
      })
    );
  };

  const postsSortedByCreatedDate = posts.sort(function (a, b) {
    return new Date(b.$createdAt) - new Date(a.$createdAt);
  });

  return (
    <div className="w-1/2 border border-gray-600 h-auto  border-t-0">
      <div className="flex">
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl font-semibold text-white">Home</h2>
        </div>
        
      </div>

      <hr className="border-gray-600" />

      <CreatePostForm onPostCreated={onPostCreated} />

      <hr className="border-gray-800 border-2" />

      <div></div>

      {postsSortedByCreatedDate?.map((post) => (
        <Post
          onLikePostCallback={onLikePostCallback}
          onPostRemoved={onPostRemoved}
          key={post.$id}
          post={post}
        />
      ))}

      <hr className="border-gray-600" />
    </div>
  );
}