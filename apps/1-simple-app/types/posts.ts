export type TPost = {
    id: number;
    title: string;
    body: string;
};

export type TGetPostsAPIError = {
    status: number;
    error: string;
};

export type TGetPostsAPISuccess = {
    status: 200;
    data: TPost[];
};

export type TGetPostDetailsAPIError = {
    status: number;
    error: string;
};

export type TGetPostDetailsAPISuccess = {
    status: 200;
    data: TPost;
};
