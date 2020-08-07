const graphqlFetch = (query, callback) => {
	fetch("http://localhost:2000/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			query: `{
       ${query}
      }
     `,
		}),
	})
		.then((r) => r.json())
		.then((data) => {
			// console.log("ROOT: ", data);
			callback(data.data);
		});
};

export default graphqlFetch;
