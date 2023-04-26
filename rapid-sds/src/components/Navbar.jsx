import { Link } from "react-router-dom"

const Navbar = () => (
  <nav className="nav-bar">
    <div className="d-flex flex-column mb-2">
      <Link to={"/"} className="nav-header u-cursor-pointer">
        Rapid SDS
      </Link>
      <span className="u-font-14 fw-bold">Know 	• Control 	• Secure</span>
    </div>
    {/* <img src={process.env.PUBLIC_URL + "/rapid.png"} width="150" className="py-2" /> */}
  </nav>
)

export default Navbar