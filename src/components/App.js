import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { LoginPage } from '@root/pages/login';
import { PrivateRoute } from '@components/PrivateRoute';

const App = function () {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/register"></Route>
				<PrivateRoute>
					<Route path="/todo"></Route>
				</PrivateRoute>
				<Route path="/"></Route>
			</Switch>
		</Router>
	);
};

export { App };
