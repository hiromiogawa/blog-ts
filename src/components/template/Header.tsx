import { FC, memo, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoriesContext } from '../providers/CategoriesProvider'; 
import styled, { css } from 'styled-components';
import { Scontents } from '../../style/commonStyle';
import { Color } from '../../style/styleSetting';
import { CustomMedia } from '../../style/customMedia';

export const Header: FC = memo(() => {
    const categories = useContext(CategoriesContext);
    const [ menuFlug, setMenuFlug ] = useState<boolean>(false);


    const categoryList = categories.map((value,i) => (
        <li key={i}>
            <Link to={`/post/${value.slug}/1`}>{value.name}</Link>
        </li>
    ));

    const onClickMenu = () => {
        setMenuFlug(!menuFlug);
    }

    return (
        <Sheader>
            <Scontents>
                <h1><Link to="/">HIROMEMO</Link></h1>
                <Snav flug={ menuFlug }>
                    <ul>
                        <li><Link to="/">All</Link></li>
                        { categoryList }
                    </ul>
                </Snav>
                <SmenuButton flug={ menuFlug } onClick={() => onClickMenu()}>
                    <span></span><span></span><span></span>
                </SmenuButton>
                </Scontents>
        </Sheader>
    );
});

type flugType = {
    flug: boolean,
};

const Sheader = styled.header`
    position: relative;
    padding: 16px 0;
    background-color: ${Color.whitesmoke};
    font-weight: bold;
    margin-bottom: 80px;
    z-index: 999;

    a {
        text-decoration: none;
    }
    
    h1 {
        font-family: 'OriginalSurfer_Regular';
        font-size: 32px;
        ${CustomMedia.lessThan("tb")`
            font-size: 24px;
        `};

        a {
            color: ${Color.black01};
            &:hover {
                color: ${Color.green01};
            }
        }
    }


    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const Snav = styled.nav<flugType>`
    display: inline-block;
    ${(props) => CustomMedia.lessThan('tb')`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: ${Color.black01};
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .35s;
        opacity: ${props.flug? "1" : "0"};
        visibility: ${props.flug? "visible" : "hidden"};
    `};

    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'OriginalSurfer_Regular';
        ${CustomMedia.lessThan('tb')`
            display: block;
        `};
        
        li {

            &:not(:last-of-type) {
                margin-right: 16px;
                ${CustomMedia.lessThan('tb')`
                    margin-right: 0;
                    margin-bottom: 24px;
                `};
            }

            a {
                color: ${Color.black01};
                ${CustomMedia.lessThan('tb')`
                    font-size: 24px;
                    color: ${Color.whitesmoke};
                `};
                &:hover {
                    color: ${Color.green01};
                }
            }
        }
    }
`

const SmenuButton = styled.div<flugType>`
    display: none;
    position: absolute;
    top: 50%;
    right: 16px;
    width: 32px;
    height: 24px;
    transform: translateY(-50%);
    z-index: 1000;
    cursor: pointer;
    ${CustomMedia.lessThan("tb")`
        display: block;
    `};

    span {
        position: absolute;
        left: 50%;
        width: 100%;
        height: 2px;
        background-color: ${(props) => props.flug? Color.whitesmoke : Color.black01};
        transition: transform .35s;
        border-radius: 4px;

        &:nth-of-type(1) {
            top: ${(props) => props.flug? "50%" : "0"};
            transform: ${(props) => props.flug? "translate(-50%,-50%) rotate(45deg)" : "translateX(-50%)"};
        }

        &:nth-of-type(2) {
            top: 50%;
            transform: translate(-50%, -50%);
            transition: opacity .35s;
            opacity: ${(props) => props.flug? "0" : "1"};
        }

        &:nth-of-type(3) {
            top: ${(props) => props.flug? "50%" : "100%"};
            transform: ${(props) => props.flug?"translate(-50%,-50%) rotate(-45deg)" : "translate(-50%, -100%)"};
        }
    }

    &:hover {
        span {
            background-color: ${Color.green01};
        }
    }
`