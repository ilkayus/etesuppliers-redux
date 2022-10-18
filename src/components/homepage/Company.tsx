import { ICompanyData } from "types/company.interface";
import { ago } from "../table/table.helper";

export interface Props {
  selected: ICompanyData;
}

const Company = ({ selected }: Props) => {
  return (
    <div className="product-selected-product">
      <div className="header-product">
        <h1>{selected.name}</h1>
        <h3 className="header-category">
          Legal Number : {selected.legalNumber}
        </h3>
        <p>{selected.description}</p>
        <h3 className="header-owner">Owner : {selected.owner?.username}</h3>
        <h3 className="header-company">
          Website :{" "}
          <a href={selected.website} target="_blank">
            {selected.website}
          </a>
        </h3>
        <h3 className="header-stock">
          Incorporation Country : {selected.incorporationCountry}
        </h3>
        <h3 className="header-added">{`Added ${ago(
          selected.createdAt
        )} ago`}</h3>
      </div>
      <img src={selected.photo} alt="selected product" />
    </div>
  );
};

export default Company;
