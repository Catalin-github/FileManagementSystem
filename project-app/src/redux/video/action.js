/** @format */

export const findVideo = (data) => {
	return (dispatch) => {
		fetch('/dia-aplication/api/user/video?id=' + data, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('here images');

				dispatch(videoSuccess(res));
			})
			.catch((err) => {
				dispatch(videoFailure(err));
			});
	};
};

export const uploadVideo = (data) => {
	return (dispatch) => {
		fetch('/dia-aplication/api/user/video/upload?email=' + data.email, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data.data),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('here images');

				dispatch(videoSuccess(res));
			})
			.catch((err) => {
				dispatch(videoFailure(err));
			});
	};
};

export const removeVideo = (data) => {
	return (dispatch) => {
		fetch('/dia-aplication/api/user/remove/video?id=' + data, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('in remove response');
			})
			.catch((err) => {
				dispatch(videoFailure(err));
			});
	};
};


export const videoSuccess = (res) => {
	return {
		type: 'VIDEO_SUCCESS',
		payload: res,
	};
};

export const videoFailure = (err) => {
	return {
		type: 'VIDEO_FAILURE',
	};
};
