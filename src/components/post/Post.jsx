// import React, { useState, componentDidMount } from 'react';
// import {account} from '../../../appwrite/appwriteConfig';

// const Posts = () => {
//   const [posts, setPosts] = useState([]);

//   componentDidMount(() => {
//     const client = new appwrite.Client();

//     client
//       .database()
//       .ref('posts')
//       .list()
//       .then((response) => {
//         setPosts(response.data);
//       });
//   });

//   return (
//     <ul>
//       {posts.map((post) => (
//         <li key={post.id}>
//           <h2>{post.title}</h2>
//           <p>{post.content}</p>
//           <p>
//             Author: {post.author}
//             <br />
//             Created At: {post.createdAt}
//           </p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Posts;

export default function Posts(){
  return <h1>posts</h1>
}