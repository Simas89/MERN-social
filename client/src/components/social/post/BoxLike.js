import React from "react";
import "./css/BoxLike.css";
import { Icon } from "semantic-ui-react";
import myContext from "../../../context/account/myContext";
import postContext from "../../../context/post/postContext";
import graphqlFetch from "../../../functions/graphqlFetch";
import LikesBuble from "./LikesBuble";

const BoxLike = (props) => {
	const context = React.useContext(myContext);
	const contextPost = React.useContext(postContext);
	const [isPending, setIsPending] = React.useState(false);

	const onLikeClick = (user, id) => {
		setIsPending(true);
		if (
			!contextPost.state.posts[props.index].likesPack.likedByMe &&
			!isPending
		) {
			const query = `
				likePost(userName: "${user}", id: "${id}"){
					likes
						likedByMe
						approves{
							userName
							imgmicro
						}
				}
			`;
			graphqlFetch(query, (res) => {
				console.log(res);
				contextPost.updatePostLikes({
					likesPack: res.likePost,
					index: props.index,
				});
			});
		} else {
		}
	};

	return (
		<div className='box-like'>
			<div className='people'>
				{contextPost.state.posts[props.index].likesPack.approves.map(
					//eslint-disable-next-line
					(element, i) => {
						try {
							return (
								<LikesBuble
									zIndex={5 - i}
									imgmicro={element.imgmicro}
									userName={element.userName}
									key={i}
								/>
							);
						} catch (error) {}
					}
				)}
			</div>

			{contextPost.state.posts[props.index].likesPack.likes - 5 > 0
				? `+${contextPost.state.posts[props.index].likesPack.likes - 5}`
				: ""}
			<Icon
				onClick={() =>
					onLikeClick(
						context.accountState.user,
						contextPost.state.posts[props.index]._id
					)
				}
				name={
					contextPost.state.posts[props.index].likesPack.likedByMe
						? "star"
						: "star outline"
				}
				size='large'
			/>
		</div>
	);
};

export default BoxLike;
