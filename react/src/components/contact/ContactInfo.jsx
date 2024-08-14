import styles from "./Contact.module.css";

function ContactInfo() {
  return (
    <>
      <table className={styles.tableText}>
        <th>
          <tr>
            <p>EMAIL</p>
            <p> LADataProj@gmail.com</p>
          </tr>
          <tr>
            <p>PHONE</p>
            <p> 212-555-2233</p>
          </tr>
          <tr>
            <p>FOLLOW US</p>
            <a href="">
              <img
                className="fab fa-linkedin"
                src="https://i.imgur.com/5QQIbkU.jpg"
                alt="facebook-icon-click-button"
              />
            </a>

            <a href="">
              <img
                src="https://i.imgur.com/e6TCHZ9.jpg"
                alt="instagram-icon-click-button"
              />
            </a>

            <a href="">
              <img
                src="https://i.imgur.com/rIg9FvT.jpg"
                alt="twitter-X-icon-click-button"
              />
            </a>

            <a href="">
              <img
                src="https://i.imgur.com/0N7bqHt.jpg"
                alt="youtube-icon-click-button"
              />
            </a>
          </tr>

          <tr type="image" alt="volunteer-image-button">
            <div className={styles.volunteer}>
              <a href="">
                <img
                  src="https://i.imgur.com/0Xye9Se.jpg"
                  alt="volunteer-inquiry-click-through-graphic"
                />
              </a>
            </div>
          </tr>
        </th>
      </table>
    </>
  );
}

export default ContactInfo;
