import React from "react";
import {Link} from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
	return (
		<section className={styles.notfound}>
			<div className={styles["notfound-box"]}>
				<p>404</p>
				<h1>Sorry! The page you are looking for cannot be found. 😢</h1>
				<Link to='/'>Back to Login</Link>
			</div>
		</section>
	);
};

export default NotFound;
