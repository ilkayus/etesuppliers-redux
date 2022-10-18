import { useEffect, useState } from "react";
import { tableHeaders, tableKeys, ago } from "./table.helper";
import useAuth from "hooks/useAuth";
import TableSortArrows from "./TableSortArrows";
import "./style/Table.css";
import { icons } from "images";

export interface Props {
  selected: any;
  setSelected: any;
  fetchFn: any;
  type: string;
}

const Table = ({ selected, setSelected, fetchFn, type }: Props) => {
  const { auth } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [pageData, setPageData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [jsxTable, setJsxTable] = useState<any>();
  const [filter, setFilter] = useState(
    Array(tableKeys[type === "product" ? "product" : "company"].length).fill(0)
  );

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetchFn(auth);
      return res;
    };
    getProducts().then((res) => setData(res));
  }, []);

  useEffect(() => {
    setPageData(
      data.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
    );
  }, [currentPage, postsPerPage, data, filter]);

  const dataKeys = tableKeys[type === "product" ? "product" : "company"];
  const tableData = pageData.map((x, ind) =>
    dataKeys.map((el: any, idx: number) => (
      <td key={idx + 1 + ind * dataKeys.length}>
        {el === "photo" ? (
          <img src={x[el]} alt="logo" className="table-image" />
        ) : el === "createdAt" ? (
          `${ago(x[el])} ago`
        ) : el === "website" ? (
          <a href={x[el]} target="_blank">
            {x[el]}
          </a>
        ) : el === "company" ? (
          x[el].name
        ) : (
          x[el]
        )}
      </td>
    ))
  );

  const tableRowClickEventHandler = (e: any) => {
    if (!e.target.parentElement.dataset.rowid) return;
    setSelected(
      ...pageData.filter(
        (el) => el._id === e.target.parentElement.dataset.rowid
      )
    );
  };
  const tableColumnClickEventHandler = (e: any) => {
    if (!e.target.dataset.columnname) return;
    const sortBy = e.target.dataset.columnname;
    const idx = dataKeys.indexOf(sortBy);
    //console.log(sortBy, data[0][sortBy]);
    setFilter((prev) =>
      prev.map((el, index) => (index === idx ? (el === 2 ? 1 : 2) : 0))
    );
    setData((prev) =>
      prev.sort((a, b) => {
        return a[sortBy] > b[sortBy]
          ? filter[idx] === 2
            ? -1
            : 1
          : filter[idx] === 2
          ? 1
          : -1;
      })
    );
  };
  useEffect(() => {
    setJsxTable(
      <table>
        <thead onClick={(e) => tableColumnClickEventHandler(e)}>
          <tr key={1}>
            {tableHeaders[type === "product" ? "product" : "company"].map(
              (el, idx) => (
                <th key={1000 + idx} data-columnname={dataKeys[idx]}>
                  <TableSortArrows arrow={filter[idx]} />
                  {el}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody onClick={(e) => tableRowClickEventHandler(e)}>
          {tableData.map((el: any, idx: number) => (
            <tr
              key={idx + 1}
              className={
                pageData[idx]._id === selected._id
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
    );
  }, [pageData, filter, selected]);

  const handlePageNumber = (pageDiff: number) => {
    if (data.length === 0) return;
    const maxPage = Math.ceil(data.length / postsPerPage);
    pageDiff === 1
      ? setCurrentPage((prev) => Math.min(prev + 1, maxPage))
      : setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePostPerPage = (e: any) => {
    setPostsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

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
            (currentPage * postsPerPage < data.length ? " arrow-active" : "")
          }
          src={icons.upArrow}
          alt=""
          onClick={() => handlePageNumber(1)}
        />
      </div>
      {jsxTable}
    </div>
  );
};

export default Table;
