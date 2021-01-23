import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginPage from '@root/pages/login';

const App = function () {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/register"></Route>
				<Route path="/todo"></Route>
				<Route path="/"></Route>
			</Switch>
		</Router>
	);
};

export { App };
