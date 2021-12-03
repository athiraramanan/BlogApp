import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceHolder';

export const fetchPosts = () => async dispatch => {
	const responce = await jsonPlaceHolder.get('/posts');
	dispatch ({type: 'FETCH_POSTS', payload: responce.data});
}

export const fetchUsers = (id) => async dispatch => {
	const responce = await jsonPlaceHolder.get(`/users/${id}`) 
	dispatch ({type: 'FETCH_USER', payload: responce.data})
}

export const fetchPostsandUsers =  () => async (dispatch, getState) =>{
		await dispatch(fetchPosts());
		_.chain(getState().posts)
			.map('userId')
			.uniq()
			.forEach(id => fetchUsers(id))
			.value()
} 