/** @format */

export const findImages = (data) => {
	return (dispatch) => {
		fetch('/dia-aplication/api/user/image?id=' + data, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('here images');

				dispatch(imageSuccess(res));
			})
			.catch((err) => {
				dispatch(imageFailure(err));
			});
	};
};

export const uploadImages = (data) => {
	return (dispatch) => {
		fetch('/dia-aplication/api/user/image/upload?email=' + data.email, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data.data),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('here images');

				dispatch(imageSuccess(res));
			})
			.catch((err) => {
				dispatch(imageFailure(err));
			});
	};
};

export const removeImage = (data) => {
	return (dispatch) => {
		fetch('/dia-aplication/api/user/remove/image?id=' + data, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				console.log("in remove response")
			})
			.catch((err) => {
				dispatch(imageFailure(err));
			});
	};
};


 

export const imageSuccess = (res) => {
	return {
		type: 'IMAGE_SUCCESS',
		payload: res,
	};
};

export const imageFailure = () => {
	return {
		type: 'IMAGE_FAILURE',
	};
};
