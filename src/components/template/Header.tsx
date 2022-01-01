import { FC, useState, memo, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CategoriesContext } from '../providers/CategoriesProvider'; 
import axios from 'axios';

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
        <header>
            <nav>
                <ul>
                    <li><Link to="/post/all/1">全て</Link></li>
                    { categoryList }
                </ul>
            </nav>
        </header>
    );
});
