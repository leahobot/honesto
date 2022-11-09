import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider";
import people from "../../data/people.json";
import {Questions} from "..";
import styles from "./ShareFeedback.module.scss";

const Feedback = () => {
	const {id} = useParams();
	const {displayQuestion, setDisplayQuestion, currentUserId, setcurrentUserId} =
		useStateContext();
	const [displaySubBtn, setDisplaySubBtn] = useState(false);

	const allUsers = people.filter((person) => person.id !== id);

	const handleUser = (userId) => {
		setcurrentUserId(userId);
		setDisplaySubBtn(true);
		setDisplayQuestion(false);
		// setRemoveBtn(true);
	};

	const handleViewUser = (userId) => {};

	return (
		<section className={styles.section}>
			{displayQuestion && (
				<div className={styles["section-container"]}>
					<div className={styles["section-container-header"]}>
						<h1>Share Feedback</h1>
						<span>
							<label htmlFor='select'>FEEDBACK PERIOD</label>
							<select id='select'>
								<option>Select...</option>
								<option>October 2018</option>
							</select>
						</span>
					</div>
					<div className={styles["section-container-body"]}>
						<ul>
							{allUsers.map((user) => (
								<li key={user.id}>
									<div>
										<img src={user.avatarUrl} alt='user-avater' />
										<p>{user.name}</p>
									</div>

									<span>
										<button
											onClick={() => handleViewUser(user.id)}
											className={
												user.id === currentUserId && displaySubBtn
													? styles["outline-btn"]
													: styles.display
											}>
											View Submission
										</button>
										<button
											onClick={() => handleUser(user.id)}
											className={
												user.id === currentUserId
													? styles.display
													: styles["fill-btn"]
											}>
											Fill Out
										</button>
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
			{!displayQuestion && <Questions />}
		</section>
	);
};

export default Feedback;
