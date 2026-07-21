import { httpClient } from "../httpClient";
import type { Category } from "../../entities/Category";

export async function findAll() {
  const { data } = await httpClient.get<Category[]>("/categories");
  return data;
}
