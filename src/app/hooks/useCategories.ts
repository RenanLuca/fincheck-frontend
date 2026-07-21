import { useQuery } from "@tanstack/react-query";
import { CategoriesService } from "../services/categoriesService";

export const CATEGORIES_QUERY_KEY = ["categories"];

export function useCategories() {
  const { data: categories = [], ...query } = useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: CategoriesService.findAll,
    staleTime: 1000 * 60 * 5,
  });

  return { categories, ...query };
}
