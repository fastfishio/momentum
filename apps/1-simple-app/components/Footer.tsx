import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
    return <footer className={styles.container}>&copy; {new Date().getFullYear()} noon.com</footer>;
};

export default Footer;
