'use client';

import React from 'react';

import Portal from '_core/components/Portal';

import styles from './ErrorModal.module.scss';

type TProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const ErrorModal = ({ error, reset }: TProps) => {
    return (
        <Portal>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>Something went wrong!</div>
                    <pre className={styles.body}>{JSON.stringify(error, null, 2)}</pre>
                    <button className={styles.button} onClick={() => reset()}>
                        Try Again
                    </button>
                </div>
            </div>
        </Portal>
    );
};

export default ErrorModal;
