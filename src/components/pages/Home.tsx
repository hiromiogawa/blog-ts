import { FC, useState, memo, useContext } from 'react';
import { CategoriesContext } from '../providers/CategoriesProvider';
import { GetPostList } from '../GetPostList';


export const Home: FC = memo(() => {
    const categories = useContext(CategoriesContext);

    return (
        <>
            <GetPostList page={1} perPage={12} pageNavi={true} category="all" />
        </>
    );
});