import jscookie from 'js-cookie';
import { axiosInstance } from '@utils/axios-instance';

const isLoggedIn = function () {
	if (jscookie.get('refreshToken') === undefined) {
		return false;
	}
	return true;
};

const logIn = function (email, password) {
	return new Promise((resolve, reject) => {
		axiosInstance({
			method: 'POST',
			url: '/user/login',
			maxRedirects: 0,
			data: {
				email: email,
				password: password,
			},
		})
			.then((res) => {
				console.log('logIn axios then'); // TODO: delete this logging
				const { firstName, lastName, email } = res.data.user;

				localStorage.setItem('firstName', firstName);
				localStorage.setItem('lastName', lastName);
				localStorage.setItem('email', email);
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

const logOut = function () {
	localStorage.removeItem('firstName');
	localStorage.removeItem('lastName');
	localStorage.removeItem('email');

	// clean up the refreshToken cookie
	jscookie.remove('accessToken');
	jscookie.remove('refreshToken');
};

export { isLoggedIn, logIn, logOut };
