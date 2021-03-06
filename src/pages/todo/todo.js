import React, { useState, useEffect, createRef } from 'react';
import { PageHeader } from '@components/PageHeader';
import axios from 'axios';
import { axiosInstance } from '@utils/axios-instance';
import { logOut } from '@utils/log-status';
import { useHistory } from 'react-router-dom';
import styles from './todo.module.css';

const TodoPage = function (props) {
	let history = useHistory();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(0);
	const [maxPages, setMaxPages] = useState(0);
	const [todoList, setTodoList] = useState([]);

	const todoInputRef = createRef();

	const getTodos = function () {
		let cancel;
		setLoading(true);
		setError(false);

		axiosInstance({
			method: 'GET',
			url: '/todo/get',
			params: { page: page },
			cancelToken: new axios.CancelToken((cancelTok) => {
				cancel = cancelTok;
			}),
		})
			.then((res) => {
				setTodoList(res.data.todos);
				setMaxPages(res.data.maxPages);
				setLoading(false);
			})
			.catch((err) => {
				// stop interpreting axios cancel as errors
				if (axios.isCancel(err)) return;
				setError(true);
			});
		return cancel;
	};

	useEffect(() => {
		const cancel = getTodos();
		return cancel;
	}, [page]);

	const logOutCb = function (event) {
		event.preventDefault();
		logOut();
		history.push('/login');
	};

	const todoAddCb = function (event) {
		// check if ref is null if so return immidiately
		event.preventDefault();
		if (todoInputRef.current === null) return;

		// get the todo value
		const todoText = todoInputRef.current.value;
		// check if the value is empty if so, return
		if (todoText === '') return;
		axiosInstance({
			method: 'POST',
			url: '/todo/add',
			data: {
				text: todoText,
				completed: false,
			},
		})
			.then((res) => {
				todoInputRef.current.value = '';
				getTodos();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const todoToggleComplete = function (id) {
		axiosInstance({
			method: 'POST',
			url: '/todo/toggleComplete',
			data: {
				id: id,
			},
		})
			.then((res) => {
				getTodos();
			})
			.catch((err) => console.error);
	};

	const todoDeleteCb = function (id) {
		axiosInstance({
			method: 'POST',
			url: '/todo/delete',
			data: {
				id: id,
			},
		})
			.then((res) => {
				getTodos();
				if (page > maxPages) setPage(maxPages);
			})
			.catch((err) => console.error);
	};

	const previousPage = function (event) {
		event.preventDefault();
		let pageToSwitch = page - 1;
		if (pageToSwitch < 0) pageToSwitch = 0;

		setPage(pageToSwitch);
	};
	const nextPage = function (event) {
		event.preventDefault();
		let pageToSwitch = page + 1;
		if (pageToSwitch > maxPages) pageToSwitch = maxPages;

		setPage(pageToSwitch);
	};

	const firstName = localStorage.getItem('firstName');
	const lastName = localStorage.getItem('lastName');
	const email = localStorage.getItem('email');

	return (
		<div>
			<div>
				<div>{`${firstName} ${lastName}`}</div>
				<div>
					<button onClick={logOutCb}>log out</button>
				</div>
			</div>
			<PageHeader title="TodoList" />
			<div className={styles['todoAdd']}>
				<form>
					<div>
						<label>Todo: </label>
						<input type="text" autoComplete="off" ref={todoInputRef} />
						<button onClick={todoAddCb}>Add</button>
					</div>
				</form>
			</div>
			<div>
				<ul>
					{todoList.map((value) => {
						return (
							<li key={value._id}>
								<div className={styles['todo']}>
									<div>
										<div className={styles['text']}>{value.text}</div>
										<button
											onClick={todoToggleComplete.bind(null, value._id)}
											className={value.completed ? styles['buttonCompleted'] : styles['buttonUncompleted']}
										>
											{value.completed ? 'Uncomplete' : 'Complete'}
										</button>
										<button onClick={todoDeleteCb.bind(null, value._id)} className={styles['delete']}>
											Delete
										</button>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
			<div>
				<ul>
					<li>
						<a href="#" onClick={previousPage}>
							Previous
						</a>
					</li>
					<li>{page}</li>
					<li>
						<a href="#" onClick={nextPage}>
							Next
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export { TodoPage };
