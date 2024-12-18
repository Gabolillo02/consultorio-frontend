import { ApolloClient, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { InMemoryCache } from 'apollo-cache-inmemory';


//Crear httpLink
const httpLink = new HttpLink({
  //uri: 'http://localhost:4000/graphql'
  uri: 'https://agenda-citas-y0io.onrender.com/graphql'
});

//Crear un link de websocket
const wsLink = new WebSocketLink({
  //uri: 'http://localhost:4000/graphql',
  uri: 'https://agenda-citas-y0io.onrender.com/graphql',
  options:{
    reconnect: true
  }
});

//Crear split link
//Significa que:
// si se está intentando una suscripcion, entonces usa los webSockets
// si se está intentando cualquier otra cosa, entonces usa el httpLink
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);


export const getClient = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: splitLink
    });
};
