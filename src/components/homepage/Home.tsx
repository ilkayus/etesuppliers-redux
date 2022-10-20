import { useEffect, useState } from "react";
import API from "api";
import Components from "components";

const Home = () => {
  const [logs, setLogs] = useState<any | undefined>(undefined);
  const [requesting, setRequesting] = useState(true);
  useEffect(() => {
    const getLogs = async () => {
      const res = await API.search.getHomePageLogs();
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
          <Components.SearchResult />
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
