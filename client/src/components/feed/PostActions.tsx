import { useState } from "react";
import {
  useGetCommentsQuery,
  useGetLikersQuery,
  useToggleLikeMutation,
} from "../../redux/api/baseApi";
import LikersModal from "./LikersModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const PostActions = ({ post }: { post: any }) => {
  const [loading, setLoading] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.user);
  const currentUserId = currentUser?.userId;

  // get likers of this post
  const { data: likers } = useGetLikersQuery(post._id);
  // get comments of this post
  const { data: comments } = useGetCommentsQuery(post._id);

  const isLikedByMe = likers?.data.some(
    (like: any) => like.userId._id === currentUserId,
  );

  const [toggleLike] = useToggleLikeMutation();

  const handleLike = async () => {
    setLoading(true);
    await toggleLike({ targetId: post._id, targetModel: "Post" });
    setLoading(false);
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
          disabled={loading}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill="#1877f2"
                d="M14 6H10.518C10.828 4.364 11 2.893 11 2C11 1 10.5 0 9.5 0C8.5 0 7 1.5 7 2.5C7 3.5 6.5 4.5 5 5V6H2C1 6 1 7 1 7V14C1 15 2 16 3 16H11C12.5 16 13 15 13 14L15 8C15.5 6.5 15 6 14 6ZM4 14.5C3.724 14.5 3.5 14.276 3.5 14C3.5 13.724 3.724 13.5 4 13.5C4.276 13.5 4.5 13.724 4.5 14C4.5 14.276 4.276 14.5 4 14.5ZM4 12.5C3.724 12.5 3.5 12.276 3.5 12C3.5 11.724 3.724 11.5 4 11.5C4.276 11.5 4.5 11.724 4.5 12C4.5 12.276 4.276 12.5 4 12.5ZM4 10.5C3.724 10.5 3.5 10.276 3.5 10C3.5 9.724 3.724 9.5 4 9.5C4.276 9.5 4.5 9.724 4.5 10C4.5 10.276 4.276 10.5 4 10.5ZM4 8.5C3.724 8.5 3.5 8.276 3.5 8C3.5 7.724 3.724 7.5 4 7.5C4.276 7.5 4.5 7.724 4.5 8C4.5 8.276 4.276 8.5 4 8.5ZM4 6.5C3.724 6.5 3.5 6.276 3.5 6C3.5 5.724 3.724 5.5 4 5.5C4.276 5.5 4.5 5.724 4.5 6C4.5 6.276 4.276 6.5 4 6.5Z"
              />
            </svg>

            <span className="ms-2">
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
