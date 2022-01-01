import { useContext } from "react";
import { CategoriesContext } from "../components/providers/CategoriesProvider";

export const useGetCategorySlug = () => {
    const categories = useContext(CategoriesContext);
    const getCategorySlug = (name: {} | string) => {
        const result = categories.find((value) => value.name === name);
        return result?.slug;
    };

    return { getCategorySlug };
};