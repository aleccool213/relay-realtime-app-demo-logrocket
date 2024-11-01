import * as React from "react";
import Card from "./Card";
import Heading from "./Heading";
import PosterByline from "./PosterByline";
import StorySummary from "./StorySummary";
import Image from "./Image";
import { graphql, useFragment } from "react-relay";
import Timestamp from "./Timestamp";
import { StoryFragment$key } from "./__generated__/StoryFragment.graphql";
import StoryLikeButton from "./StoryLikeButton";

const StoryFragment = graphql`
  fragment StoryFragment on Story {
    title
    summary
    createdAt
    poster {
      name
      profilePicture {
        url
      }
    }
    thumbnail {
      url
    }
    ...StoryLikeButtonFragment
  }
`;

type Props = {
  story: StoryFragment$key;
};

export default function Story({ story }: Props): React.ReactElement {
  const data = useFragment(StoryFragment, story);
  return (
    <Card>
      <PosterByline poster={data.poster} />
      <Heading>{data.title}</Heading>
      <Timestamp time={data.createdAt} /> // Add this line
      <Image image={data.thumbnail} width={400} height={400} />
      <StorySummary summary={data.summary} />
      <StoryLikeButton story={data} />
    </Card>
  );
}
