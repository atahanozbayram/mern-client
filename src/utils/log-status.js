import cookie from 'js-cookie';

const isLoggedIn = function () {
	if (cookie.get('refreshToken') === undefined) {
		return false;
	}
	return true;
};

export { isLoggedIn };
