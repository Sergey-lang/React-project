import React from 'react';
import s from './MyPosts.module.css';
import {Post} from '../Post/Post';

export const MyPosts = (props) => {
   let postsElements =
      props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

   let newPostElement = React.createRef();

   let onAddPost = () => {
      props.addPost()
   }

   let onPostChange = () => {
      let text = newPostElement.current.value;
      props.updateNewPostText(text);
   }

   return (
      <div className={s.postsBlock}>
         <h3>My posts</h3>
         <div>
            <div>
               <textarea onChange={onPostChange}
                         placeholder='Add post'
                         cols='45'
                         rows='5'
                         ref={newPostElement}
                         value={props.newPostText}/>
            </div>
            <div>
               <button onClick={onAddPost} className={s.add_post}>Add post</button>
            </div>
         </div>
         <div className={s.posts}>
            {postsElements}
         </div>
      </div>
   )
}


