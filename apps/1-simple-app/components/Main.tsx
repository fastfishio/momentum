import React from 'react';

import styles from './Main.module.scss';

type TProps = {
    children: React.ReactNode;
};

const Main = ({ children }: TProps) => {
    return <div className={styles.container}>{children}</div>;
};

export default Main;
