import { Link } from "react-router-dom";
import { icons } from "images";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h3>Reports 📌</h3>
      <ul>
        <li>
          <Link to="/home">
            <div className="list-cointainer">
              <span className="list-title">Home</span>
              <span className="list-image">
                <img src={icons.home} alt="home icon" />
              </span>
              <span className="list-arrow">
                <img src={icons.rightArrow} alt="right arrow icon" />
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/companies">
            <div className="list-cointainer">
              <span className="list-title">Companies</span>
              <span className="list-image">
                <img src={icons.company} alt="company icon" />
              </span>
              <span className="list-arrow">
                <img src={icons.rightArrow} alt="right arrow icon" />
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/products">
            <div className="list-cointainer">
              <span className="list-title">Products</span>
              <span className="list-image">
                <img src={icons.product} alt="product icon" />
              </span>
              <span className="list-arrow">
                <img src={icons.rightArrow} alt="right arrow icon" />
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
