import React, { useRef, useState } from 'react';
import { PageHeader } from '@components/PageHeader';
import axios from 'axios';
import { Redirect } from 'react-router';

const LoginForm = function (props) {
	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const [errorArr, setErrorArr] = useState([]);
	const [redirect, setRedirect] = useState(false);

	const loginRequestFunc = function (event) {
		event.preventDefault();
		// check if the references are not null
		// if they are terminate the function

		if (emailInput === null || passwordInput === null) return;

		const host = process.env.BACKEND_HOST || 'http://localhost';
		const port = process.env.BACKEND_PORT || 3000;

		axios({
			method: 'POST',
			baseURL: `${host}:${port}/api`,
			url: '/user/login',
			data: {
				email: emailInput.current.value,
				password: passwordInput.current.value,
			},
			withCredentials: true,
			maxRedirects: 0,
		})
			.then((res) => {
				// set errorArr to empty array
				setErrorArr([]);
				setRedirect(true);
			})
			.catch((err) => {
				console.log('err.response: %o', err.response.data);
				setErrorArr(err.response.data.errors);
				setRedirect(false);
			});
	};

	if (redirect) return <Redirect to={{ pathname: '/todo' }} />;

	return (
		<div>
			<PageHeader title="Login" />
			<div>
				<div>
					{errorArr.map((value, index) => {
						return <div key={index}>{value.msg}</div>;
					})}
				</div>
				<form>
					<div>
						<div>
							<label>E-mail:</label>
						</div>
						<input type="text" name="email" autoComplete="off" ref={emailInput} />
					</div>
					<div>
						<div>
							<label>Password:</label>
						</div>
						<input type="password" name="password" autoComplete="off" ref={passwordInput} />
					</div>
					<div>
						<button onClick={loginRequestFunc}>Login</button>
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
