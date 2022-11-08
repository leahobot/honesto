import React, {useState, useEffect, Fragment} from "react";
import {useStateContext} from "../../context/ContextProvider";
import styles from "./Questions.module.scss";
import {IoIosArrowBack} from "react-icons/io";
import people from "../../data/people.json";
import questionsData from "../../data/questions.json";

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

const initialState = {
	currentQuestion: {},
	nextQuestion: {},
	prevQuestion: {},
	noOfQuestionsAnswered: 0,
	currentQuestionIndex: 0,
};

const initialResponse = {
	qtn1: 0,
	qtn2: 0,
	qtn3: 0,
	qtn4: 0,
	qtn5: 0,
	qtn6: 0,
	qtn7: 0,
	qtn8: 0,
	qtn9: 0,
};

const Questions = ({currentUserId}) => {
	const currentUser = people.find((user) => user.id === currentUserId);
	const {displayQuestion, setDisplayQuestion} = useStateContext();
	const [questions, setQuestions] = useState(questionsData);
	const [userResponse, setUserResponse] = useState(initialResponse);
	const [otherProp, setOtherProp] = useState(initialState);
	const [textValue, setTextValue] = useState("");
	// const [bg, setBg] = useState(false);
	const [id, setId] = useState("");
	// let counter = 0;

	const displayQtn = (
		qtn,
		currentQuestion,
		nextQuestion,
		prevQuestion,
		currentQuestionIndex,
	) => {
		let currentIndex = currentQuestionIndex;
		if (qtn.length !== 0) {
			currentQuestion = qtn[currentIndex];
			nextQuestion = qtn[currentIndex + 1];
			prevQuestion = qtn[currentIndex - 1];

			setOtherProp({
				...otherProp,
				currentQuestion,
				nextQuestion,
				prevQuestion,
				currentQuestionIndex,
			});
		}
	};

	useEffect(() => {
		displayQtn(
			questions,
			otherProp.currentQuestion,
			otherProp.nextQuestion,
			otherProp.prevQuestion,
			otherProp.currentQuestionIndex,
		);
	}, []);

	const handlePrevious = (qtn) => {
		setOtherProp({
			...otherProp,
			currentQuestion: qtn[otherProp.currentQuestionIndex - 1],
			currentQuestionIndex: otherProp.currentQuestionIndex - 1,
		});
	};

	const handleNext = (qtn) => {
		setUserResponse();

		setOtherProp({
			...otherProp,
			currentQuestionIndex: otherProp.currentQuestionIndex + 1,
			currentQuestion: qtn[otherProp.currentQuestionIndex + 1],
		});
	};

	const handleSkip = (qtn) => {
		setOtherProp({
			...otherProp,
			currentQuestion: qtn[otherProp.currentQuestionIndex + 2],
			currentQuestionIndex: otherProp.currentQuestionIndex + 2,
		});
	};

	const handleScale = (divId, e) => {
		const currentDiv = divs.find((div) => div.id === divId);
		const id = currentDiv.id;

		// counter++;

		setId(id);
	};

	// console.log(counter, "counter");
	// console.log(id, "id");

	const handleChoice = (value) => {};

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
								<h1>{otherProp.currentQuestion.label}</h1>
								<p>SHARE YOUR FEEDBACK FOR {currentUser.name.toUpperCase()}</p>
							</div>
							<img src={currentUser.avatarUrl} alt='user' />
						</div>
					</div>

					<div className={styles["container-body"]}>
						<div className={styles["container-body-main"]}>
							{otherProp.currentQuestion.type === "scale" && (
								<div className={styles["container-body-main-scale"]}>
									{divs.map((div) => (
										<div
											key={div.id}
											className={div.id === id ? styles.bg : null}
											onClick={() => handleScale(div.id)}
										/>
									))}
								</div>
							)}
							{otherProp.currentQuestion.type === "multipleChoice" && (
								<div className={styles["container-body-main-choice"]}>
									{otherProp.currentQuestion.options.map((option) => (
										<p
											key={option.value}
											value={option.value}
											onClick={() => handleChoice(option.value)}>
											{option.label}
										</p>
									))}
								</div>
							)}
							{otherProp.currentQuestion.type === "text" && (
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
								onClick={() => handlePrevious(questions)}
								disabled={otherProp.currentQuestionIndex === 0 ? true : false}>
								Previous
							</button>
							<button
								onClick={() => handleSkip(questions)}
								disabled={otherProp.currentQuestionIndex >= 7 ? true : false}>
								Skip
							</button>
							<button
								className={styles["next-btn"]}
								onClick={() => handleNext(questions)}
								disabled={otherProp.currentQuestionIndex >= 8 ? true : false}>
								Next
							</button>
						</div>
						<div className={styles["container-body-footer"]}>
							<meter
								value={otherProp.currentQuestionIndex}
								min={-1}
								max={questions.length}
							/>
							<p>QUESTIONS COMPLETED</p>
							<p>
								{otherProp.currentQuestionIndex + 1}/{questions.length + 1}
							</p>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Questions;

// disabled={otherProp.currentQuestion.required === true ? true : false
// disabled={otherProp.currentQuestionIndex <= 0 ? true : false}
// disabled={otherProp.currentQuestion.required === true ? true : false}
// }
