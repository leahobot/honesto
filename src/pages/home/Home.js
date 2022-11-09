import React, {useState, Fragment} from "react";
import people from "../../data/people.json";
import {Link, NavLink, useParams, Routes, Route} from "react-router-dom";
import styles from "./Home.module.scss";
import {AiOutlineMenu} from "react-icons/ai";
import {
	ShareFeedback,
	TeamFeedback,
	MyFeedback,
	NotFound,
} from "../../components";

const Home = () => {
	const {id} = useParams();
	const [displayMenu, setDisplayMenu] = useState(false);

	const user = people.find((person) => person.id === id);

	const activeLink = ({isActive}) => (isActive ? styles.active : null);

	return (
		<section className={styles.home}>
			<header>
				<Link to={`/home/${id}`} className={styles["header-logo"]}>
					<h1>Honesto</h1>
				</Link>

				<nav className={styles.nav}>
					<NavLink to={`/home/${id}`} end className={activeLink}>
						Share Feedback
					</NavLink>
					<NavLink to='my-feedback' className={activeLink}>
						My Feedback
					</NavLink>
					<NavLink to='team-feedback' className={activeLink}>
						Team Feedback
					</NavLink>
				</nav>

				<div className={styles.user}>
					<span className={styles["user-line"]}></span>
					<img src={user.avatarUrl} alt='user-avatar' />
					<span>
						<p>{user.name}</p>
						<Link to='/'>LOGOUT</Link>
					</span>
				</div>

				<AiOutlineMenu
					size={25}
					className={styles.menu}
					onClick={() => setDisplayMenu((prev) => !prev)}
				/>

				{displayMenu && (
					<div className={styles["side-bar"]}>
						<nav>
							<NavLink to={`/home/${id}`} end className={activeLink}>
								Share Feedback
							</NavLink>
							<NavLink to='my-feedback' className={activeLink}>
								My Feedback
							</NavLink>
							<NavLink to='team-feedback' className={activeLink}>
								Team Feedback
							</NavLink>
						</nav>
						<div className={styles.user1}>
							<span className={styles["user-line"]}></span>
							<img src={user.avatarUrl} alt='user-avatar' />
							<span>
								<p>{user.name}</p>
								<Link to='/'>LOGOUT</Link>
							</span>
						</div>{" "}
					</div>
				)}
			</header>
			<main>
				<Routes>
					<Route index element={<ShareFeedback />} />
					<Route path='my-feedback' element={<MyFeedback />} />
					<Route path='team-feedback' element={<TeamFeedback />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
		</section>
	);
};

export default Home;
