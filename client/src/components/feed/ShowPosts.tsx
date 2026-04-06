import { useGetFeedQuery } from "../../redux/api/baseApi";
import PostAuthor from "./PostAuthor";
import PostActions from "./PostActions";
import CommentSection from "./CommentSection";

const ShowPosts = () => {

  const { data: posts, isLoading, isError } = useGetFeedQuery(undefined);
  console.log(posts);

  if (isLoading) return <div>Loading Feed...</div>;
  if (isError) return <div>Error loading posts.</div>;

  return (
    <>
      {posts?.data?.map((post: any) => (
        <div
          key={post._id}
          className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16"
        >
          <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
            {/* Post Top */}
            <PostAuthor
              author={post.author}
              createdAt={post.createdAt}
              visibility={post.visibility}
            />

            {/* Post Content */}
            <h4 className="_feed_inner_timeline_post_title">{post.content}</h4>

            {post.image && (
              <div className="_feed_inner_timeline_image">
                <img src={post.image} alt="Post" className="_time_img" />
              </div>
            )}
          </div>

          {/* Post Actions: like and comment */}
          <PostActions post={post} />

          {/* Comment area */}
          <CommentSection postId={post._id} />
        </div>
      ))}
    </>
  );
};

export default ShowPosts;
