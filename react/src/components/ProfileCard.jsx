import React from "react";
import Card from "react-bootstrap/Card";
import LinkedInIcon from "../assets/LinkedIn.svg";
import GithubIcon from "../assets/Github.svg";
import styles from "./ProfileCard.module.css";

function ProfileCard({ name, role, pictureUrl, linkedInUrl, githubUrl }) {
  return (
    <div className={styles.cardContainer}>
      <Card className={styles.cardStyle}>
        <div className={styles.imageContainer}>
          <Card.Img
            variant="top"
            src={pictureUrl}
            className={styles.profileImage}
          />
        </div>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>{role}</Card.Title>
          <Card.Text className={styles.cardText}>{name}</Card.Text>
          <div className={styles.iconLinks}>
            <a
              href={linkedInUrl}
              rel="noreferrer noopener"
              target="_blank"
              className={styles.iconLinksLinkedin} // Updated this line
            >
              <img src={LinkedInIcon} alt="LinkedIn" />
            </a>
            <a
              href={githubUrl}
              rel="noreferrer noopener"
              target="_blank"
              className={styles.iconLinksGit} // Updated this line
            >
              <img src={GithubIcon} alt="GitHub" />
            </a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfileCard;
