// import { useGetCommentsQuery } from "../../redux/api/baseApi";
// // import CommentItem from "./CommentItem";

// const CommentsModal = ({ postId, onClose }: { postId: string; onClose: () => void }) => {
//   const { data: comments, isLoading } = useGetCommentsQuery(postId);
//   console.log(comments)

//   return (
//     <>
//       <div className="modal-backdrop fade show"></div>
//       <div className="modal fade show d-block" tabIndex={-1} role="dialog">
//         <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
//           <div className="modal-content _b_radious6">
//             <div className="modal-header">
//               <h5 className="modal-title _comment_name_title">Post Comments</h5>
//               <button type="button" className="btn-close" onClick={onClose}></button>
//             </div>
//             <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
//               {isLoading ? (
//                 <div className="text-center py-4">Loading...</div>
//               ) : (
//                 <div className="_timline_comment_main">
//                   {/* {comments?.data?.map((comment: any) => (
//                     <CommentItem key={comment._id} comment={comment} />
//                   ))} */}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CommentsModal;