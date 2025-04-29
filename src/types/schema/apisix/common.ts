import { z } from 'zod';

const Labels = z.record(z.string());

const Expr = z.array(z.unknown());

const Basic = z
  .object({
    name: z.string(),
    desc: z.string(),
    labels: Labels,
  })
  .partial();

const ID = z.object({
  id: z.string(),
});

const Timestamp = z.object({
  create_time: z.number(),
  update_time: z.number(),
});

const Info = ID.merge(Timestamp);

const Port = z.number().int().gte(1).lte(65535);

export const A6Common = {
  Basic,
  Labels,
  Expr,
  ID,
  Timestamp,
  Info,
  Port,
};
