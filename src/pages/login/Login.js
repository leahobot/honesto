import React, {useState} from "react";
import styles from "./Login.module.scss";
import people from "../../data/people.json";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import {SlArrowDown} from "react-icons/sl";

const Login = () => {
	const [toggleSelect, setToggleSelect] = useState(false);
	const [hideSelect, setHideSelect] = useState(false);
	const [userId, setUserId] = useState(null);

	const displayUser = (id) => {
		setToggleSelect(false);
		setHideSelect(true);
		setUserId(id);
	};

	const user = people.find((person) => person.id === userId);

	return (
		<section className={styles.main}>
			<div className={styles["main-container"]}>
				<div className={styles["main-container-width"]}>
					<div className={styles["main-container-width-one"]}>
						<img src={logo} alt='logo' />
						<h1>Honesto</h1>
					</div>
					<div className={styles["main-container-width-two"]}>
						<label htmlFor='select'>Login as:</label>
						<div
							onClick={() => setToggleSelect((previous) => !previous)}
							className={styles.select}>
							<div
								className={
									hideSelect
										? `${styles["select-hidden"]}`
										: `${styles["select-div-one"]}`
								}>
								<p>Select...</p>

								<SlArrowDown size={16} />
							</div>

							{userId && (
								<div className={styles["select-div-two"]}>
									<img src={user.avatarUrl} alt='user' />
									<p>{user.name}</p>
								</div>
							)}
						</div>
						<Link to={userId ? `/home/${userId}` : ""}>Login</Link>

						{toggleSelect && (
							<ul>
								{people.map((person) => (
									<li key={person.id} onClick={() => displayUser(person.id)}>
										<img src={person.avatarUrl} alt='user' />
										<p>{person.name}</p>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
