import React from "react";
import "../assets/css/Table.css";

const Table = ({ counteries }) => {
  return (
    <div className="table">
      {counteries.map(({ countryInfo, country, cases }) => (
        <tr>
          <td>
            <img
              className="table__flag"
              src={countryInfo.flag}
              width="20px"
              alt=""
            />
            {country}
          </td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
