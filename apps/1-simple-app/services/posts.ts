import { cache } from 'react';

import {
    TGetPostDetailsAPIError,
    TGetPostDetailsAPISuccess,
    TGetPostsAPIError,
    TGetPostsAPISuccess,
} from '../types/posts';

const postsAPI = {
    getPosts: cache(async () => {
        const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) =>
                response
                    .json()
                    .then((json) =>
                        json.length > 0
                            ? ({ status: 200, data: json } as TGetPostsAPISuccess)
                            : ({ status: 500, error: 'No posts available!' } as TGetPostsAPIError),
                    ),
            )
            .catch((error) => ({ status: error.status, error: error.message }) as TGetPostsAPIError);
        return posts;
    }),
    getPostDetails: cache(async (params: { id: string }) => {
        const posts = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
            .then((response) =>
                response
                    .json()
                    .then((json) =>
                        'id' in json
                            ? ({ status: 200, data: json } as TGetPostDetailsAPISuccess)
                            : ({ status: 404, error: 'Post not found!' } as TGetPostDetailsAPIError),
                    ),
            )
            .catch((error) => ({ status: error.status, error: error.message }) as TGetPostDetailsAPIError);
        return posts;
    }),
} as const;

export default postsAPI;
