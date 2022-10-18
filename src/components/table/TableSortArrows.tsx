import { icons } from "images";

export interface Props {
  arrow: number;
}

const TableSortArrows = ({ arrow }: Props) => {
  if (arrow === 1) {
    return (
      <div className="sort-arrows">
        <img className="up-op" src={icons.upArrow} alt="sort icon" />
        <img className="down" src={icons.upArrow} alt="sort icon" />
      </div>
    );
  }
  if (arrow === 2) {
    return (
      <div className="sort-arrows">
        <img className="up" src={icons.upArrow} alt="sort icon" />
        <img className="down-op" src={icons.upArrow} alt="sort icon" />
      </div>
    );
  }
  return (
    <div className="sort-arrows">
      <img className="up-op" src={icons.upArrow} alt="sort icon" />
      <img className="down-op" src={icons.upArrow} alt="sort icon" />
    </div>
  );
};

export default TableSortArrows;
