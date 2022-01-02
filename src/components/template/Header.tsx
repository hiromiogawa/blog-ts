import { FC, memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CategoriesContext } from '../providers/CategoriesProvider'; 
import styled from 'styled-components';
import { Scontents } from '../../style/commonStyle';
import { Color } from '../../style/styleSetting'

type urlParams = {
    page: string,
    category: string
}

export const Header: FC = memo(() => {
    const categories = useContext(CategoriesContext);


    const categoryList = categories.map((value,i) => (
        <li key={i}>
            <Link to={`/post/${value.slug}/1`}>{value.name}</Link>
        </li>
    ));

    return (
        <Sheader>
            <Scontents>
                <h1><Link to="/">HIROMEMO</Link></h1>
                <nav>
                    <ul>
                        <li><Link to="/">All</Link></li>
                        { categoryList }
                    </ul>
                </nav>
                </Scontents>
        </Sheader>
    );
});

const Sheader = styled.header`
    padding: 16px 0;
    background-color: ${Color.whitesmoke};
    font-weight: bold;
    margin-bottom: 80px;

    a {
        text-decoration: none;
    }
    
    h1 {
        font-family: 'OriginalSurfer_Regular';
        font-size: 32px;
    }


    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav {
        display: inline-block;

        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'OriginalSurfer_Regular';
            
            li {

                &:not(:last-of-type) {
                    margin-right: 16px;
                }
            }
        }
    }
`
