import { useGetLikersQuery } from "../../redux/api/baseApi";
import { Link } from "react-router";

const LikersModal = ({ targetId, onClose }: { targetId: string; onClose: () => void }) => {
  const { data: likers, isLoading } = useGetLikersQuery(targetId);

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content border-0 _b_radious6 shadow-lg">
          
          {/* Header */}
          <div className="modal-header border-bottom-0 _padd_t24 _padd_r24 _padd_l24">
            <h5 className="_comment_name_title mb-0">Reactions</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body _padd_24" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary spinner-border-sm" role="status"></div>
              </div>
            ) : (
              <div className="_likers_wrapper">
                {likers?.data?.map((like: any) => (
                  <div key={like._id} className="d-flex align-items-center _mar_b20 last-child-mb-0">
                    <div className="_comment_image">
                      <img 
                        src={like.userId.profileImage || "assets/images/txt_img.png"} 
                        className="_comment_img1" 
                        alt="User"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="_mar_l12">
                      <Link to={`/profile/${like.userId._id}`} className="text-decoration-none">
                        <h4 className="_comment_name_title mb-0" style={{ fontSize: '15px' }}>
                          {like.userId.firstName} {like.userId.lastName}
                        </h4>
                      </Link>
                    </div>
                  </div>
                ))}
                
                {!isLoading && likers?.data?.length === 0 && (
                  <p className="text-center text-muted _comment_status_text">No reactions yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikersModal;