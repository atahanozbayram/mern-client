import React from 'react';
import { PageHeader } from '@components/PageHeader';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const RegisterPage = function (props) {
	return (
		<div>
			<form>
				<div>
					<label>First name:</label>
				</div>
				<div>
					<input type="text" name="firstName" autoComplete="off" />
				</div>
				<div>
					<div>
						<label>Last name:</label>
					</div>
					<div>
						<input type="text" name="lastName" autoComplete="off" />
					</div>
				</div>
				<div>
					<div>
						<label>E-mail:</label>
					</div>
					<div>
						<input type="text" name="email" autoComplete="off" />
					</div>
				</div>
				<div>
					<div>
						<label>E-mail confirmation:</label>
					</div>
					<div>
						<input type="text" name="emailConfirmation" autoComplete="off" />
					</div>
				</div>
				<div>
					<div>
						<label>Password:</label>
					</div>
					<div>
						<input type="password" name="password" autoComplete="off" />
					</div>
				</div>
				<div>
					<div>
						<label>Password confirmation:</label>
					</div>
					<div>
						<input type="password" name="passwordConfirmation" autoComplete="off" />
					</div>
				</div>
				<div>
					<div>
						<button>Register</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export { RegisterPage };
