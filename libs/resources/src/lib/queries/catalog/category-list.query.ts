import { IQuery, SerializeableQuery } from "@pros-on-work/utils";

import { CategoryListDTO } from "../../dtos/catalog/category-list.dto";


@SerializeableQuery({ resource: "category", action: "list" })
export class CategoryListQuery implements IQuery<CategoryListDTO> {
  constructor(readonly payload: CategoryListDTO) {}
}
