import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { LoginPage } from '@pages/login';
import { TodoPage } from '@pages/todo';
import { CustomRoute } from '@root/components/CustomRoute';

const App = function () {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<CustomRoute routeType="public" redirectPath="/todo">
						<LoginPage />
					</CustomRoute>
				</Route>
				<Route path="/register"></Route>
				<Route path="/todo">
					<CustomRoute routeType="private" redirectPath="/login">
						<TodoPage />
					</CustomRoute>
				</Route>
				<Route path="/"></Route>
			</Switch>
		</Router>
	);
};

export { App };
