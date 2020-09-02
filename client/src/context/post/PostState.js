import React from "react";
import postReducer from "./postReducer";
import postContext from "./postContext";
import graphqlFetch from "../../functions/graphqlFetch";

import {
	SET_POSTS,
	RESET_POSTS,
	EDIT_POST,
	DELETE_POST,
	UPDATE_LIKES,
	SEND_COMMENT,
	EDIT_COMMENT,
	DELETE_COMMENT,
} from "../types";

const PostState = (props) => {
	const initialState = { posts: [] };
	const [state, dispatch] = React.useReducer(postReducer, initialState);
	const [isLoading, setIsLoading] = React.useState(1);

	const randomNum = (num) => {
		const rand = Math.floor(Math.random() * (num - 0 + 1)) + 0;
		return rand;
	};

	const resetPosts = () => {
		dispatch({ type: RESET_POSTS });
	};

	const setPosts = (payload) => {
		// console.log(payload);
		const payloadScored = payload.map((post) => {
			const delta = Math.abs(post.timestamp - Date.now()) / 1000;
			const hours = Math.floor(delta / 3600);
			const score =
				post.comments.length +
				post.likesPack.approves.length -
				hours / 4 +
				randomNum(5);
			post = { ...post, score: score };
			return post;
		});

		// Most revelant
		payloadScored.sort((a, b) => {
			return a.score < b.score ? 1 : b.score < a.score ? -1 : 0;
		});

		// Latest
		// res.getPosts.sort((a, b) => {
		// 	return a.timestamp < b.timestamp
		// 		? 1
		// 		: b.timestamp < a.timestamp
		// 		? -1
		// 		: 0;
		// });

		dispatch({ type: SET_POSTS, payload: payloadScored });
	};

	const editPost = (payload) => {
		dispatch({ type: EDIT_POST, payload: payload });
	};

	const delPost = (data) => {
		dispatch({ type: DELETE_POST, payload: data.index });
		graphqlFetch(`delPost(_id: "${data._id}")`, (res) => {});
	};

	const updatePostLikes = (payload) => {
		dispatch({ type: UPDATE_LIKES, payload: payload });
	};

	const sendComment = (data, callback) => {
		// console.log(data);
		const query = `sendComment(userName: "${data.user}",
															comment: """${data.comment.trim()}""",
															postID: "${data.post._id}"){
			_id
			userName
			imgsmall{
				contentType
				data
			}
			textContent
			timestamp
			edited
		
		}`;

		graphqlFetch(query, (res) => {
			dispatch({
				type: SEND_COMMENT,
				payload: res.sendComment,
				index: data.post.index,
			});
			callback();
		});
	};

	const editComment = (data) => {
		dispatch({ type: EDIT_COMMENT, payload: data });
		graphqlFetch(
			`editComment(_id: "${data._id}", textContent: """${data.textContent}""")`,
			(res) => {
				console.log(res);
			}
		);
	};

	const delComment = (data) => {
		// console.log(data);
		// console.log("Target:", state.posts[data.postIndex].comments[data.index]);
		dispatch({ type: DELETE_COMMENT, payload: data });
		graphqlFetch(`delComment(_id: "${data._id}")`, (res) => {});
	};
	// console.log(state);
	console.log("Posts:", state.posts);

	return (
		<postContext.Provider
			value={{
				state,
				setPosts,
				resetPosts,
				updatePostLikes,
				editPost,
				delPost,
				sendComment,
				editComment,
				delComment,
				isLoading,
				setIsLoading,
			}}>
			{props.children}
		</postContext.Provider>
	);
};

export default PostState;
