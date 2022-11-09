import React, {useState} from "react";
import questions from "../../data/questions.json";
import people from "../../data/people.json";
import styles from "./MyFeedback.module.scss";
import {useStateContext} from "../../context/ContextProvider";

const MyFeedback = () => {
	const {responses, currentUserId} = useStateContext();
	// const [userResponse, setUserResponse] = useState(null);

	// console.log(typeof responses[0].value);
	// console.log(responses);

	const [displayFeedback, setDisplayFeedback] = useState(false);

	const user = people.find((person) => person.id === currentUserId);

	const divs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<section className={styles.section}>
			<div className={styles["section-width"]}>
				<div className={styles["section-width-header"]}>
					<h1>My Feedback</h1>
					<span>
						<label>FEEDBACK PERIOD</label>
						<select>
							<option>Select..</option>
							<option>OCTOBER 2018</option>
						</select>
					</span>
				</div>

				<div className={styles["section-width-body"]}>
					<div className={styles["section-width-body-one"]}>
						<h1>FEEDBACK GIVEN</h1>
						<ul>
							<li onClick={() => setDisplayFeedback((prev) => !prev)}>
								<img src={user.avatarUrl} alt='user' />
								<p>{user.name}</p>
							</li>
						</ul>
					</div>
					{displayFeedback && (
						<div className={styles["section-width-body-two"]}>
							<h3>{`${user.name}'s Feedback`}</h3>
							<ul>
								<li>
									<p className={styles.label}>{questions[0].label}</p>
									<div className={styles.divs}>
										{divs.map((index) => (
											<div key={index} />
										))}
									</div>
								</li>
								<li>
									<p className={styles.label}>{questions[1].label}</p>
									<p className={styles.label} style={{marginLeft: "7rem"}}>
										{questions[1].options[2].label}
									</p>
								</li>
								<li>
									<p className={styles.label}>{questions[2].label}</p>
									<div className={styles.divs}>
										{divs.map((index) => (
											<div key={index} />
										))}
									</div>
								</li>
								<li>
									<p className={styles.label}>{questions[3].label}</p>
									<p>{responses ? responses[3].value : "User's Text Here "}</p>
								</li>
								<li>
									<p className={styles.label}>{questions[4].label}</p>
									<p className={styles.label} style={{marginLeft: "7rem"}}>
										{questions[4].options[1].label}
									</p>
								</li>
								<li>
									<p className={styles.label}>{questions[5].label}</p>
									<p>{responses ? responses[5].value : "User's Text Here "}</p>
								</li>
								<li>
									<p className={styles.label}>{questions[6].label}</p>
									<p className={styles.label}>
										{questions[6].options[0].label}
									</p>
								</li>
								<li>
									<p className={styles.label}>{questions[7].label}</p>
									<div className={styles.divs}>
										{divs.map((index) => (
											<div key={index} />
										))}
									</div>
								</li>
								<li>
									<p className={styles.label}>{questions[8].label}</p>
									<p>{responses ? responses[8].value : "User's Text Here "}</p>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default MyFeedback;
