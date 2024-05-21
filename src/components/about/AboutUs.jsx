import LaImg from "../assets/LaImg.jpg";
import logo from "../assets/ladpLogo_light.png";
import styles from "./AboutUs.module.css";
import ProfileCard from "./ProfileCard";
import LinkedIn from "../assets/LinkedIn.svg";
import Github from "../assets/Github.svg";

function AboutUs() {
  return (
    <>
      <div className={styles.aboutUs}>
        {/* Header */}
        <div className={styles.header}>
          <img className={styles.bgImg} src={LaImg} alt="Los Angeles" />
          <div className={styles.aboutContainer}>
            <div className={styles.info}>
              <h2 className={styles.title}>Our Mission</h2>
              <p>
                To create innovative and user-friendly digital solutions
                tailored to address the specific challenges and requirements of
                Los Angeles residents.
                <br />
                Our organization harnesses open data and community-centric
                approaches to develop applications, aiming to improve overall
                well-being and connectivity throughout Los Angeles.
              </p>
            </div>
          </div>
          <img className={styles.logo} src={logo} alt="LADP Logo" />
        </div>

        {/* Body */}
        <div className={styles.body}>
          <h2 className={styles.title}>Meet The Team!</h2>
          <div className={styles.teamCards}>
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
        </div>
        {/* Footer */}
        <div className={styles.aboutFooter}>
          <h2 className={styles.title}>Check Us Out!</h2>
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
      </div>
    </>
  );
}

export default AboutUs;
