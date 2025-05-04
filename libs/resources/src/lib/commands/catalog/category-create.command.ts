import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { CategoryCreateDTO } from "../../dtos/catalog/category.dto";


@SerializeableCommand({ resource: "category", action: "create" })
export class CategoryCreateCommand implements ICommand<CategoryCreateDTO> {
  constructor(readonly payload: CategoryCreateDTO) {}
}
