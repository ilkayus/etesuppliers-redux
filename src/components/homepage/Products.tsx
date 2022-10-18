import { useState } from "react";
import Components from "components";
import useSearch from "hooks/useSearch";
import API from "api";
import { icons } from "images";

const Products = () => {
  const { search } = useSearch();
  const [grid, setGrid] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [modalState, setModalState] = useState({
    open: false,
    actionType: "add",
    dataType: "product",
    data: {},
  });

  const handleModalClick = (e: any, type: string) => {
    setModalState((prev) => ({
      open: true,
      actionType: type,
      dataType: "product",
      data: selectedProduct,
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
            {search ? (
              <Components.SearchResult />
            ) : (
              <>
                <h1>Products</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  atque, officia impedit magnam repudiandae dolorem ipsum natus
                  nihil, quam error suscipit placeat quas voluptatem nisi
                  exercitationem minus asperiores magni modi.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur consequuntur non molestiae consequatur doloremque
                  possimus, cupiditate beatae? Quisquam mollitia eos cumque
                  impedit provident repudiandae aut tempore vero. Tempora, ut
                  quidem.
                </p>
              </>
            )}
          </div>
          <div className="product-section products-all">
            <div className="table-header">
              <h2>Products:</h2>
              <div className="table-header-buttons">
                <button
                  className={
                    Object.keys(selectedProduct).length === 0
                      ? "button-inactive"
                      : "button-active"
                  }
                  onClick={(e) => handleModalClick(e, "update")}
                >
                  UPDATE
                </button>
                <button
                  className={
                    Object.keys(selectedProduct).length === 0
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
              <Components.Table
                selected={selectedProduct}
                setSelected={setSelectedProduct}
                fetchFn={API.product.getAllProducts}
                type={"product"}
              />
            </div>
          </div>
          <div className="product-section product-selected">
            {Object.keys(selectedProduct).length !== 0 ? (
              <div className="table-container">
                <Components.Product selected={selectedProduct} />
              </div>
            ) : (
              <h1>Select a Product : </h1>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Products;
