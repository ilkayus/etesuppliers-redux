import { Route, Routes } from "react-router-dom";
import Components from "components";
import "./style/Homepage.css";
import { SearchProvider } from "context/SearchProvider";

const Homepage = () => {
  return (
    <div className="homepage">
      <SearchProvider>
        <Components.Header />
        <Components.Navbar />
        <Routes>
          <Route path="/" element={<Components.Home />} />
          <Route path="/home" element={<Components.Home />} />
          <Route path="/etesuppliers" element={<Components.Home />} />
          <Route path="/companies" element={<Components.Companies />} />
          <Route path="/products" element={<Components.Products />} />
          <Route
            path="*"
            element={
              <Components.Missing message="There is no available page." />
            }
          />
        </Routes>
      </SearchProvider>
    </div>
  );
};

export default Homepage;
