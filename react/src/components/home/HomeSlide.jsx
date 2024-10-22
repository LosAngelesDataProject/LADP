import { Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import avatar1 from "../../assets/images/carousel/Avatar1.jpg";
import avatar2 from "../../assets/images/carousel/Avatar2.jpg";
import avatar3 from "../../assets/images/carousel/Avatar3.jpg";
import avatar4 from "../../assets/images/carousel/Avatar4.jpg";
import avatar5 from "../../assets/images/carousel/Avatar5.jpg";
import avatar6 from "../../assets/images/carousel/Avatar6.jpg";
import avatar7 from "../../assets/images/carousel/Avatar7.jpg";
import avatar8 from "../../assets/images/carousel/Avatar8.jpg";
import avatar9 from "../../assets/images/carousel/Avatar9.jpg";
import avatar10 from "../../assets/images/carousel/Avatar10.jpg";
import avatar11 from "../../assets/images/carousel/Avatar11.jpg";
import avatar12 from "../../assets/images/carousel/Avatar12.jpg";
import avatar13 from "../../assets/images/carousel/Avatar13.jpg";
import "../home/HomeSlide.css";

function HomeSlide() {
  const array = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
    avatar13,
  ];

  const mappingFunction = (avatar) => {
    return (
      <Carousel.Item key={avatar} interval={2500} className="home-slider-item">
        <img src={avatar} className="center" />
      </Carousel.Item>
    );
  };

  const mappedArray = array.map(mappingFunction);

  return (
    <div className="bg-white homeSlider-margin">
      <Row id="carouselHero">
        <Col className="Text-center">
          <Carousel className="img-fluid">{mappedArray}</Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default HomeSlide;
