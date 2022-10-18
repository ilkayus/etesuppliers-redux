import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const returnPreviousPage = () => navigate(-1);
  return (
    <section className="unauthorized">
      <h1>Unauthorized</h1>
      <br />
      <p>
        You need to be position of manager or higher for to access to the
        requested page.
      </p>
      <div>
        <button onClick={returnPreviousPage}>Return</button>
      </div>
    </section>
  );
};

export default Unauthorized;
