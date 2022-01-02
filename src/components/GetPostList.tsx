import { useState, memo, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CategoriesContext } from './providers/CategoriesProvider';
import { LoadFlugContext } from './providers/LoadFlugProvider';
import { apiUrl } from '../setting/setting';
import { Scontents } from '../style/commonStyle';
import { useGetCategorySlug } from '../hook/useGetCategorySlug';
import axios from 'axios';
import styled from 'styled-components';
import { Color } from '../style/styleSetting'

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
    }[],
    acf: {
        [s: string]: string
    }
};

type propsType = {
    page: number,
    perPage: number,
    category: string,
    serchText?: string
};

export const GetPostList = memo((props: propsType) => {
    const { page, perPage, category, serchText } = props;
    const categories = useContext(CategoriesContext);
    const { loadFlug ,setLoadFlug } = useContext(LoadFlugContext);
    const [ totalPage, setTotalpage] = useState<number>(0);
    const [ url, setUrl ] = useState<string>();
    const [ inputText, setInputText ] = useState<string>();
    const [ postsData, setPostsData ] = useState<postsDataType[]>([]);
    const { getCategorySlug } = useGetCategorySlug();
    const navigate = useNavigate();

    const getJson = (url: string) => {
        axios.get(url).then((res) => {
            setTotalpage(Number(res.headers["x-wp-totalpages"]));
            setPostsData(res.data);
            setLoadFlug(false);
        })
    };

    useEffect(() => {
        setLoadFlug(true);
        if(categories) {
            const result = categories.find((value) => value.slug === category);
            if(result) {
                setUrl(`${apiUrl}posts?per_page=${perPage}&page=${page}&categories=${result.id}`);
            } else if (category == 'all') {
                setUrl(`${apiUrl}posts?per_page=${perPage}&page=${page}`);
            } else if (category == "serch") {
                setUrl(`${apiUrl}posts?per_page=${perPage}&page=${page}&search=${inputText}`);
            }
        }
    }, [categories, page, category, serchText]);

    useEffect(() => {
        if (url) {
            getJson(url);
        }
    }, [url]);

    const recordList = postsData.map((value,i) => (
        <li key={i}>
            <article>
            <Link to={`/post/detail/${value.id}`}>
                <div>
                    <img src={value.acf.thumb} alt="" />
                </div>
                <div>
                    <h2>{value.title.rendered}</h2>
                </div>
            </Link>
            <ul>
                {value.category_name.map((cat, i, []) =>
                <li key={i}><Link to={`/post/${getCategorySlug(cat)}/1`}>{cat}</Link></li>
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


    // 検索
    const doChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
            setInputText(value);
    };

    const doAction = () => {
        navigate(`/post/serch/${inputText}/1`);
    }   

    return (
        <article>
            <Scontents>
                <Ssearchbox>
                <Ssearchtxt>
                {(() => {
                    console.log(serchText);
                })()}
                    {serchText &&  <p>検索:{serchText}</p>}
                </Ssearchtxt>
                    <Ssearch>
                        <input type="text" onChange={doChange} />
                        <button onClick={doAction} disabled={!inputText}>serch</button>
                    </Ssearch>
                </Ssearchbox>
                {(() => {
                    if (postsData.length) {
                        return(
                            <div>
                                <ul>{ recordList }</ul>
                                <ol>{ getPageNation(totalPage) }</ol>
                            </div>
                        )
                    } else if(!loadFlug) {
                        return(
                            <div>
                                <p>該当の記事がありません</p>
                                <Link to="/">トップに戻る</Link>
                            </div>
                        )
                    }
                })()}
            
            </Scontents>
        </article>
    );
});

const Ssearchbox = styled.div`
    display: flex;
    justify-content: space-between;

    p {
        color: ${Color.whitesmoke};
    }

`

const Ssearchtxt = styled.div`
    
`

const Ssearch = styled.div`
    
`