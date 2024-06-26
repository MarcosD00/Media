// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SIGN_UP_USER = 'session/SIGN_UP_USER'

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const actionSignUp = (user) => {
	return {
		type: SIGN_UP_USER,
		user
	}
}

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (user) => async (dispatch) => {
	// const { username, first_name, last_name, email, password } = user
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(actionSignUp(data));
		return data;
	} else if (response.status < 500) {
		const errorData = await response.json();
		const errors = errorData.errors
		throw errors
	} else {
		throw new Error("An error occurred. Please try again.");
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			let newState = Object.assign({}, state);
			newState.user = action.payload;
			return newState;
		case SIGN_UP_USER:
			let ns = Object.assign({}, state);
			ns.user = action.payload;
			return ns;
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}