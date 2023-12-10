import { useNavigate } from "react-router-dom";
const HeaderVideo = () => {
  const navigate = useNavigate();
  return (
    <div className="header-video">
      <div className="video-container">
        <video className="background-video" autoPlay loop muted>
          <source
            src="https://res.cloudinary.com/doye6tvxz/video/upload/v1701812558/background2-video_online-video-cutter.com_rztuey.mp4"
            type="video/mp4"
          />
        </video>
        <div className="content-video">
          <h1 className="text-center">Welcome to Advenshop</h1>
          <p className="text-center">
            Find the best outdoor gear for your next adventure
          </p>

          <button
            className="btn-header btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderVideo;
