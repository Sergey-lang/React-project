import React from 'react'
import s from './MyPosts.module.css'
import {Post} from '../Post/Post'
import {Field, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../../../utils/validators/validators'
import {Textarea} from '../../../u2-components/common/FormsControls/FormControls'

export const MyPosts = React.memo((props) => {
   let postsElements =
       props.posts.map((p, i) => <Post key={`${p.id}_${i}`} message={p.message} likesCount={p.likesCount}/>)

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
})

const maxLength10 = maxLengthCreator(10)

export const AddPost = (props) => {

   return (
       <form onSubmit={props.handleSubmit}>
          <div>
             <Field placeholder='Add post'
                    component={Textarea}
                    name='newPostText'
                    validate={[required, maxLength10]}
             />
          </div>
          <div>
             <button>Add post</button>
          </div>
       </form>
   )
}

const AddNewPostForm = reduxForm({form: 'dialogAddMessageForm'})(AddPost)
