import React from 'react';

import postsAPI from '@/services/posts';

import styles from './page.module.scss';

type TProps = {
    params: { postId: string };
};

const PostDetailsPage = async ({ params }: TProps) => {
    const postDetailsResponse = await postsAPI.getPostDetails({ id: params.postId });

    if ('error' in postDetailsResponse) {
        const { error } = postDetailsResponse;
        throw new Error(error);
    }

    return (
        <article className={styles.container}>
            <h1 className={styles.title}>{postDetailsResponse.data.title}</h1>
            <p className={styles.body}>{postDetailsResponse.data.body}</p>
        </article>
    );
};

export default PostDetailsPage;
