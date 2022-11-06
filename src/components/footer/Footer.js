import React from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/footer-logo.png";
import styles from "./Footer.module.scss";

const currentYear = new Date().getFullYear();
const year = currentYear - 1;

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Link to='/'>
				<img src={logo} alt='logo' />
			</Link>
			<div>
				<p>Copyright © {year} Theorem, LLC. All Rrights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
