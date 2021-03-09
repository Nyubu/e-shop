import { Cache, QueryInput } from '@urql/exchange-graphcache';

// Cast types for cache exchange
export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query // Gives result type and query type to update
) {
  return cache.updateQuery(qi, data => fn(result, data as any) as any);
}
