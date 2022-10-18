import React, { useEffect, useState } from "react";
import API from "api";
import useAuth from "hooks/useAuth";
import useSearch from "hooks/useSearch";
import Components from "components";
import { icons } from "images";

const Home = () => {
  const { search } = useSearch();
  const { auth } = useAuth();
  const [logs, setLogs] = useState<any | undefined>(undefined);
  const [requesting, setRequesting] = useState(true);
  useEffect(() => {
    const getLogs = async () => {
      const res = await API.search.getHomePageLogs(auth);
      // console.log(res);
      return res;
    };
    getLogs()
      .then(setLogs)
      .finally(() => setRequesting(false));
  }, []);
  return (
    <main className="home">
      <div className="home-section">
        <div className="table-container">
          {search ? (
            <Components.SearchResult />
          ) : (
            <>
              <h1>Home</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At
                vero, accusantium eligendi reprehenderit corrupti suscipit hic,
                facilis veritatis nulla eaque maiores cumque. Consectetur sunt
                dicta officiis dolorum ex deserunt. Quos.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestias ullam alias hic sint perspiciatis recusandae!
                Incidunt, ex. Corporis officiis et mollitia culpa illo voluptate
                provident, molestias dolor soluta voluptatum consequatur?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                eaque quos placeat similique, aperiam dolorem asperiores
                mollitia labore numquam debitis accusantium atque distinctio
                neque repudiandae molestias libero commodi voluptatem dolorum!
              </p>
            </>
          )}
        </div>
      </div>
      <div className="home-section companies">
        <h2>Last Activities:</h2>
        <div className="table-container">
          {requesting ? null : (
            <ul>
              {logs.systemLogs.map((el: any, idx: number) => (
                <li key={idx}>{el}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-section products-of-company">
        <h2>Last Added Companies:</h2>
        <div className="table-container">
          {requesting ? null : (
            <ul>
              {logs.companyLogs.map((el: any, idx: number) => (
                <li key={idx}>{el}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-section user-activity">
        <h2>Last Added Products:</h2>
        <div className="table-container">
          {requesting ? null : (
            <ul>
              {logs.productLogs.map((el: any, idx: number) => (
                <li key={idx}>{el}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
