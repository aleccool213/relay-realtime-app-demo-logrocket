import {
  Store,
  RecordSource,
  Environment,
  Network,
  Observable,
} from "relay-runtime";
import type { FetchFunction, IEnvironment, SubscribeFunction } from "relay-runtime";
import { createClient } from 'graphql-ws';

const fetchFn: FetchFunction = (params, variables) => {
  const response = fetch("/api", {
    method: "POST",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return Observable.from(response.then((data) => data.json()));
};

const wsClient = createClient({
  url:'ws://localhost:8081/graphql',
  lazy: true,
  keepAlive: 1000,
});

const subscribe: SubscribeFunction = (operation, variables) => {
  return Observable.create((sink) => {
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      (sink as any),
    );
  });
}

export function createEnvironment(): IEnvironment {
  const network = Network.create(fetchFn, subscribe);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}
