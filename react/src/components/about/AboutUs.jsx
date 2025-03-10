import LaImg from "../../assets/LaImg.jpg";
import styles from "./AboutUs.module.css";
import ProfileCard from "../ProfileCard";
import LinkedIn from "../../assets/LinkedIn.svg";
import Github from "../../assets/Github.svg";
import { useEffect, useState } from "react";
import { getDevelopers } from "../../services/developerService";
import developersData from "../../assets/data/developersData.js";
import config from "../../../config.js";

function AboutUs() {
  const [developers, setDevelopers] = useState([]);

  // Fetching data from the fake json-server (plugin) API
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const data = await getDevelopers();
        console.log("Fetched developers data:", data);
        setDevelopers(data);
      } catch (error) {
        console.error("Error fetching developers", error);

        // Static developers data will show up if the API call fails
        console.log("Error! Developers sample data:");
      }
    };

    config.enableApiFlag ? fetchDevelopers() : setDevelopers(developersData);
  }, []);

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.bgImg}>
          <div className={styles.info}>
            <h1 className={styles.titleHeader}>Our Mission</h1>
            <p>
              To create innovative, user-friendly digital solutions tailored to
              address the challenges of Los Angeles residents.
              <br />
              Our organization harnesses open data and community-centric
              approaches to develop applications, aiming to improve overall
              well-being and connectivity throughout the city.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h2 className={styles.title}>Meet The Team</h2>
        <div className={styles.teamCards}>
          {developers.map((developer) => (
            <ProfileCard
              key={developer.developerID}
              name={developer.name}
              role={developer.role}
              pictureUrl={developer.pictureUrl}
              linkedInUrl={developer.linkedInUrl}
              githubUrl={developer.githubUrl}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.aboutFooter}>
        <h2 className={styles.footerTitle}>Check Us Out</h2>{" "}
        <div className={styles.iconLinks}>
          <a
            href="https://www.linkedin.com/company/los-angeles-data-project/"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img src={LinkedIn} alt="LADP LinkedIn" />
          </a>
          <a
            href="https://github.com/LosAngelesDataProject/LADP"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img src={Github} alt="LADP Github" />
          </a>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
