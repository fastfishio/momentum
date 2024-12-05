'use client';

import React, { useEffect } from 'react';

import Portal from '_core/components/Portal';

import styles from './ErrorModal.module.scss';

type TProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const ErrorModal = ({ error, reset }: TProps) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <Portal>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>Something went wrong!</div>
                    <pre className={styles.body}>{error.message}</pre>
                    <button className={styles.button} onClick={() => reset()}>
                        Try Again
                    </button>
                </div>
            </div>
        </Portal>
    );
};

export default ErrorModal;
