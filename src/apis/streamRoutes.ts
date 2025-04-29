import { API_STREAM_ROUTES } from '@/config/constant';
import { req } from '@/config/req';
import type { A6Type } from '@/types/schema/apisix';
import type { PageSearchType } from '@/types/schema/pageSearch';
import { queryOptions } from '@tanstack/react-query';

export const streamRoutesQueryOptions = (props: PageSearchType) => {
  const { page, pageSize } = props;
  return queryOptions({
    queryKey: ['stream_routes', page, pageSize],
    queryFn: () =>
      req
        .get<unknown, A6Type['RespStreamRouteList']>(API_STREAM_ROUTES, {
          params: { page, page_size: pageSize },
        })
        .then((v) => v.data),
  });
};

export const streamRouteDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['stream_route', id],
    queryFn: () =>
      req
        .get<unknown, A6Type['RespStreamRouteDetail']>(
          `${API_STREAM_ROUTES}/${id}`
        )
        .then((v) => v.data),
  });

export const putStreamRouteReq = (data: A6Type['StreamRoute']) => {
  const { id, ...rest } = data;
  return req.put<A6Type['StreamRoute'], A6Type['RespStreamRouteDetail']>(
    `${API_STREAM_ROUTES}/${id}`,
    rest
  );
};
