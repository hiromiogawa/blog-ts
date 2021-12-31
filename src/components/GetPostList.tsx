import { FC, useState, memo, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CategoriesContext } from './providers/CategoriesProvider';
import { apiUrl } from '../setting/post';
import { Scontents } from '../style/commonStyle';
import axios from 'axios';

type urlParams = {
    page: string,
    category: string
}

type postsDataType = {
    id: number,
    title: {
        rendered: string
    },
    categories: {
        key: number
    }[],
    category_name: {
        key: string
    }[]
}

type propsType = {
    page: number,
    perPage: number,
    pageNavi: boolean,
    category: string
}


export const GetPostList = memo((props: propsType) => {
    const { page, perPage, pageNavi, category } = props;
    const categories = useContext(CategoriesContext);
    const [ totalPage, setTotalpage] = useState<number>(1);
    const [ url, setUrl ] = useState<string>();
    const [ postsData, setPostsData ] = useState<postsDataType[]>([]);

    const getJson = (url: string) => {
        axios.get(url).then((res) => {
            setTotalpage(Number(res.headers["x-wp-totalpages"]));
            setPostsData(res.data);
        })
    }
        

    useEffect(() => {
        if(categories) {
            const result = categories.find((value) => value.slug === category);
            if(result) {
                setUrl(`${apiUrl}posts?_embed&per_page=${perPage}&page=${page}&categories=${result.id}`);
            } else if (category == 'all') {
                setUrl(`${apiUrl}posts?_embed&per_page=${perPage}&page=${page}`);
            }
        }
    }, [categories]);

    useEffect(() => {
        if (url) {
            getJson(url);
        }
    }, [url]);

    const getCatSlug = (name: {}) => {
        const result = categories.find((value) => value.name === name);
        return result?.slug;
    };

    const recordList = postsData.map((value,i) => (
        <li key={i}>
            <article>
            <Link to={`/post/detail/${value.id}`}>
                <div className="txt-area">
                    <h2 className="title">{value.title.rendered}</h2>
                </div>
            </Link>
            <ul className="category">
                {value.category_name.map((cat, i, []) =>
                <li key={i}><Link to={`/post/${getCatSlug(cat)}/1`}>{cat}</Link></li>
                )}
            </ul>
            </article>
        </li>
    ));

    // ページャーの数を変数で対応すること
    const getPageNation = (totalPage: number) => {
        let startPage: number;
        let endPage: number;
        const numberPage: number = Number(page);
        const pageNation: JSX.Element[]  = [];

        if(numberPage + 3 > totalPage) {
            endPage = totalPage;
        } else {
            endPage = numberPage + 2;
        }

        if(numberPage < 3 ) {
            startPage = 1;
        } else if(numberPage + 2 > totalPage) {
            startPage = numberPage - ((numberPage + 4) - totalPage);
        } else {
            startPage = numberPage - 2;
        }

        if(endPage < 5 ) {
            startPage = 1;
            if(numberPage < 3) {
                endPage = endPage + ((numberPage - 3) * -1);
                if (endPage > totalPage) {
                    endPage = totalPage;
                }
            }
        }

        for(let i = startPage; i <= endPage; i++) {
            if (numberPage == i) {
                pageNation.push(
                    <li key={i}>{i}</li>
                )
            } else if (i == 1) {
                pageNation.push(
                    <li key={i}><Link to={'/'}>{i}</Link></li>
                )
            } else {
                pageNation.push(
                    <li key={i}><Link to={`/post/${category}/${i}`}>{i}</Link></li>
                )            
            }
        }

        return pageNation;
    };

    return (
        <article>
            <Scontents>
                <ul>
                    { recordList }
                </ul>
                <ol>
                    { getPageNation(totalPage) }
                </ol>
            </Scontents>
        </article>
    );
});
