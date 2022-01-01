import { FC, useState, useEffect, memo, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CategoriesContext } from '../providers/CategoriesProvider';
import { GetPostList } from '../GetPostList';

type urlParams = {
    page: string,
    category: string
}

export const PostList: FC = memo(() => {
    const categories = useContext(CategoriesContext);
    const { page, category } = useParams<urlParams>();


    return (
        <>
            <GetPostList page={Number(page)} perPage={12} pageNavi={true} category={category as string} />
        </>
    );
});