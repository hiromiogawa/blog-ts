import { FC, useState, useEffect, memo, useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { CategoriesContext } from '../providers/CategoriesProvider';
import { LoadFlugContext } from '../providers/LoadFlugProvider';
import { useGetCategorySlug } from '../../hook/useGetCategorySlug';
import { apiUrl } from '../../setting/setting';
import axios from 'axios';
import { siteName } from '../../setting/setting';
type urlParams = {
    id: string
};

type postsDataType = {
    id: number,
    date: string,
    title: {
        rendered: string
    },
    content: {
        rendered: string
    },
    categories: {
        key: number
    }[],
    category_name: {
        key: string
    }[],
    acf: {
        article01: {
            ID: string,
            post_title: string
        },
        article02: {
            ID: string,
            post_title: string
        }
    }
};

export const PostDetail: FC = memo(() => {
    const categories = useContext(CategoriesContext);
    const { setLoadFlug } = useContext(LoadFlugContext);
    const { getCategorySlug } = useGetCategorySlug();
    const [ url, setUrl ] = useState<string>();
    const [ postsData, setPostsData ] = useState<postsDataType>();
    const { id } = useParams<urlParams>();
    const { pathname } = useLocation();

    const getJson = (url: string) => {
        axios.get(url).then((res) => {
            setPostsData(res.data);
            setLoadFlug(false);
        });

        
    };

    useEffect(() => {
        setLoadFlug(true);
        if(categories) {
            setUrl(`${apiUrl}posts/${id}`);
        }
    }, [categories, id]);

    useEffect(() => {
        if (url) {
            getJson(url);
        }
    }, [url]);

    useEffect(() => {
        if (postsData) {
            document.title = `${postsData.title.rendered} | ${siteName}`;
            window.gtag('config', 'G-GCE0NCNRNG', {
                'page_path': pathname
            });
        };
    }, [postsData]);

    return (
        <>
            {postsData && 
                <article>
                    <h1>{postsData.title.rendered}</h1>
                    <ul>{postsData.category_name.map((cat, i) =>
                        <li key={i}><Link to={`/post/${getCategorySlug(cat)}/1`}>{cat}</Link></li>
                    )}</ul>
                    <div dangerouslySetInnerHTML={{ __html: postsData.content.rendered }} />

                    {postsData.acf.article01 &&
                        <Link to={`/post/detail/${postsData.acf.article01.ID}`}>{postsData.acf.article01.post_title}</Link>
                    }
                    {postsData.acf.article02 &&
                        <Link to={`/post/detail/${postsData.acf.article02.ID}`}>{postsData.acf.article02.post_title}</Link>
                    }
                </article>
                
            }

            <div><Link to="/post/all/1">一覧へ戻る</Link></div>
        </>
    );
});