import { useQuery } from "@tanstack/react-query";
import { CategoriesService } from "../services/categoriesService";

export const CATEGORIES_QUERY_KEY = ["categories"];

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: CategoriesService.findAll,
  });
}
