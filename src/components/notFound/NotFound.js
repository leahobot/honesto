import React from "react";
import {Link, useParams} from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
	const {id} = useParams();

	return (
		<section className={styles.notfound}>
			<div className={styles["notfound-box"]}>
				<p>404</p>
				<h1>Sorry! The page you are looking for cannot be found. 😢</h1>
				<Link to={`/home/${id}`}>Back to Share Feedback</Link>
			</div>
		</section>
	);
};

export default NotFound;
