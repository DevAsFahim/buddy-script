import { Link } from "react-router";
import FeedStory from "./FeedStory";
import PostFrom from "./PostFrom";
import ShowPosts from "./ShowPosts";

const LayoutMiddle = () => {
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <div className="_layout_middle_wrap">
        <div className="_layout_middle_inner">
          {/* Post feed */}
          <FeedStory />

          {/* Post form */}
          <PostFrom />

          {/* Show post */}
          <ShowPosts />

        </div>
      </div>
    </div>
  );
};

export default LayoutMiddle;
