import React, { Children, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from '@utils/log-status';

const CustomRoute = function (props) {
	const { routeType, redirectPath } = props;

	let currentStatus;
	if (isLoggedIn() === true) currentStatus = 'private';
	else currentStatus = 'public';

	if (routeType !== currentStatus) {
		return <Redirect to={{ pathname: redirectPath }} />;
	}

	return props.children;
};

export { CustomRoute };
