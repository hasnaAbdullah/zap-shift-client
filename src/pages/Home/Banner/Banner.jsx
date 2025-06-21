import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";

function Banner() {
  return (
    <div className="my-16 h-[40vh]">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        emulateTouch={true}
        showThumbs={false}
        showArrows={false}
        swipeScrollTolerance={100}
        transitionTime={1000}
        interval={2000}
      >
        <div>
          <img src={banner1} />
        </div>
        <div>
          <img src={banner2} />
        </div>
        <div>
          <img src={banner3} />
        </div>
      </Carousel>
    </div>
  );
}
export default Banner;
