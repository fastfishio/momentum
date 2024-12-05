import React from 'react';

import { NextResponse } from 'next/server';

import postsAPI from '@/services/posts';
import Posts from '@/components/Posts';
import EmptyPosts from '@/components/EmptyPosts';

import styles from './page.module.scss';

const HomePage = async () => {
    const postsResponse = await postsAPI.getPosts();

    if ('error' in postsResponse) {
        const { status, error } = postsResponse;
        return NextResponse.json(error, { status });
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Posts:</h1>

            {postsResponse.data.length > 0 ? <Posts posts={postsResponse.data} /> : <EmptyPosts />}
        </div>
    );
};

export default HomePage;
