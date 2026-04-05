import { useEffect, useRef, useState } from "react";
import PostArticleIcon from "../../svgIcons/PostArticleIcon";
import PostCalenderIcon from "../../svgIcons/PostCalenderIcon";
import PostEditIcon from "../../svgIcons/PostEditIcon";
import PostGalleryIcon from "../../svgIcons/PostGalleryIcon";
import PostVideoIcon from "../../svgIcons/PostVideoIcon";
import SendPostIcon from "../../svgIcons/SendPostIcon";
import { useCreatePostMutation } from "../../redux/api/baseApi";
import { toast } from "sonner";
import type { IBackendError } from "../../type/backendError.type";

const PostFrom = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showImage, setShowImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createPost, { isLoading }] = useCreatePostMutation();

  useEffect(() => {
    if (image) {
      setShowImage(URL.createObjectURL(image));
    } else {
      setShowImage(null);
    }
  }, [image]);

  const handlePostSubmit = async () => {
    if (!content && !image) return;

    const formData = new FormData();

    formData.append("content", content);
    formData.append("visibility", "public");
    if (image) {
      formData.append("image", image);
    }

    const toastId = toast.loading("Creating post...");
    try {
      await createPost(formData).unwrap();
      setContent("");
      setImage(null);
      toast.success("Post created successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      toast.error(
        (err as IBackendError).data.errorSources[0].message
          ? (err as IBackendError).data.errorSources[0].message
          : "Failed to create post",
        { id: toastId, duration: 2000 },
      );
      console.error("Failed to create post:", err);
    }
  };

  return (
    <div className="_feed_inner_text_area  _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <img
            src="assets/images/txt_img.png"
            alt="Image"
            className="_txt_img"
          />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form ">
          <textarea
            className="form-control _textarea"
            placeholder="Write something..."
            id="floatingTextarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label className="_feed_textarea_label" htmlFor="floatingTextarea">
            Write something ...
            <PostEditIcon />
          </label>
        </div>
      </div>

      {/* Preview Image */}
      <div>
        {showImage && (
          <div className="_feed_inner_text_area_box_image">
            <img src={showImage} alt="Image" className="" />
          </div>
        )}
      </div>

      <div className="_feed_inner_text_area_bottom">
        <div className="_feed_inner_text_area_item">
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                <PostGalleryIcon />
              </span>
              Photo
            </button>
          </div>
          {/* <div className="_feed_inner_text_area_bottom_video _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                <PostVideoIcon />
              </span>
              Video
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_event _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                <PostCalenderIcon />
              </span>
              Event
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_article _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                <PostArticleIcon />
              </span>
              Article
            </button>
          </div> */}
        </div>
        <div className="_feed_inner_text_area_btn">
          <button
            type="button"
            className="_feed_inner_text_area_btn_link"
            onClick={handlePostSubmit}
            disabled={isLoading}
          >
            <SendPostIcon />
            <span>{isLoading ? "Posting..." : "Post"}</span>
          </button>
        </div>
      </div>

      <div className="_feed_inner_text_area_bottom_mobile">
        <div className="_feed_inner_text_mobile">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <PostGalleryIcon />
                </span>
              </button>
            </div>
            {/* <div className="_feed_inner_text_area_bottom_video _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <PostVideoIcon />
                </span>
              </button>
            </div>
            <div className="_feed_inner_text_area_bottom_event _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <PostCalenderIcon />
                </span>
              </button>
            </div>
            <div className="_feed_inner_text_area_bottom_article _feed_common">
              <button
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <PostArticleIcon />
                </span>
              </button>
            </div> */}
          </div>
          <div className="_feed_inner_text_area_btn">
            <button
              type="button"
              className="_feed_inner_text_area_btn_link"
              onClick={handlePostSubmit}
              disabled={isLoading}
            >
              <SendPostIcon />
              <span>{isLoading ? "Posting..." : "Post"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFrom;
