import React from 'react';

import styles from './Main.module.scss';
import { TPost } from '../types/posts';
import Post from './Post';

type TProps = {
    posts: TPost[];
};

const Posts = ({ posts = [] }: TProps) => {
    if (!posts.length) {
        return null;
    }

    return (
        <ul className={styles.list}>
            {posts.map((post) => (
                <li key={`post-${post.id}`} className={styles.post}>
                    <Post post={post} />
                </li>
            ))}
        </ul>
    );
};

export default Posts;
