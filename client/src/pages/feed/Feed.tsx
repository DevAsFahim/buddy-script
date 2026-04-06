import LayoutMiddle from "../../components/feed/LayoutMiddle";
import LeftSideBar from "../../components/feed/LeftSideBar";
import RightSidebar from "../../components/feed/RightSidebar";

const Feed = () => {
  return (
    <div className="row">
      {/* Left Sidebar Start */}
      <LeftSideBar />
      {/* Left Sidebar End */}


      {/* Layout Middle Start */}
      <LayoutMiddle />
      {/* Layout Middle End */}


      {/* Right Sidebar Start */}
        <RightSidebar />
      {/* Right Sidebar End */}

    </div>
  );
};

export default Feed;
