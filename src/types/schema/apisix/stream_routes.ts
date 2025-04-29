import { z } from 'zod';
import { A6Common } from './common';
import { A6Upstreams } from './upstreams';
import { A6Plugins } from './plugins';

const StreamRouteProtocolLogger = z.object({
  name: z.string(),
  conf: z.object({}),
  filter: z.array(z.any()),
});

const StreamRouteProtocol = z.object({
  name: z.string(),
  conf: z.object({}),
  superior_id: z.string(),
  logger: z.array(StreamRouteProtocolLogger),
});

const StreamRoute = z
  .object({
    remote_addr: z.string(),
    server_addr: z.string(),
    server_port: A6Common.Port,
    sni: z.string(),
    upstream: A6Upstreams.Upstream,
    upstream_id: z.string(),
    service_id: z.string(),
    plugins: A6Plugins.Plugins,
    protocol: StreamRouteProtocol,
  })
  .partial()
  .merge(A6Common.Basic);

export const A6StreamRoutes = {
  StreamRoute,
  StreamRouteProtocol,
  StreamRouteProtocolLogger,
};
