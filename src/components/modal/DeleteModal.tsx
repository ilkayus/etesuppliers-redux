import React from "react";
import { selectTableData } from "features/commonData/dataSlice";
import { useAppSelector } from "hooks/typedReduxHooks";
import API from "api";

export interface Props {
  onClose: any;
}

const DeleteModal = ({ onClose }: Props) => {
  const state = useAppSelector(selectTableData);

  const deleteItem = () => {
    if (state.page === "products") {
      API.product.deleteProduct(state.selected.product._id!);
    }
    if (state.page === "companies") {
      API.company.deleteCompany(state.selected.company._id!);
    }
    onClose();
  };

  return (
    <div className="modal-delete">
      <h2>This action is irreversible. Are you sure to delete this item?</h2>
      {state.page === "companies" ? (
        <h3>({state.selected.company.name})</h3>
      ) : (
        <h3>({state.selected.product.name})</h3>
      )}
      <button onClick={() => onClose()}>EXIT WITHOUT DELETE</button>
      <button onClick={() => deleteItem()}>DELETE</button>
    </div>
  );
};

export default DeleteModal;
