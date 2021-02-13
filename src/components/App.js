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
					<LoginPage />
				</Route>
				<Route path="/register"></Route>
				<CustomRoute>
					<Route path="/todo">
						<TodoPage />
					</Route>
				</CustomRoute>
				<Route path="/"></Route>
			</Switch>
		</Router>
	);
};

export { App };
