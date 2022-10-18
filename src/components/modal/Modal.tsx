import { useEffect, useState } from "react";
import "./style/modal.css";
import API from "api";
import useAuth from "hooks/useAuth";
import * as formHelper from "./modal.helper";

export interface Props {
  onClose: any;
  state: any;
}
const Modal = ({ state, onClose }: Props) => {
  const { auth } = useAuth();
  const [form, setForm] = useState<any>({});
  const [formContent, setFormContent] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    if (state.dataType === "product") {
      const companyList = async () => {
        const res = await API.search.getCompanyList(auth);
        return res;
      };
      companyList().then((data) => setCompanies(data));
    }
  }, [auth, state.dataType]);

  useEffect(() => {
    if (state.actionType === "update")
      setForm(() => ({
        ...state.data,
      }));
  }, [state.actionType, state.data]);

  useEffect(() => {
    const formKeys =
      formHelper.formKeys[state.dataType === "product" ? "product" : "company"];
    const formNames =
      formHelper.formNames[
        state.dataType === "product" ? "product" : "company"
      ];
    let formContents: any[] = [];
    for (let i = 0; i < formKeys.length; i++) {
      if (formKeys[i] === "company" && companies.length > 0)
        formContents.push(
          <div key={i} className="form-input-field">
            <label key={1 + i * 10} htmlFor="company" className="form-label">
              Company :
            </label>
            <select
              key={11112 + i}
              // list="company-datalist"
              name="company"
              required
              autoComplete="off"
              className={`form-input-company`}
              onChange={(e) => handleFormChange(e)}
            >
              <option key={21} value={form.company?._id}>
                {form.company?.name}
              </option>
              {companies.map((el: any, idx: number) => (
                <option key={idx + i * 22} value={el._id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        );
      else if (formKeys[i] !== "company")
        formContents.push(
          <div key={7 + i * 11} className="form-input-field">
            <label
              key={1 + i * 10}
              htmlFor={formKeys[i]}
              className="form-label"
            >
              {formNames[i]} :
            </label>
            <input
              key={2 + i * 10}
              type="text"
              name={formKeys[i]}
              required={formHelper.formRequired.has(formKeys[i])}
              className={`form-input-${formKeys[i]}`}
              value={form[formKeys[i]]}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
        );
    }
    // if (state.dataType === "product") formContent.push(companies);
    setFormContent(formContents);
  }, [form, state.dataType, companies]);

  const deleteItem = () => {
    let res: any;
    if (state.dataType === "product") {
      res = API.product.deleteProduct(auth, state.data._id);
    }
    if (state.dataType === "company") {
      res = API.company.deleteCompany(auth, state.data._id);
    }
    onClose();
  };

  const handleFormChange = (e: any) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (state.dataType === "product" && state.actionType === "update") {
      const res = API.product.updateProduct(auth, form);
    //  console.log("pro up");
    }
    if (state.dataType === "company" && state.actionType === "update") {
      const res = API.company.updateCompany(auth, form);
   //   console.log("comp up");
    }
    if (state.dataType === "product" && state.actionType === "add") {
      const res = API.product.createProduct(auth, form);
    //  console.log("pro add:", res);
    }
    if (state.dataType === "company" && state.actionType === "add") {
      const res = API.company.createCompany(auth, form);
     // console.log("comp add:", res);
    }
    onClose();
  };

  return (
    <div className="overlay" onClick={() => onClose()}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {state.actionType === "delete" ? (
          <div className="modal-delete">
            <h2>
              This action is irreversible. Are you sure to delete this item?
            </h2>
            <h3>({state.data.name})</h3>
            <button onClick={() => onClose()}>EXIT WITHOUT DELETE</button>
            <button onClick={() => deleteItem()}>DELETE</button>
          </div>
        ) : (
          <div className="modal-form">
            <h2>
              {state.actionType.toUpperCase()}
              <br />{" "}
              {state.actionType === "update" ? state.data.name : form.name}
            </h2>
            <img
              src={
                form.photo
                  ? form.photo
                  : "https://dummyimage.com/256x256/cccccc/000.png"
              }
              alt="company-product logo"
            />
            <form method="post" onSubmit={handleFormSubmit}>
              {formContent?.map((el: any) => el)}
              <div className="form-buttons">
                <button onClick={() => onClose()}>CANCEL</button>
                <button type="submit">{state.actionType.toUpperCase()}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
