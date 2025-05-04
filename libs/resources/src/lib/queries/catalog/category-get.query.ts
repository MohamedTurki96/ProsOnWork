import { IQuery, SerializeableQuery } from "@pros-on-work/utils"

import { CategoryGetDTO } from "../../dtos/catalog/category.dto";


@SerializeableQuery({ resource: "category", action: "read" })
export class CategoryGetQuery implements IQuery<CategoryGetDTO> {
  constructor(readonly payload: CategoryGetDTO) {}
}
