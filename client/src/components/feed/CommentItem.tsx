import { useState } from "react";
import { useCreateCommentMutation } from "../../redux/api/baseApi";
import { toast } from "sonner";

interface CommentItemProps {
  comment: any;
  allComments: any[]; // We pass all comments to filter for replies
  postId: string;
}

const CommentItem = ({ comment, allComments, postId }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  // Filter for replies that belong to THIS comment
  const replies = allComments.filter((c) => c.parentId === comment._id);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      await createComment({
        postId,
        text: replyText,
        parentId: comment._id, // Set current comment as parent
      }).unwrap();
      
      toast.success("Reply added");
      setReplyText("");
      setIsReplying(false);
    } catch (err) {
      toast.error("Failed to reply");
    }
  };

  return (
    <div className="_comment_main" style={{ marginBottom: "10px", borderLeft: comment.parentId ? "2px solid #ddd" : "none", paddingLeft: comment.parentId ? "15px" : "0" }}>
      <div className="_comment_image">
        <img src={comment.author.profilePicture} className="_comment_img1" alt="" />
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_name">
            <h4 className="_comment_name_title">{comment.author.firstName} {comment.author.lastName}</h4>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">{comment.text}</p>
          </div>
          <div className="_comment_reply">
            <ul className="_comment_reply_list">
              <li onClick={() => setIsReplying(!isReplying)} style={{ cursor: "pointer", color: "blue" }}>
                <span>Reply</span>
              </li>
              <li><span className="_time_link">.21m</span></li>
            </ul>
          </div>
        </div>

        {/* Reply Input Field - Only shows when 'isReplying' is true */}
        {isReplying && (
          <form onSubmit={handleReplySubmit} className="mt-2 d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              autoFocus
            />
            <button disabled={isLoading} type="submit" className="btn btn-sm btn-primary">
              {isLoading ? "..." : "Reply"}
            </button>
          </form>
        )}

        {/* Recursive Rendering: Render replies under this comment */}
        {replies.length > 0 && (
          <div className="replies_container mt-2">
            {replies.map((reply) => (
              <CommentItem 
                key={reply._id} 
                comment={reply} 
                allComments={allComments} 
                postId={postId} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;