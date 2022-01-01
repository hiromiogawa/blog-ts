import { FC, memo } from 'react';
import { GetPostList } from '../GetPostList';


export const Home: FC = memo(() => {

    return (
        <>
            <GetPostList page={1} perPage={12} pageNavi={true} category="all" />
        </>
    );
});