import * as React from "react";
import Story from "./Story";
import { useLazyLoadQuery, graphql } from "react-relay";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStory {
      ...StoryFragment
    }
  }
`;

// eslint-disable-next-line no-empty-pattern
export default function Newsfeed({}) {
  const data = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});
  const story = data.topStory;
  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
