import { useState, useEffect } from "react";
import { RAPID_API_URL } from "../../config/constants";
import Loader from "../Loader";

const TotalCount = ({ subtitle, order, client }) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [totalDevices, setTotalDevices] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch(`${RAPID_API_URL}${order}?client=${client}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (Object.keys(data)?.length > 0) {
        const total = data && data.total;
        setTotalDevices(total);
      }
      if (Object.keys(data)?.length > 1) {
        const count = data && data.success
        setCount(count);
      } else {
        setCount(0);
      }
      setLoading(false);
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <span className="u-font-14">{subtitle}</span>
          <div
            className="d-flex align-items-center justify-content-center flex-column u-prevent-text-selection h-100 u-prevent-text-selection"
          >
            {count ? (
              <div className="total-count" style={{ fontSize: "3rem" }}>
                <span>
                  {count}
                </span>
                <span>
                  {"/"}
                  {totalDevices}
                </span>
              </div>
            ) : (
              <span style={{ fontSize: "3rem" }} className="total-count">
                {totalDevices}
              </span>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TotalCount;
