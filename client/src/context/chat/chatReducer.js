import {
	ADD_TARGET,
	REMOVE_TARGET,
	SET_MESSAGE_INPUT,
	UPDATE_MESSAGES,
} from "../types";

export default (state, { type, payload }) => {
	switch (type) {
		case ADD_TARGET: {
			let newTargets = state.targets;

			let canInsert = 1;
			newTargets.forEach((element) => {
				if (element.name === payload) canInsert = 0;
			});

			if (canInsert)
				if (newTargets.length < 5) {
					newTargets.unshift({
						name: payload,
						input: "",
						msgData: [],
					});
				} else {
					newTargets.shift();
					newTargets.unshift({
						name: payload,
						input: "",
						msgData: [],
					});
				}
			return { ...state, targets: newTargets };
		}

		case REMOVE_TARGET: {
			let newTargets = state.targets;
			newTargets.splice(payload, 1);

			return { ...state, targets: newTargets };
		}

		case SET_MESSAGE_INPUT: {
			let newTargets = state.targets;
			newTargets[payload.index] = {
				...newTargets[payload.index],
				input: payload.value,
			};

			return { ...state, targets: newTargets };
		}

		case UPDATE_MESSAGES: {
			let newTargets = state.targets;

			// console.log(newTargets);
			const index = newTargets
				.map((e) => e.name)
				.indexOf(payload.messages.target);
			// console.log("index:", index, payload.messages.target);

			newTargets[index].msgData = payload.messages.msg;

			return { ...state, targets: newTargets };
		}

		default:
			return state;
	}
};
