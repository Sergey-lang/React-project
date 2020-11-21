import React from 'react';
import s from './MyPosts.module.css';
import {Post} from '../Post/Post';
import {Field, reduxForm} from 'redux-form';

export const MyPosts = (props) => {
   let postsElements =
      props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

   let addNewPost = (value) => {
      props.addPost(value.newPostText)
   }

   return (
      <div className={s.postsBlock}>
         <h3>My posts</h3>
         <AddNewPostForm onSubmit={addNewPost}/>
         <div className={s.posts}>
            {postsElements}
         </div>
      </div>
   )
}

export const AddPost = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field placeholder='Add post'
                   component='textarea'
                   name='newPostText'
            />
         </div>
         <div>
            <button>Add post</button>
         </div>
      </form>
   )
}

const AddNewPostForm = reduxForm({form: 'dialogAddMessageForm'})(AddPost)
