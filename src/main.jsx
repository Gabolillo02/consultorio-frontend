// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App'
import '../index.css'

import { ApolloClient, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks'
import { AuthProvider } from './AuthContext.jsx';

//Crear httpLink
const httpLink = new HttpLink({
  uri: 'https://agenda-citas-y0io.onrender.com/graphql'
});

//Crear un link de websocket
const wsLink = new WebSocketLink({
  uri: 'https://agenda-citas-y0io.onrender.com/graphql',
  options: {
    reconnect: true
  }
});

//Crear split link
//Significa que:
// si se está intentando una suscripcion, entonces usa los webSockets
// si se está intentando cualquier otra cosa, entonces usa el httpLink
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <NextUIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NextUIProvider>
    </React.StrictMode>
  </ApolloProvider>,
)