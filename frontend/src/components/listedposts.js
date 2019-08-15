import React from 'react';
import Post from './post';


function ListedPosts(props) {
  if (props.posts.toString() !== '') {
    return (
      <>
      { 
        props.posts.map((post) => 
        <Post key={ post.id } post={ post } />
        ) 
      }
      </>
    )
  }
  return (
    <div className="font-italic pb-4 mb-2 d-flex justify-content-center">
      Nothing has been posted yet.
    </div>
  )
}

export default ListedPosts;
