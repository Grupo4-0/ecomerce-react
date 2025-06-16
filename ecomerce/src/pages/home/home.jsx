import { Navbar } from "../../components/Navbar/navbar";
import { BannerCarousel } from "../../components/components-home/BannerCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Home() {
  return (
    <>
      <Navbar />
      <div>
        <BannerCarousel />
      </div>
    </>
  );
}
