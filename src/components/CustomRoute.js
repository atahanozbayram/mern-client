import React, { Children, useState } from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'js-cookie';

const CustomRoute = function (props) {
	if (cookie.get('refreshToken') === undefined) {
		return <Redirect to={{ pathname: '/login' }} />;
	}

	return props.children;
};

export { CustomRoute };
