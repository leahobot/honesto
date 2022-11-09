import React, {useState, Fragment} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider";
import styles from "./Questions.module.scss";
import {IoIosArrowBack} from "react-icons/io";
import people from "../../data/people.json";
import questions from "../../data/questions.json";

const divs = [
	{
		id: "1",
	},
	{
		id: "2",
	},
	{
		id: "3",
	},
	{
		id: "4",
	},
	{
		id: "5",
	},
	{
		id: "6",
	},
	{
		id: "7",
	},
	{
		id: "8",
	},
	{
		id: "9",
	},
	{
		id: "10",
	},
];

const Questions = () => {
	const {
		displayQuestion,
		setDisplayQuestion,
		responses,
		setResponses,
		currentUserId,
	} = useStateContext();
	const currentUser = people.find((user) => user.id === currentUserId);
	const {id} = useParams();
	const navigate = useNavigate();
	const [currentQtn, setCurrentQtn] = useState(0);
	const [textValue, setTextValue] = useState("");
	const [choice, setChoice] = useState(1);
	const [index, setIndex] = useState("");

	const handlePrevious = () => {
		const prevQtn = currentQtn - 1;

		setCurrentQtn(prevQtn);
	};

	const handleNext = () => {
		const nxQtn = currentQtn + 1;
		setCurrentQtn(nxQtn);
		setIndex("");
		setChoice(1);
		setTextValue("");

		if (questions[currentQtn].type === "scale") {
			const value = index + 1;
			setResponses([(responses[currentQtn] = {value})]);
			setResponses([...responses]);
		} else if (questions[currentQtn].type === "multipleChoice") {
			const value = choice;
			setResponses([(responses[currentQtn] = {value})]);
			setResponses([...responses]);
		} else if (questions[currentQtn].type === "text") {
			const value = textValue;
			setResponses([(responses[currentQtn] = {value})]);
			setResponses([...responses]);
		} else {
			return null;
		}

		currentQtn === 8 && navigate(`/home/${id}/my-feedback`);
	};

	const handleSkip = (qtn) => {
		const skipQtn = currentQtn + 1;
		setCurrentQtn(skipQtn);

		setIndex("");
		setChoice(1);
		setTextValue("");

		if (questions[currentQtn].type === "scale") {
			const value = "SKIPPED";
			setResponses([(responses[currentQtn] = {value})]);
			setResponses([...responses]);
		} else if (questions[currentQtn].type === "multipleChoice") {
			const value = "SKIPPED";
			setResponses([(responses[currentQtn] = {value})]);
			setResponses([...responses]);
		} else if (questions[currentQtn].type === "text") {
			const value = "SKIPPED";
			setResponses([(responses[currentQtn] = {value})]);
			setResponses([...responses]);
		} else {
			return null;
		}
	};

	return (
		<Fragment>
			{!displayQuestion && (
				<div className={styles.container}>
					<div className={styles["container-header"]}>
						<p
							className={styles["container-header-one"]}
							onClick={() => setDisplayQuestion(true)}>
							<IoIosArrowBack />
							{"   "}
							Back
						</p>
						<div className={styles["container-header-two"]}>
							<div>
								<h1>{questions[currentQtn].label}</h1>
								<p>
									SHARE YOUR FEEDBACK FOR{" "}
									{currentUser ? currentUser.name.toUpperCase() : null}
								</p>
							</div>
							<img
								src={currentUser ? currentUser.avatarUrl : null}
								alt='user'
							/>
						</div>
					</div>

					<div className={styles["container-body"]}>
						<div className={styles["container-body-main"]}>
							{questions[currentQtn].type === "scale" && (
								<div className={styles["container-body-main-scale"]}>
									{divs.map((div, i) => (
										<div
											key={div.id}
											className={i <= index ? styles.bg : null}
											onClick={() => setIndex(i)}
										/>
									))}
								</div>
							)}
							{questions[currentQtn].type === "multipleChoice" && (
								<div className={styles["container-body-main-choice"]}>
									{questions[currentQtn].options.map((option, i) => (
										<p
											className={choice === option.value ? styles.bg : ""}
											key={option.value}
											onClick={() => setChoice(option.value)}>
											{option.label}
										</p>
									))}
								</div>
							)}
							{questions[currentQtn].type === "text" && (
								<div className={styles["container-body-main-text"]}>
									<textarea
										type='text'
										placeholder='Say Something...'
										value={textValue}
										onChange={(e) => setTextValue(e.target.value)}
									/>
								</div>
							)}
						</div>
						<div className={styles["container-body-nav"]}>
							<button
								onClick={handlePrevious}
								disabled={currentQtn === 0 ? true : false}>
								Previous
							</button>
							<button
								onClick={handleSkip}
								disabled={
									currentQtn >= 8
										? true
										: false || questions[currentQtn].required === true
										? true
										: false
								}>
								Skip
							</button>
							<button className={styles["next-btn"]} onClick={handleNext}>
								Next
							</button>
						</div>
						<div className={styles["container-body-footer"]}>
							<meter value={currentQtn + 1} min={0} max={questions.length} />
							<p>QUESTIONS COMPLETED</p>
							<p>
								{currentQtn + 1}/{questions.length}
							</p>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Questions;
