import React, { useRef, useState } from 'react';
import { PageHeader } from '@components/PageHeader';
import { Redirect } from 'react-router';
import { logIn } from '@utils/log-status';
import { useHistory } from 'react-router-dom';

const LoginForm = function (props) {
	let history = useHistory();
	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const [errorArr, setErrorArr] = useState([]);
	const [redirect, setRedirect] = useState(false);

	const loginRequestFunc = function (event) {
		event.preventDefault();
		// check if the references are not null
		// if they are terminate the function

		if (emailInput === null || passwordInput === null) return;

		logIn(emailInput.current.value, passwordInput.current.value)
			.then((res) => {
				setErrorArr([]);
				history.push('/todo');
			})
			.catch((err) => {
				console.log('err.response.data: %o', err.response.data);
				setErrorArr(err.response.data.errors);
			});
	};

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
