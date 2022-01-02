import { FC, memo, useEffect } from 'react';
import { GetPostList } from '../GetPostList';
import { useLocation } from 'react-router-dom';
import { siteName } from '../../setting/setting';


export const Home: FC = memo(() => {
    const { pathname } = useLocation();

    useEffect(() => {
        document.title = `${siteName}`;
        window.gtag('config', 'G-GCE0NCNRNG', {
			'page_path': pathname
		});
    }, [])

    return (
        <>
            <GetPostList page={1} perPage={12} category="all" />
        </>
    );
});