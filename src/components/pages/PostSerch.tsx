import { FC, memo, useEffect,useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { GetPostList } from '../GetPostList';
import { siteName } from '../../setting/setting';
import { Head } from '../template/Head';

type urlParams = {
    page: string,
    text: string
}

export const PostSerch: FC = memo(() => {
    const { page, text } = useParams<urlParams>();
    const [ title, setTitle ] = useState<string>();


    useEffect(() => {
        setTitle(`${text} | ${page} | 検索 | ${siteName}`);
    }, [ page, text ])


    return (
        <>
            <Head title={title as string} ogtype="website" />
            <GetPostList page={Number(page)} perPage={12} category="serch" serchText={text} />
        </>
    );
});