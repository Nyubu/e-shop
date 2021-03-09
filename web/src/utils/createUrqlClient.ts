import { cacheExchange} from '@urql/exchange-graphcache';
import Router from 'next/router';
import { dedupExchange, Exchange, fetchExchange,  } from 'urql';
import { pipe, tap } from 'wonka';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
import { betterUpdateQuery } from './betterUpdateQuery';
import { isServer } from './isServer';

const errorExchange: Exchange = ({ forward }) => ops$ => { // Handle errors globally

  return pipe(
    forward(ops$),
    tap(({ error }) => {      
      if (error?.message.includes('not authenticated')) {
        Router.replace("/login") // replaces current route in history
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {

  let cookie = '';
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,     
      headers: cookie ? { cookie } : undefined            
    },
    exchanges: [dedupExchange, cacheExchange({  // Update the cache
      keys: {
        // PaginatedProducts: () => null,
      },
      resolvers: {
        Query: {
          // products: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            // Return null from me query
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {query: MeDocument },
              _result,
              () => ({ me: null })
            )
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache, 
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) { // error occurred
                  return query // return current query
                } else {
                  return {
                    me: result.login.user, // return user from me query
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache, 
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            )
          },
        },
      },
    }), 
    errorExchange,
    ssrExchange,
    fetchExchange,
    ],
  }
}