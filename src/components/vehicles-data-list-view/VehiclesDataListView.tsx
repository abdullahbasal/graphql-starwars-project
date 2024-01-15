import "./VehiclesDataListView.css";
import React, { useState } from "react";
import Pagination from "../pagination/Pagination";
import { CSVLink } from "react-csv";
import { VehiclesDataListViewProps } from "./type";
import StarWarVehicleImg from "../../assets/images/vehicles.jpg";

const VehiclesDataListView: React.FC<VehiclesDataListViewProps> = ({
  title,
  data,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedSpecies] = useState<string | undefined>(
    undefined
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setCurrentPage(1);
    setItemsPerPage(itemsPerPage);
  };

  const filteredData = selectedSpecies
    ? data.filter((item) => item.name.includes(selectedSpecies))
    : data;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="data-list-view">
      <h2>{title}</h2>
      <img src={StarWarVehicleImg} className="banner" alt="chracters" />
      <CSVLink
        data={filteredData.map((item) => ({
          ...item,
        }))}
        filename={"star-wars.csv"}
      >
        <button className="btn btn-success excel-button">Download Excel</button>
      </CSVLink>
      <table className="table table-dark">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default VehiclesDataListView;
