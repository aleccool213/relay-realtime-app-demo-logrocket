import * as React from "react";
import {
  useFragment,
  graphql,
  useMutation,
  useSubscription,
} from "react-relay";

import type { StoryLikeButtonFragment$key } from "./__generated__/StoryLikeButtonFragment.graphql";

type Props = {
  story: StoryLikeButtonFragment$key;
};

const StoryLikeButtonFragment = graphql`
  fragment StoryLikeButtonFragment on Story {
    id
    likeCount
    doesViewerLike
  }
`;

const StoryLikeButtonLikeMutation = graphql`
  mutation StoryLikeButtonLikeMutation($id: ID!, $doesLike: Boolean!) {
    likeStory(id: $id, doesLike: $doesLike) {
      story {
        ...StoryLikeButtonFragment
      }
    }
  }
`;

function useStoryLikeCountSubscription(storyId: string) {
  return useSubscription({
    subscription: graphql`
      subscription StoryLikeButtonSubscription {
        storyLikeCount
      }
    `,
    variables: {},
    // update the store with the new like count
    updater(store) {
      const story = store.get(storyId);
      if (story) {
        const likeCount = story.getValue("likeCount");
        if (typeof likeCount === "number") {
          story.setValue(likeCount + 1, "likeCount");
        }
      }
    },
  });
}

export default function StoryLikeButton({ story }: Props): React.ReactElement {
  const data = useFragment<StoryLikeButtonFragment$key>(
    StoryLikeButtonFragment,
    story
  );
  useStoryLikeCountSubscription(data.id);
  const [commitMutation] = useMutation(StoryLikeButtonLikeMutation);
  const onLikeButtonClicked = () => {
    commitMutation({
      variables: {
        id: data.id,
        doesLike: !data.doesViewerLike,
      },
      optimisticResponse: {
        likeStory: {
          story: {
            id: data.id,
            likeCount: data.likeCount + (data.doesViewerLike ? -1 : 1),
            doesViewerLike: !data.doesViewerLike,
          },
        },
      },
    });
  };
  return (
    <div className="likeButton">
      <LikeCount count={data.likeCount} />
      <LikeButton
        doesViewerLike={data.doesViewerLike}
        onClick={onLikeButtonClicked}
      />
    </div>
  );
}

function LikeCount({ count }: { count: number }) {
  return <div className="likeButton__count">{count} likes</div>;
}

function LikeButton({
  doesViewerLike,
  onClick,
  disabled,
}: {
  doesViewerLike: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="likeButton__button"
      onClick={onClick}
      disabled={disabled}
    >
      <span
        className={
          doesViewerLike
            ? "likeButton__thumb__viewerLikes"
            : "likeButton__thumb__viewerDoesNotLike"
        }
      >
        👍
      </span>{" "}
      <span
        className={
          doesViewerLike
            ? "likeButton__label__viewerLikes"
            : "likeButton__label__viewerDoesNotLike"
        }
      >
        Like
      </span>
    </button>
  );
}
