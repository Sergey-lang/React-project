import {addPostActionCreator, deletePostAC, profileReducer} from '../profile-reducer';
import expect from 'expect';

let startState;
beforeEach(() => {
   startState = {
      posts: [
         {id: 1, message: 'Hello I am props 1', likeCount: 5},
         {id: 2, message: 'Hello I am props 2', likeCount: 10},
         {id: 3, message: 'Hello I am props 3', likeCount: 15},
         {id: 4, message: 'Hello I am props 4', likeCount: 20},
      ],
   }
})

test('add new post at wall', () => {

   const postMessageText = 'new test text with id 5'

   const endState = profileReducer(startState, addPostActionCreator(postMessageText))
   expect(endState.posts.length).toBe(5)
});

test('message of new post should be ', () => {

   const postMessageText = 'new test text 99'

   const endState = profileReducer(startState, addPostActionCreator(postMessageText))
   expect(endState.posts.length).toBe(5)
   expect(endState.posts[0].message).toBe('new test text 99')
});

test('post should be deleted ', () => {

   const action = deletePostAC(3)

   const endState = profileReducer(startState, action)
   expect(endState.posts.length).toBe(3)
   expect(endState.posts[2].message).toBe('Hello I am props 4')
});

test(`after deleting post length shouldn't be decrement if id is incorrect`, () => {

   const action = deletePostAC(1000)

   const endState = profileReducer(startState, action)
   expect(endState.posts.length).toBe(4)
});

