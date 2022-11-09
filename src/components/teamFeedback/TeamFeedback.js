import React from "react";
import {Link} from "react-router-dom";
import styles from "./TeamFeedback.module.scss";

const TeamFeedback = () => {
	return (
		<section className={styles.notfound}>
			<div className={styles["notfound-box"]}>
				<p>Page Not Ready</p>
				<h1>Sorry! The page you are looking for is not ready. 😢</h1>
				<p>Return Soon!!!</p>
				<Link to='/'>Back to Login Page</Link>
			</div>
		</section>
	);
};

export default TeamFeedback;
