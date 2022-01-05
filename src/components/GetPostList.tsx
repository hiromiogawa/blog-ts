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
import { CustomMedia } from '../style/customMedia';

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
                setUrl(`${apiUrl}posts?per_page=${perPage}&page=${page}&search=${serchText}`);
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
                    <div><img src={value.acf.thumb} alt="" /></div>
                    <h2>{value.title.rendered}</h2>
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
                    <li key={i}><span>{i}</span></li>
                )
            } else if (i == 1) {
                if(serchText) {
                    pageNation.push(
                        <li key={i}><Link to={`/post/serch/${serchText}/${i}`}>{i}</Link></li>
                    )
                } else {
                    pageNation.push(
                        <li key={i}><Link to={'/'}>{i}</Link></li>
                    )
                }
            } else {
                if(serchText) {
                    pageNation.push(
                        <li key={i}><Link to={`/post/serch/${serchText}/${i}`}>{i}</Link></li>
                    )
                } else {
                    pageNation.push(
                        <li key={i}><Link to={`/post/${category}/${i}`}>{i}</Link></li>
                    )     
                }       
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
        if (inputText) {
            if (inputText.match(/\//)) {
                alert("検索に/は使用できません");
            } else {
                navigate(`/post/serch/${inputText}/1`);
            }
        }
    }   

    return (
        <Scontents>
            <Ssearchbox>
                <Ssearchtxt>
                    {serchText &&  <p>検索キーワード: {serchText}</p>}
                </Ssearchtxt>
                <Ssearch>
                    <input type="text" onChange={doChange} />
                    <button onClick={doAction} disabled={!inputText}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16 fa-lg " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color="#dcdcdc"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg></button>
                </Ssearch>
            </Ssearchbox>
            {(() => {
                if (postsData.length) {
                    return(
                        <div>
                            <SrecordList>{ recordList }</SrecordList>
                            <Spagenavi>{ getPageNation(totalPage) }</Spagenavi>
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
    );
});

const Ssearchbox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    ${CustomMedia.lessThan("tb")`
        display: block;
    `};

    p {
        color: ${Color.whitesmoke};
        padding-right: 24px;
    }

`

const Ssearchtxt = styled.div`
    font-size: 18px;
    ${CustomMedia.lessThan("tb")`
        font-size: 16px;
        text-align: center;
    `};
`

const Ssearch = styled.div`
    display: flex;
    justify-content: center;
    
    input {
        cursor: pointer;
        border: none;
        background: ${Color.whitesmoke};
        outline : none;
        padding: 8px;
        width: 320px;
        border: solid 1px ${Color.green01};
    }

    button {
        cursor: pointer;
        background-color: ${Color.green01};
        width: 40px;
        border: none;
        border: solid 1px ${Color.green01};
        border-left: none;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 16px;
            color: ${Color.whitesmoke};
            line-height: 1;
        }

        &:disabled {
            cursor: auto;
            filter: grayscale(1);
        }

        &:hover:not(:disabled) {
            background-color: ${Color.black01};

            svg {
                color: ${Color.green01};
            }
            
        }
        
    }
`

const SrecordList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    
    
    > li {
        width: calc((100% - 80px) / 3);
        background-color: ${Color.whitesmoke};
        ${CustomMedia.lessThan("tb")`
            width: calc((100% - 24px) / 2);
        `};

        article {

            a {
                display: block;
                text-decoration: none;
            }

            h2 {
                margin-top: 12px;
                padding: 0 12px;
                line-height: 1.4;
                color: ${Color.black01};
            }

            > a {
                transition: .35s;

                div {
                    overflow: hidden;
                    transition: .35s;
                }

                &:hover {

                    img {
                        filter: drop-shadow(16px 16px 20px red) invert(75%);
                    }
                    
                    h2 {
                        color: ${Color.green01};
                    }
                }
            }
        }

        &:not(:nth-of-type(2n)) {
            ${CustomMedia.lessThan("tb")`
                margin-right: 24px !important;
            `};
        }

        &:not(:nth-of-type(3n)) {
            margin-right: 40px;
            ${CustomMedia.lessThan("tb")`
                margin-right: 0;
            `};
        }
        &:not(:nth-of-type(-n+2)) {
            ${CustomMedia.lessThan("tb")`
                margin-top: 24px;
            `};
        }

        &:not(:nth-of-type(-n+3)) {
            margin-top: 40px;
            ${CustomMedia.lessThan("tb")`
                margin-top: 0;
            `};
        }
    }

    ul {
        padding: 12px;
        display: flex;
        flex-wrap: wrap;

        li {

            a {
                font-size: 12px;
                color: ${Color.black01};

                &:hover {
                    color: ${Color.green01};
                }
            }

            &:not(:first-of-type) {
                margin-left: 8px;
            }
        }
    }
`

const Spagenavi = styled.ol`
    display: flex;
    justify-content: center;
    margin-top: 40px;

    a {
        display: block;
        text-decoration: none;
        background-color: ${Color.green01};
        color: ${Color.whitesmoke};

        &:hover {
            background-color: ${Color.black01};
            color: ${Color.whitesmoke};
        }
    }

    span {
        color: ${Color.whitesmoke};
        background-color: ${Color.black01};
    }

    li {
        border: solid 1px ${Color.green01};

        > * {
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &:not(:last-of-type) {
            margin-right: 8px;
        }
    }
`