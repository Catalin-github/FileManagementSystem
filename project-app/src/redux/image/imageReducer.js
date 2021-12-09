/** @format */

const initialState = {
	image: [],
	loading: true,
	loaded: false,
	
};

const imageReducer = (state = initialState, action) => {
	switch (action.type) {
  
		case "IMAGE_SUCCESS":
			return {
				...state,
				loading: false,
				loaded: true,
				 
				image: action.payload,
			};
	 
		case "IMAGE_FAILURE":
			return {
 				...state,  
				loading: true,  
				loaded: false,
			 };
		 
		default:
			return state;
	}
};

export default imageReducer;
