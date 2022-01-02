import { FC, memo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { GetPostList } from '../GetPostList';
import { siteName } from '../../setting/setting';

type urlParams = {
    page: string,
    text: string
}

export const PostSerch: FC = memo(() => {
    const { page, text } = useParams<urlParams>();
    const { pathname } = useLocation();


    useEffect(() => {
        document.title = `${text} | 検索 | ${siteName}`;
        window.gtag('config', 'G-GCE0NCNRNG', {
			'page_path': pathname
		});
    }, [ page, text ])


    return (
        <>
            <GetPostList page={Number(page)} perPage={12} category="serch" />
        </>
    );
});