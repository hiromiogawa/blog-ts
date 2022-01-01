import { FC, useState, useEffect, memo, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CategoriesContext } from '../providers/CategoriesProvider';
import { useGetCategorySlug } from '../../hook/useGetCategorySlug';
import { apiUrl } from '../../setting/post';
import axios from 'axios';

type urlParams = {
    id: string
}

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
    }[]
}

export const PostDetail: FC = memo(() => {
    const categories = useContext(CategoriesContext);
    const { getCategorySlug } = useGetCategorySlug();
    const [ url, setUrl ] = useState<string>();
    const [ postsData, setPostsData ] = useState<postsDataType>();
    const { id } = useParams<urlParams>();

    const getJson = (url: string) => {
        axios.get(url).then((res) => {
            setPostsData(res.data);
        })
    }

    useEffect(() => {
        if(categories) {
            setUrl(`${apiUrl}posts/${id}`);
        }
    }, [categories, id]);

    useEffect(() => {
        if (url) {
            getJson(url);
        }
    }, [url]);

    return (
        <>
            {postsData && 
                <article>
                    <h1>{postsData.title.rendered}</h1>
                    <ul>{postsData.category_name.map((cat, i) =>
                        <li key={i}><Link to={`/post/${getCategorySlug(cat)}/1`}>{cat}</Link></li>
                    )}</ul>
                    <div dangerouslySetInnerHTML={{ __html: postsData.content.rendered }} />
                </article>
                
            }

            <div><Link to="/post/all/1">一覧へ戻る</Link></div>
        </>
    );
});