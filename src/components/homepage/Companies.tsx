import { useState } from "react";
import Components from "components";
import { icons } from "images";
import { selectedCompanyData } from "features/commonData/dataSlice";
import { useAppSelector } from "hooks/typedReduxHooks";

const Companies = () => {
  const [grid, setGrid] = useState(false);
  const selectedCompany = useAppSelector(selectedCompanyData);
  const [modalState, setModalState] = useState({
    open: false,
    actionType: "add",
    dataType: "company",
    data: {},
  });

  const handleModalClick = (e: any, type: string) => {
    setModalState((prev) => ({
      open: true,
      actionType: type,
      dataType: "company",
      data: selectedCompany,
    }));
  };

  return (
    <main className={grid ? "product product-animated" : "product"}>
      {modalState.open ? (
        <Components.Modal
          onClose={() => {
            setModalState((prev) => ({ ...prev, open: false }));
          }}
          state={modalState}
        />
      ) : (
        <>
          <div
            className="grid-changer"
            onClick={() => setGrid((prev) => !prev)}
          >
            <img src={icons.upArrow} alt="seperator" />
          </div>
          <div className="product-section product-description">
            <Components.SearchResult />
          </div>
          <div className="product-section products-all">
            <div className="table-header">
              <h2>Companies:</h2>
              <div className="table-header-buttons">
                <button
                  className={
                    Object.keys(selectedCompany).length === 0
                      ? "button-inactive"
                      : "button-active"
                  }
                  onClick={(e) => handleModalClick(e, "update")}
                >
                  UPDATE
                </button>
                <button
                  className={
                    Object.keys(selectedCompany).length === 0
                      ? "button-inactive"
                      : "button-active"
                  }
                  onClick={(e) => handleModalClick(e, "delete")}
                >
                  DELETE
                </button>
                <button
                  className="button-active"
                  onClick={(e) => handleModalClick(e, "add")}
                >
                  ADD
                </button>
              </div>
            </div>
            <div className="table-container">
              <Components.CompanyTable />
            </div>
          </div>
          <div className="product-section product-selected">
            {Object.keys(selectedCompany).length !== 0 ? (
              <div className="table-container">
                <Components.Company selected={selectedCompany} />
              </div>
            ) : (
              <h1>Select a Company : </h1>
            )}
          </div>
        </>
      )}
    </main>
  );
};
export default Companies;
