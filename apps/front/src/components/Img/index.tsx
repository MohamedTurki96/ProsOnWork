import { ImgHTMLAttributes, useMemo } from 'react';

import { useFileApi } from '../../hooks/useApi';

type ImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  mediaId?: number;
};

export function Img(props: ImgProps) {
  const api = useFileApi();

  const src = useMemo(() => {
    return (props.src ?? props.mediaId)
      ? `${api.http.baseUrl}/files/${props.mediaId}/serve`
      : null;
  }, [props.src, props.mediaId, api]);

  if (!src) {
    return null;
  }

  const imgProps = {...props}
  delete imgProps.mediaId

  return <img {...imgProps} src={src} />;
}
