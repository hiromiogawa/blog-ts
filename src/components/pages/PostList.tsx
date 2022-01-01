import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { GetPostList } from '../GetPostList';

type urlParams = {
    page: string,
    category: string
}

export const PostList: FC = memo(() => {
    const { page, category } = useParams<urlParams>();


    return (
        <>
            <GetPostList page={Number(page)} perPage={12} category={category as string} />
        </>
    );
});