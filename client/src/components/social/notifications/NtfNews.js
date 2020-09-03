import React from "react";
import "./css/NtfNews.css";
import socialContext from "../../../context/social/socialContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NtfNews = () => {
	const contextSocial = React.useContext(socialContext);

	const handleClick = () => {
		if (contextSocial.isNotificationOpen) {
			contextSocial.notificationBarOff();
			contextSocial.notificationsPaginationSet(1);
		} else {
			contextSocial.notificationsPull({ action: "REFRESH" });
			contextSocial.notificationBarOn();
		}
	};

	// console.log(contextSocial);

	return (
		<div className='ntf-news' onClick={handleClick}>
			<div
				className={`${
					contextSocial.notificationUnread ? "counter red" : "counter"
				}`}>
				<div>
					{contextSocial.notificationUnread
						? contextSocial.notificationUnread
						: contextSocial.notificationRead}
				</div>
			</div>
			<div className='ntf-news-icon'>
				<FontAwesomeIcon icon={faBell} style={{ fontSize: "22px" }} />
			</div>
		</div>
	);
};

export default NtfNews;
