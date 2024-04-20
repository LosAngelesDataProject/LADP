import { Link } from "react-router-dom";

const SocialLinks = () => {
     return (
          <>
               <div className="">
                    <Link
                         to="#"
                         className="btn-social btn-linkedin"
                    >
                         <i className="fab fa-linkedin"></i>
                    </Link>{" "}
                    <Link
                         to="#"
                         className="btn-social btn-facebook"
                    >
                         <i className="fab fa-facebook"></i>
                    </Link>{" "}
                    <Link
                         to="#"
                         className="btn-social btn-github"
                    >
                         <i className="fab fa-instagram"></i>
                    </Link>{" "}
                    <Link
                         to="#"
                         className="btn-social btn-twitter"
                    >
                         <i className="fab fa-twitter"></i>
                    </Link>{" "}
                    <Link
                         to="#"
                         className="btn-social btn-github"
                    >
                         <i className="fab fa-github"></i>
                    </Link>
               </div>
          </>
     )
}

export default SocialLinks;
