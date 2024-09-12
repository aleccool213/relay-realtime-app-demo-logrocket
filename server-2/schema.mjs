import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const typeDefs = `#graphql    
    type Query {
      currentNumber: Int!
    }

    type Subscription {
      storyLikeCount: Int!
    }
`;

export const resolvers = {
  Query: {
    currentNumber() {
      return currentNumber;
    },
  },
  Subscription: {
    storyLikeCount: {
      subscribe: () => pubsub.asyncIterator("STORY_LIKE_COUNT"),
    },
  },
};

let currentNumber = 0;

function incrementStoryLikeCount() {
  currentNumber++;
  pubsub.publish("STORY_LIKE_COUNT", { storyLikeCount: currentNumber });
  setTimeout(incrementStoryLikeCount, 1000);
}

// Start incrementing
incrementStoryLikeCount();
