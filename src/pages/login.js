import React from 'react';
import { PageHeader } from '@components/PageHeader';

const LoginForm = function (props) {
	return (
		<div>
			<PageHeader title="Login" />
			<div>
				<form>
					<div>
						<div>
							<label>E-mail:</label>
						</div>
						<input type="text" name="email" autoComplete="off" />
					</div>
					<div>
						<div>
							<label>Password:</label>
						</div>
						<input type="password" name="password" autoComplete="off" />
					</div>
					<div>
						<button>Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const LoginPage = function (props) {
	return <LoginForm />;
};

export { LoginPage };
