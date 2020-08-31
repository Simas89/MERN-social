import React from "react";
import "./css/App.css";
import { useHistory, useLocation } from "react-router-dom";

import myContext from "../context/account/myContext";
import socialContext from "../context/social/socialContext";
import postContext from "../context/post/postContext";

import Container from "./container/Container";
// import NotificationsContentBlock from "./social/NotificationsContentBlock";

import NtfNews from "./social/notifications/NtfNews";
import NtfPanel from "./social/notifications/NtfPanel";
import Wave from "./Wave";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faUsers,
	faCog,
	faRunning,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import useTimer from "../hooks/useTimer";

function App(props) {
	// override landings page body overflow hidden
	document.querySelector("body").style.overflow = "auto";

	const context = React.useContext(myContext);
	const contextSocial = React.useContext(socialContext);
	const contextPost = React.useContext(postContext);
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

	const history = useHistory();
	let location = useLocation();
	const resizeEvent = () => {
		setWindowWidth(window.innerWidth);
		// console.log("resizeEvent");
	};

	React.useEffect(() => {
		document.title = "Simas Zurauskas | App";
		// window.scrollTo(0, 0);
		window.addEventListener("resize", resizeEvent);
		return () => {
			window.removeEventListener("resize", resizeEvent);
		};
	}, []);
	const parseLines = (num) => {
		let arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(<div className={`box  col-${i}`} key={i}></div>);
		}
		return arr;
	};
	const randomNum = (num) => {
		const rand = Math.floor(Math.random() * (num - 0 + 1)) + 0;
		return rand;
	};

	const addClassShine = (num) => {
		const target = document.querySelector(`.col-${randomNum(num)}`);
		// target.classList.add("shine");
		try {
			target.style.opacity = 0.8;
			// console.log(target);
			setTimeout(() => (target.style.opacity = 0.2), randomNum(15) * 1000);
		} catch (error) {
			// console.log(error);
		}
	};

	useTimer(1, 1, (ticks) => {
		if (ticks === 60) {
			contextSocial.notificationsPull({ action: "REFRESH" });
		}
		randomNum(5) === 1 && addClassShine(parseInt(windowWidth / 40));
	});

	// useTimer(true, 3, (periods) => console.log("callback", periods));

	return (
		context.accountState.logged && (
			<React.Fragment>
				<div className='main'>
					<div className='top-bar'>
						<div className='top-bar-shader'>
							{parseLines(parseInt(windowWidth / 40))}
						</div>

						<div className='mask'></div>
						<div className='top-bar-content'>
							<div>
								<h1 className='h1-main'>
									{`Welcome back, ${context.accountState.user} `}
								</h1>
								<h1 className='h1-second'>
									{`Welcome back, ${context.accountState.user} `}
								</h1>
							</div>
							<div
								className='exit'
								onClick={() => {
									history.push("/");
								}}>
								<FontAwesomeIcon
									className='exit-icon'
									icon={faRunning}
									style={{ fontSize: "30px" }}
								/>
								<FontAwesomeIcon
									className='exit-icon'
									icon={faArrowRight}
									style={{ fontSize: "20px" }}
								/>
							</div>
							<div className='nav-links'>
								<div
									className='nav-links-box'
									onClick={() => {
										if (
											location.pathname.includes("app/post/") ||
											location.pathname.includes("app/users/")
										) {
											contextPost.resetPosts();
										}
										history.push("/app");
									}}>
									<FontAwesomeIcon
										className={`nav-links-icon ${
											location.pathname === "/app"
												? "nav-links-icon-path"
												: "nav-links-icon-hover"
										}`}
										icon={faHome}
									/>
									{/* <span>Home</span> */}
								</div>

								<div
									className='nav-links-box'
									onClick={() => history.push("/app/users")}>
									<FontAwesomeIcon
										className={`nav-links-icon ${
											location.pathname === "/app/users"
												? "nav-links-icon-path"
												: "nav-links-icon-hover"
										}`}
										icon={faUsers}
									/>
									{/* <span>Users</span> */}
								</div>

								<div
									className='nav-links-box'
									onClick={() => history.push("/app/account")}>
									<FontAwesomeIcon
										className={`nav-links-icon ${
											location.pathname === "/app/account"
												? "nav-links-icon-path"
												: "nav-links-icon-hover"
										}`}
										icon={faCog}
									/>
									{/* <span>Account</span> */}
								</div>
							</div>
						</div>
					</div>
					<Wave />

					<div className='App'>
						<NtfNews />
						{contextSocial.isNotificationOpen && <NtfPanel />}
						{/* {contextSocial.isNotificationOpen && <NotificationsContentBlock />} */}

						<Container {...props} />
					</div>
				</div>
			</React.Fragment>
		)
	);
}

export default App;
