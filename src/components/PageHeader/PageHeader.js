import React from 'react';
import PropTypes from 'prop-types';
import '@root/styles/reset.css';
import generalStyles from './PageHeader.module.css';

const PageHeader = function (props) {
	const { title } = props;

	return (
		<div className={generalStyles['PageHeader']}>
			<h2>{title}</h2>
		</div>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string,
};

export { PageHeader };
