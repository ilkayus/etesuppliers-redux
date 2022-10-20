import { useEffect, useState } from "react";
import {
  fetchProductsData,
  selectTableData,
  sortProductsByFilter,
  setSelectedProduct,
} from "features/commonData/dataSlice";
import { useAppDispatch, useAppSelector } from "hooks/typedReduxHooks";
import { tableHeaders, tableKeys, ago } from "./table.helper";
import TableSortArrows from "./TableSortArrows";
import "./style/Table.css";
import { icons } from "images";
import { IProductData } from "types/product.interface";

export interface Props {}

const ProductTable = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectTableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [pageData, setPageData] = useState<IProductData[]>([]);
  const [filter, setFilter] = useState(
    Array(tableKeys["product"].length).fill(0)
  );

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  useEffect(() => {
    setPageData(
      state.products.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
      )
    );
  }, [currentPage, postsPerPage, state.products, filter]);

  const tableRowClickEventHandler = (e: any) => {
    if (!e.target.parentElement.dataset.rowid) return;
    const selectedProduct = [...pageData].filter(
      (el) => el._id === e.target.parentElement.dataset.rowid
    );
    dispatch(setSelectedProduct(selectedProduct[0]));
  };

  const tableColumnClickEventHandler = (e: any) => {
    if (!e.target.dataset.columnname) return;
    const sortBy = e.target.dataset.columnname;
    const idx = tableKeys.product.indexOf(sortBy);
    setFilter((prev) =>
      prev.map((el, index) => (index === idx ? (el === 2 ? 1 : 2) : 0))
    );
    dispatch(sortProductsByFilter({ sortBy: sortBy, filter: filter[idx] }));
  };

  const handlePageNumber = (pageDiff: number) => {
    if (state.products.length === 0) return;
    const maxPage = Math.ceil(state.products.length / postsPerPage);
    pageDiff === 1
      ? setCurrentPage((prev) => Math.min(prev + 1, maxPage))
      : setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePostPerPage = (e: any) => {
    setPostsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  const tableData = pageData.map((x, ind) => (
    <>
      <td key={ind + 1}>
        <img src={x.photo} alt="logo" className="table-image" />
      </td>
      <td key={ind + 2}>{x.name}</td>
      <td key={ind + 3}>{x.category}</td>
      <td key={ind + 4}>{x.amount}</td>
      <td key={ind + 5}>{x.amountUnit}</td>
      <td key={ind + 6}>{x.company.name}</td>
      <td key={ind + 7}> `${ago(x.createdAt)} ago`</td>
    </>
  ));

  return (
    <div className="table-table">
      <div className="per-page">
        <img
          className={"left-arrow " + (currentPage > 1 ? " arrow-active" : "")}
          src={icons.upArrow}
          alt=""
          onClick={() => handlePageNumber(-1)}
        />
        <select name="post-per-page" id="" onChange={handlePostPerPage}>
          <option value="5">5 Results - {`Page ${currentPage}`}</option>
          <option value="10">10 Results {`Page ${currentPage}`}</option>
          <option value="20">20 Results {`Page ${currentPage}`}</option>
        </select>
        <img
          className={
            "right-arrow " +
            (currentPage * postsPerPage < state.products.length
              ? " arrow-active"
              : "")
          }
          src={icons.upArrow}
          alt=""
          onClick={() => handlePageNumber(1)}
        />
      </div>
      <table>
        <thead onClick={(e) => tableColumnClickEventHandler(e)}>
          <tr key={1}>
            {tableHeaders.product.map((el, idx) => (
              <th key={1000 + idx} data-columnname={tableKeys.product[idx]}>
                <TableSortArrows arrow={filter[idx]} />
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody onClick={(e) => tableRowClickEventHandler(e)}>
          {tableData.map((el: any, idx: number) => (
            <tr
              key={idx + 1}
              className={
                pageData[idx]._id === state.selected.product._id
                  ? "selected-row"
                  : "not-selected-row"
              }
              data-rowid={pageData[idx]._id}
            >
              {el}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
