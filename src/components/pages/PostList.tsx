import { FC, memo, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { GetPostList } from '../GetPostList';
import { siteName } from '../../setting/setting';
import { Head } from '../template/Head';

type urlParams = {
    page: string,
    category: string
}

export const PostList: FC = memo(() => {
    const { page, category } = useParams<urlParams>();
    const [title, setTitle] = useState<string>();

    useEffect(() => {
        setTitle(`${category} | ${page} |  ${siteName}`);
    }, [ page, category ])


    return (
        <>
            <Head title={title as string} ogtype="website" />
            <GetPostList page={Number(page)} perPage={12} category={category as string} />
        </>
    );
});