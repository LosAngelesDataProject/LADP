import Card from "react-bootstrap/Card";
import ProfileImg from "../assets/ProfileImg.jpg";
import LinkedIn from "../assets/LinkedIn.svg";
import Github from "../assets/Github.svg";

function ProfileCard() {
  const cardContainer = { padding: "50px" };
  const cardStyle = {
    width: "18rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    borderRadius: "15px",
  };

  return (
    <>
      <div style={cardContainer}>
        <Card style={cardStyle}>
          <Card.Img variant="top" src={ProfileImg} />
          <Card.Body>
            <Card.Title>Software Dev</Card.Title>
            <Card.Text>
              Tier 1 developer contributing to the foundation of the LA Data
              Project
            </Card.Text>
            <a
              href="https://www.linkedin.com/"
              rel="noreferrer noopener"
              target="_blank"
            >
              <img src={LinkedIn} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/"
              rel="noreferrer noopener"
              target="_blank"
            >
              <img src={Github} alt="Github" />
            </a>

            {/* <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link> */}
            {/* <FontAwesomeIcon icon="fa-brands fa-linkedin" /> */}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ProfileCard;
