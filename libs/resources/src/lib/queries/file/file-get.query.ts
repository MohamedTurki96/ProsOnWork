import { IQuery, SerializeableQuery } from '@pros-on-work/utils';

import { MediaGetDTO } from '../../dtos/file/media-get.dto';


@SerializeableQuery({ resource: 'file', action: 'read' })
export class MediaGetQuery implements IQuery<MediaGetDTO> {
  constructor(readonly payload: MediaGetDTO) {}
}
