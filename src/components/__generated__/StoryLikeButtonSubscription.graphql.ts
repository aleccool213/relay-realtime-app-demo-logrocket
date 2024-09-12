/**
 * @generated SignedSource<<a189d7f2e714c1833e5deac9a8015936>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type StoryLikeButtonSubscription$variables = {};
export type StoryLikeButtonSubscription$data = {
  readonly storyLikeCount: number;
};
export type StoryLikeButtonSubscription = {
  response: StoryLikeButtonSubscription$data;
  variables: StoryLikeButtonSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "storyLikeCount",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "StoryLikeButtonSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "StoryLikeButtonSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "692b86add293b40d7436aea5932b81b3",
    "id": null,
    "metadata": {},
    "name": "StoryLikeButtonSubscription",
    "operationKind": "subscription",
    "text": "subscription StoryLikeButtonSubscription {\n  storyLikeCount\n}\n"
  }
};
})();

(node as any).hash = "3296601365f5f9d57858561f00ac2118";

export default node;
