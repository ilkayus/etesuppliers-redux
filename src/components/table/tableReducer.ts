// /*
// const [currentPage, setCurrentPage] = useState(1);
// const [postsPerPage, setPostsPerPage] = useState(5);
// const [pageData, setPageData] = useState<any[]>([]);
// const [data, setData] = useState<any[]>([]);
// const [jsxTable, setJsxTable] = useState<any>();
// const [filter, setFilter] = useState(
//   Array(tableKeys[type === "product" ? "product" : "company"].length).fill(0)
// );
// */
// import * as helper from "./table.helper";

// type TableActionTypes =
//   | { type: "setPostPerPage"; payload: number }
//   | { type: "setDataFilter"; payload: number }
//   | { type: "incrementPageNumber"; payload: undefined }
//   | { type: "decrementPageNumber"; payload: undefined }
//   | { type: "setData"; payload: number }
//   | { type: "setPageData"; payload: undefined }
//   | { type: "setFilter"; payload: number }
//   | { type: "passwordConfirm"; payload: string };

// const initialState = {
//   maxPage: 1,
//   currentPage: 1,
//   postPerPage: 5,
//   rightArrow: "arrow-active",
//   leftArrow: "arrow-active",
//   filter: [0, 0, 0, 0, 0, 0, 0],
//   data: [],
//   //   pageData: [],
//   //   data: [],
//   //   jsxTable: [],
//   //   tableKeys: [""],
//   //   tableHeaders: [""],
// };

// const tableReducer = (state: typeof initialState, action: TableActionTypes) => {
//   switch (action.type) {
//     case "incrementPageNumber":
//       return {
//         ...state,
//         currentPage: Math.min(state.currentPage + 1, state.maxPage),
//         rightArrow: state.maxPage > state.currentPage + 1 ? "arrow-active" : "",
//       };
//     case "decrementPageNumber":
//       return {
//         ...state,
//         currentPage: Math.max(state.currentPage - 1, 1),
//         leftArrow: state.currentPage - 1 > 1 ? "arrow-active" : "",
//       };
//     case "setPostPerPage":
//       return {
//         ...state,
//         postPerPage: action.payload,
//         currentPage: 1,
//         leftArrow: "",
//       };

//     case "setFilter":
//       return {
//         ...state,
//         filter: state.filter.map((el, index) =>
//           index === action.payload ? (el === 2 ? 1 : 2) : 0
//         ),
//       };
//     case "setData":
//       return {
//         ...state,
//         data: state.data.sort.map((a, b) =>a[state.dataKeys.indexOf(sortBy)] > [state.dataKeys.indexOf(sortBy)
//         ? state..filter[action.payload] === 2
//           ? -1
//           : 1
//         : state.filter[action.payload] === 2
//         ? 1
//         : -1;
//         ),
//       };
//   }
// };

// export { tableReducer, initialState };

export {};
