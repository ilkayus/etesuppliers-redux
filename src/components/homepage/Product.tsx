import { IProductData } from "types/product.interface";
import { ago } from "../table/table.helper";

export interface Props {
  selected: IProductData | any;
}

const Product = ({ selected }: Props) => {
  return (
    <div className="product-selected-product">
      <div className="header-product">
        <h1>{selected.name}</h1>
        <h3 className="header-category">{`Category : ${selected.category}`}</h3>
        <p>{selected.description}</p>
        <h3 className="header-owner">{`Owner : ${selected.owner?.username}`}</h3>
        <h3 className="header-company">{`Company : ${selected.company.name}`}</h3>
        <h3 className="header-stock">
          In Stock : {selected.amount + " " + selected.amountUnit}
        </h3>
        <h3 className="header-added">{`Added ${ago(
          selected.createdAt
        )} ago`}</h3>
      </div>
      <img src={selected.photo} alt="selected product" />
    </div>
  );
};

export default Product;
