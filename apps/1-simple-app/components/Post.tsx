import React from 'react';

import Link from 'next/link';

import { TPost } from '../types/posts';
import styles from './Post.module.scss';

type TProps = {
    post: TPost;
};

const Post = ({ post }: TProps) => {
    return (
        <Link className={styles.container} href={`/${post.id}`}>
            {post.title}
        </Link>
    );
};

export default Post;
