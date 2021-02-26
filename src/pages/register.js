import React, { useState } from 'react';
import { PageHeader } from '@components/PageHeader';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { axiosInstance } from '@utils/axios-instance';

const RegisterPage = function (props) {
	const history = useHistory();
	const [formInfo, setFormInfo] = useState({});
	const [errorArr, setErrorArray] = useState([]);

	const handleChange = function (event) {
		setFormInfo((currentState) => {
			return Object.assign({}, currentState, { [event.target.name]: event.target.value });
		});
	};

	const registerRequestFunc = function (event) {
		event.preventDefault();
		setErrorArray([]);
		let validationErr = false;

		// match email, emailConfirmation and password, passwordConfirmation
		if (formInfo.email !== formInfo.emailConfirmation) {
			setErrorArray((currentErrorArr) => {
				return [...currentErrorArr, { msg: 'Email and email confirmation must be same.' }];
			});

			validationErr = true;
		}

		if (formInfo.password !== formInfo.passwordConfirmation) {
			setErrorArray((currentErrorArr) => {
				return [...currentErrorArr, { msg: 'Password and password confirmation must be same.' }];
			});

			validationErr = true;
		}

		if (validationErr) return;

		axiosInstance({
			method: 'POST',
			url: '/user/register',
			data: formInfo,
		})
			.then((res) => {
				history.push('/login');
			})
			.catch((err) => {
				console.error(err);
				setErrorArray(err.response.data.errors);
			});
	};

	return (
		<div>
			<PageHeader title="Register" />
			<div>
				<div>
					{errorArr.map((value, index) => {
						return <div key={index}>{value.msg}</div>;
					})}
				</div>
				<form>
					<div>
						<label>First name:</label>
					</div>
					<div>
						<input type="text" name="firstName" autoComplete="off" onChange={handleChange} />
					</div>
					<div>
						<div>
							<label>Last name:</label>
						</div>
						<div>
							<input type="text" name="lastName" autoComplete="off" onChange={handleChange} />
						</div>
					</div>
					<div>
						<div>
							<label>E-mail:</label>
						</div>
						<div>
							<input type="text" name="email" autoComplete="off" onChange={handleChange} />
						</div>
					</div>
					<div>
						<div>
							<label>E-mail confirmation:</label>
						</div>
						<div>
							<input type="text" name="emailConfirmation" autoComplete="off" onChange={handleChange} />
						</div>
					</div>
					<div>
						<div>
							<label>Password:</label>
						</div>
						<div>
							<input type="password" name="password" autoComplete="off" onChange={handleChange} />
						</div>
					</div>
					<div>
						<div>
							<label>Password confirmation:</label>
						</div>
						<div>
							<input type="password" name="passwordConfirmation" autoComplete="off" onChange={handleChange} />
						</div>
					</div>
					<div>
						<div>
							<button onClick={registerRequestFunc}>Register</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export { RegisterPage };
