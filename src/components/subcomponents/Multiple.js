import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "../../../node_modules/rc-pagination/assets/index.css";
//import "rc-pagination/assets/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

//pages
import DeleteStays from "../subcomponents/DeleteStays";
import AppNav from "../header/AppNav";

import { allData } from "./constants";

const tableHead = {
  name: "Campaign Name",
  parentId: "Campaign Id",
  campaignType: "Type",
  status: "Status",
  channel: "Channel",
  action: "Actions",
};

const Multiple = () => {
  //fetch
  const [modalShow, setModalShow] = React.useState(false);
  const [stay, setStay] = useState([]);
  const fetchStay = () => {
    fetch(`http://localhost:8000/data`)
      .then((response) => response.json())
      .then((data) => setStay(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStay();
  });

  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(stay.slice(0, countPerPage))
  );
  const searchData = React.useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        stay
          .filter((item) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(stay.slice(from, to)));
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
      <div class="search">
        <input
          placeholder="Search Campaign"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">
          {/*{tableData()}*/}
          {stay.map((s, i) => (
            <tr>
              <td>
                <div key={i}>{s.id}</div>
              </td>
              <td>
                <div key={i}>{s.stayName}</div>
              </td>
              <td>
                <div key={i}>{s.stayLocation}</div>
              </td>
              <td>
                <div key={i}>{s.accomodation}</div>
              </td>
              <td>
                <div key={i}>{s.category}</div>
              </td>
              <td>
                <Link to="/EditStays">
                  <FontAwesomeIcon
                    icon={faPen}
                    size="lg"
                    className="custom-icon"
                  />
                </Link>
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  className="custom-icon"
                  onClick={() => setModalShow(true)}
                />
                <DeleteStays
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={stay.length}
      />
    </>
  );
};
export default Multiple;
