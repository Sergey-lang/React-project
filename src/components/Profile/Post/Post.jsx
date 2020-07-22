import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return <div className={s.item}>
        <img src="https://img.icons8.com/bubbles/100/000000/flag-person-male.png"/>
        <div>
            {props.message}
            <span> Like</span> {props.likesCount}
        </div>
    </div>

}

export default Post;

