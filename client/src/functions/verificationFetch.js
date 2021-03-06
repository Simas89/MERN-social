const verificationFetch = async (callback) => {
	// let submitMsg = document.querySelector(".submitMsg");
	const email = document.querySelector(".emailInput").value;
	// eslint-disable-next-line
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		await fetch("/verification", {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				email: email,
				"x-auth-token": sessionStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((data) => callback(data))
			.catch((err) => {
				console.log(err);
				callback({ status: "Server error", pass: 0 });
			});
	} else callback({ status: "Please enter valid email address", pass: 0 });
};

export default verificationFetch;
