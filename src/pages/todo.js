import React, { useState, useEffect, createRef } from 'react';
import { PageHeader } from '@components/PageHeader';
import axios from 'axios';

const TodoPage = function (props) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(0);
	const [maxPages, setMaxPages] = useState(0);
	const [todoList, setTodoList] = useState([]);

	const todoInputRef = createRef();

	const host = process.env.BACKEND_HOST || 'http://localhost';
	const port = process.env.BACKEND_PORT || 3000;
	const axiosInstance = axios.create({
		baseURL: `${host}:${port}/api`,
		withCredentials: true,
	});

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

	return (
		<div>
			<PageHeader title="TodoList" />
			<div>
				<form>
					<label></label>
					<input type="text" autoComplete="off" ref={todoInputRef} />
					<button onClick={todoAddCb}>Add</button>
				</form>
			</div>
			<div>
				<ul>
					{todoList.map((value) => {
						return (
							<li key={value._id}>
								<div>
									<div>{value.text}</div>
									<div>
										<button>{value.completed ? 'Uncomplete' : 'Complete'}</button>
									</div>
									<div>
										<button>Delete</button>
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
