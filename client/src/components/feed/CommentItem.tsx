import { Link } from "react-router";

// Define the interface based on your backend Service populate()
interface IComment {
  _id: string;
  text: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

const CommentItem = ({ comment }: { comment: IComment }) => {
  return (
    <div className="_comment_main" style={{ marginBottom: "15px" }}>
      <div className="_comment_image">
        <Link
          to={`/profile/${comment.author._id}`}
          className="_comment_image_link"
        >
          <img
            src="/assets/images/txt_img.png"
            alt=""
            className="_comment_img1"
          />
        </Link>
      </div>
      <div className="_comment_area">
        <div style={{minWidth: "100%"}} className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <Link to={`/profile/${comment.author._id}`}>
                <h4 className="_comment_name_title">
                  {comment.author.firstName} {comment.author.lastName}
                </h4>
              </Link>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.text}</span>
            </p>
          </div>

          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li>
                  <span>Like.</span>
                </li>
                <li>
                  <span>Reply.</span>
                </li>
                <li>
                  <span className="_time_link">
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
