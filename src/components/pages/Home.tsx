import { FC, memo } from 'react';
import { GetPostList } from '../GetPostList';
import { Head } from '../template/Head';
import { siteName } from '../../setting/setting';

export const Home: FC = memo(() => {

    return (
        <>
            <Head title={siteName} ogtype="website" />
            <GetPostList page={1} perPage={12} category="all" />
        </>
    );
});