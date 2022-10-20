import { useEffect, useState } from "react";
import API from "api";
import Components from "components";
import { selectDataLogs, fetchLogs } from "features/commonData/dataSlice";
import { useAppSelector, useAppDispatch } from "hooks/typedReduxHooks";

const Home = () => {
  const state = useAppSelector(selectDataLogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLogs());
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
          {state.loading ? null : (
            <ul>
              {state.systemLogs.map((el: any, idx: number) => (
                <li key={idx}>{el}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-section products-of-company">
        <h2>Last Added Companies:</h2>
        <div className="table-container">
          {state.loading ? null : (
            <ul>
              {state.companyLogs.map((el: any, idx: number) => (
                <li key={idx}>{el}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="home-section user-activity">
        <h2>Last Added Products:</h2>
        <div className="table-container">
          {state.loading ? null : (
            <ul>
              {state.productLogs.map((el: any, idx: number) => (
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
