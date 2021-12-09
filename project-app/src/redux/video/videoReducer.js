/** @format */

const initialState = {
	video: [],
	loading: true,
	loaded: false,
};

const videoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'VIDEO_SUCCESS':
			return {
				...state,
				loading: false,
				loaded: true,
				video: action.payload,
			};

		case 'VIDEO_FAILURE':
			return {
				...state,
				loading: true,
				loaded: false,
			};

		default:
			return state;
	}
};

export default videoReducer;
