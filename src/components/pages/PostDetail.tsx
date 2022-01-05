import { FC, useState, useEffect, memo, useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Scontents } from '../../style/commonStyle';
import { CategoriesContext } from '../providers/CategoriesProvider';
import { LoadFlugContext } from '../providers/LoadFlugProvider';
import { useGetCategorySlug } from '../../hook/useGetCategorySlug';
import { apiUrl } from '../../setting/setting';
import axios from 'axios';
import { siteName } from '../../setting/setting';
import { Color } from '../../style/styleSetting';
import { CustomMedia } from '../../style/customMedia';

type urlParams = {
    id: string
};

type postsDataType = {
    id: number,
    date: string,
    modified: string,
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

    const dateCompaile = (val: string) => {
        const str = val,
        replace = str.replace(/-/g, '/').replace('T', ' '),
        date = new Date(replace),
        yy = date.getFullYear(),
        mm = date.getMonth() + 1,
        dd = date.getDate();
        return (yy + '.' + mm + '.' + dd);
    } 


    return (
        <Scontents>
            {postsData && 
                <Sarticle>
                    <Shead>
                        <Sdate>
                            <p>投稿日: {dateCompaile(postsData.date)}</p>
                            {(() => {
                                if(dateCompaile(postsData.date) != dateCompaile(postsData.modified)) {
                                    return <p>更新日: {dateCompaile(postsData.modified)}</p>
                                }
                            })()}
                        </Sdate>
                        <h1>{postsData.title.rendered}</h1>
                        <ul>{postsData.category_name.map((cat, i) =>
                            <li key={i}><Link to={`/post/${getCategorySlug(cat)}/1`}>{cat}</Link></li>
                        )}</ul>
                    </Shead>
                    
                    <Scontent dangerouslySetInnerHTML={{ __html: postsData.content.rendered }} />
                </Sarticle>
                
            }

            <Sbutton><Link to="/">一覧へ戻る</Link></Sbutton>
        </Scontents>
    );
});

const Sarticle = styled.article`
    background-color: ${Color.whitesmoke};
    padding: 40px;
    ${CustomMedia.lessThan("tb")`
        padding: 16px;
    `};
`

const Shead = styled.div`
    margin-bottom: 32px;

    h1 {
        font-size: 32px;
        margin-bottom: 16px;
    }

    ul {
        display: flex;

        li {
            font-size: 12px;

            a {
                text-decoration: none;
            }

            &:not(:last-of-type) {
                margin-left: 8px;
            }
        }
    }
`

const Sdate = styled.article`
    display: flex;
    margin-bottom: 12px;
    p {
        font-size: 12px;
        line-height: 1;

        &:not(:last-of-type) {
            margin-right: 8px;
        }
    }
`

const Scontent = styled.div`
    line-height: 1.4;
    
    > * {

        &:first-child {
            margin-top: 0 !important;
        }

        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }

    h2 {
        padding: 16px ;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 24px;
        color: ${Color.whitesmoke};
        background-color: ${Color.green01};;
        border-radius: 4px;
        margin-top: 48px;
    }

    h3 {
        padding: 8px 8px 8px 18px;
        font-size: 1.25rem;
        position: relative;
        background-color: ${Color.gray};
        margin-bottom: 1.25rem;
        margin-top: 32px;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background-color: ${Color.green01};
            height: 100%;
            width: 8px;
        }
    }

    h4 {
        font-size: 18px;
        color: ${Color.green01};
        font-weight: bold;
        margin-bottom: 18px;
        margin-top: 24px;
    }

    ul,ol {
        list-style: none;

        li {

            &:not(:last-of-type) {
                margin-bottom: 12px;
            }
        }
    }

    ol {
    counter-reset: number 0;

        li {
            position: relative;
            padding-left: 1em;

            &::before {
                position: absolute;
                counter-increment: number 1; 
                content: counter(number);
                left: 0;
                top: 0;
                color: ${Color.green01};
                font-weight: bold;
                font-family: 'OriginalSurfer_Regular';
            }
        }
    }

    pre {
        white-space: pre-wrap ;
    }

    code {
        background-color: #000;
        display: block;
        padding: 8px;
        color: #FFF;
    }

    table {
        width: 100%;
        border-bottom: solid 1px ${Color.green01};
        table-layout: fixed;

        tr {
            border: solid 1px ${Color.green01};
            border-bottom: none;
        }

        th {
            background-color: ${Color.green01};
            color: ${Color.whitesmoke};

            &:not(:last-child) {
                border-right: solid 1px ${Color.whitesmoke};
            }
        }

        td {

            &:not(:last-child) {
                border-right: solid 1px ${Color.green01};
            }
        }

        th,td {
            padding: 12px;
        }
    }
`

const Sbutton = styled.div`
    text-align: center;
    margin-top: 40px;

    a {
        display: inline-block;
        width: 240px;
        text-decoration: none;
        line-height: 1;
        padding: 16px;
        border: solid 1px ${Color.green01};
        background-color: ${Color.green01};
        color: ${Color.whitesmoke};

        &:hover {
            background-color: ${Color.black01};
            color: ${Color.whitesmoke};
        }
    }
`