import { FC, memo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { GetPostList } from '../GetPostList';
import { siteName } from '../../setting/setting';

type urlParams = {
    page: string,
    category: string
}

export const PostList: FC = memo(() => {
    const { page, category } = useParams<urlParams>();
    const { pathname } = useLocation();

    useEffect(() => {
        document.title = `${category} | ${siteName}`;
        window.gtag('config', 'G-GCE0NCNRNG', {
			'page_path': pathname
		});
    }, [ page, category ])


    return (
        <>
            <GetPostList page={Number(page)} perPage={12} category={category as string} />
        </>
    );
});