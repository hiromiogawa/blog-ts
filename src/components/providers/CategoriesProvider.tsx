import { createContext, useState, FC, useEffect } from "react";
import { apiUrl } from "../../setting/setting";
import axios from 'axios';

type CategoryType = {
    id: number,
    name: string,
    slug: string
};

export const CategoriesContext = createContext<CategoryType[]>([]);

export const CategorysProvider: FC = props => {
    const { children } = props;
    const [ categories, setCategories ] = useState<CategoryType[]>([]);
    const getJson = (url: string) => {
        axios.get(url).then((res) => {
            setCategories(res.data);
        })
    }
        
    useEffect(() => {
        getJson(`${apiUrl}categories?orderby=menu_order`);
    }, []);

    return (
        <CategoriesContext.Provider value={categories}>
            { children }
        </CategoriesContext.Provider> 
    );
};