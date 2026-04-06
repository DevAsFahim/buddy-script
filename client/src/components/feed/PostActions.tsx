import { useState } from "react";
import {
  useGetCommentsQuery,
  useGetLikersQuery,
  useToggleLikeMutation,
} from "../../redux/api/baseApi";
import LikersModal from "./LikersModal";
import CommentsModal from "./CommentsModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const PostActions = ({ post }: { post: any }) => {
  const [showLikers, setShowLikers] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.user);
  const currentUserId = currentUser?.userId;

  // get likers of this post
  const { data: likers } = useGetLikersQuery(post._id);
  // get comments of this post
  const { data: comments } = useGetCommentsQuery(post._id);

  const isLikedByMe = likers?.data.some((like: any) => like.userId._id === currentUserId);

  const [toggleLike] = useToggleLikeMutation();

  const handleLike = async () => {
    await toggleLike({ targetId: post._id, targetModel: "Post" });
  };

  return (
    <>
      {/* Reaction Stats Section */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div
          className="_feed_inner_timeline_total_reacts_image"
          onClick={() => setShowLikers(true)}
          style={{ cursor: "pointer" }}
        >
          <img src="assets/images/react_img1.png" className="_react_img1" />
          <p className="_feed_inner_timeline_total_reacts_para">
            {likers && likers.data.length > 0 ? `${likers.data.length}+` : "0"}
          </p>
        </div>

        <div className="_feed_inner_timeline_total_reacts_txt">
          <p
            onClick={() => setShowAllComments(!showAllComments)}
            style={{ cursor: "pointer" }}
          >
            <span>{comments && comments.data.length}</span> Comments
          </p>
        </div>
      </div>

      {/* Conditional Rendering of Likers Modal */}
      {showLikers && (
        <LikersModal targetId={post._id} onClose={() => setShowLikers(false)} />
      )}
      {/* {showAllComments && <CommentsModal postId={post._id} onClose={() => setShowAllComments(false)} />} */}

      <div className="_feed_inner_timeline_reaction">
        <button
          onClick={handleLike}
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLikedByMe ? "_feed_reaction_active" : ""}`}
        >
          <span className="_feed_inner_timeline_reaction_link">
            {/* Like */}
            <span>
              {isLikedByMe ? (
                <span className="_feed_inner_timeline_reaction_emoji_txt">
                  Liked
                </span>
              ) : (
                <span className="_feed_inner_timeline_reaction_emoji_txt">
                  Like
                </span>
              )}
            </span>
          </span>
        </button>
        <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            {/* comment */}
            <span>
              <svg
                className="_reaction_svg"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="#000"
                  d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
                />
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.938 9.313h7.125M10.5 14.063h3.563"
                />
              </svg>
              Comment
            </span>
          </span>
        </button>
      </div>
    </>
  );
};

export default PostActions;
