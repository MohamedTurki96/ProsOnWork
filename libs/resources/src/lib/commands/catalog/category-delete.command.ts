import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { CategoryGetDTO } from "../../dtos/catalog/category.dto";


@SerializeableCommand({ resource: "category", action: "delete" })
export class CategoryDeleteCommand implements ICommand<CategoryGetDTO> {
  constructor(readonly payload: CategoryGetDTO) {}
}
