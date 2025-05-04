import { ICommand, SerializeableCommand } from "@pros-on-work/utils";

import { CategoryUpdateCommandDTO } from "../../dtos/catalog/category.dto";


@SerializeableCommand({ resource: 'category', action: 'update' })
export class CategoryUpdateCommand implements ICommand<CategoryUpdateCommandDTO> {
  constructor(readonly payload: CategoryUpdateCommandDTO) {}
}
