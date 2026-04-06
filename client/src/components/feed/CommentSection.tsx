import { useState } from "react";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../../redux/api/baseApi";
import { toast } from "sonner";
import CommentItem from "./CommentItem";
import SendPostIcon from "../../svgIcons/SendPostIcon";

const CommentSection = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  // RTK Query fetches data and handles loading/error states
  const { data: response, isLoading: commentsLoading } =
    useGetCommentsQuery(postId);
  const allComments = response?.data || [];

  // Only get the root comments (not replies) for the main list
  const rootComments = allComments.filter((c: any) => !c.parentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const toastId = toast.loading("Commenting...");
    try {
      await createComment({ postId, text, parentId: null }).unwrap();
      toast.success("Commented successfully", { id: toastId, duration: 2000 });
      setText("");
    } catch (err) {
      toast.error("Failed to comment", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      {/* Input Area */}
      <div className="_feed_inner_timeline_cooment_area">
        <div className="_feed_inner_comment_box">
          <form
            onSubmit={handleSubmit}
            className="_feed_inner_comment_box_form"
          >
            <div className="_feed_inner_comment_box_content">
              <div className="_feed_inner_comment_box_content_image">
                <img
                  src="/assets/images/comment_img.png"
                  alt=""
                  className="_comment_img"
                />
              </div>
              <div
                className="_feed_inner_comment_box_content_txt"
                style={{ display: "flex", gap: "10px" }}
              >
                <textarea
                  className="form-control _comment_textarea"
                  placeholder="Write a comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary"
                  style={{ borderRadius: "40px" }}
                >
                  {isLoading ? "..." : <SendPostIcon />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* View Comment Area */}
      <div className="_timline_comment_main">
        {commentsLoading ? (
          <p>Loading comments...</p>
        ) : rootComments.length > 0 ? (
          rootComments.map((comment: any) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              allComments={allComments}
              postId={postId}
            />
          ))
        ) : (
          <p className="text-muted ps-4">No comments yet. Be the first!</p>
        )}
      </div>
    </>
  );
};

export default CommentSection;
