import React from "react";
import "./css/LikesBubble.css";
import { useHistory } from "react-router-dom";

const LikesBuble = (props) => {
	const history = useHistory();
	const handleClick = () => {
		history.push(`/app/users/${props.userName}`);
	};
	return (
		<div
			onClick={handleClick}
			className='div-style'
			style={{ zIndex: props.zIndex }}>
			<img src={`data:"image/jpeg";base64,${props.imgmicro}`} alt={""}></img>
		</div>
	);
};

export default LikesBuble;
