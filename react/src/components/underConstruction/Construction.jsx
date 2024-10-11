import styles from "./Construction.module.css";
import Logo from "../../assets/ladpLogo_light.png";
import { Link } from "react-router-dom";

function Construction(){

    return(
    <>
        <div className={styles.background}>
            <img className={styles.logo}
                src={Logo}
                alt="logo"
            />
            <div className={styles.message}>
                <h1>Coming Soon</h1>
            <p>This part of our site is under construction.</p>
            </div>
            <div className={styles.linkContainer}>
                <Link 
                to="/"
                className={styles.link}
                >
                    Return Home
                </Link>
            </div>
        </div>
        

    </>
    )

}

export default Construction