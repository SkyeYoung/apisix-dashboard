import { API_STREAM_ROUTES } from '@/config/constant';
import { req } from '@/config/req';
import type { A6Type } from '@/types/schema/apisix';
import { queryOptions } from '@tanstack/react-query';

export const streamRoutesQueryOptions = queryOptions({
  queryKey: ['stream_routes'],
  queryFn: () =>
    req
      .get<unknown, A6Type['RespRouteList']>(API_STREAM_ROUTES)
      .then((v) => v.data),
});
