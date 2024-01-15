import "./FilmsDataListView.css";
import React, { useState } from "react";
import Pagination from "../pagination/Pagination";
import { CSVLink } from "react-csv";
import { FilmsDataListViewProps } from "./type";
import StarWarsFilmImg from "../../assets/images/films.jpg";

const FilmsDataListView: React.FC<FilmsDataListViewProps> = ({
  title,
  data,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProducers, setSelectedProducers] = useState<
    string | undefined
  >(undefined);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setCurrentPage(1);
    setItemsPerPage(itemsPerPage);
  };

  const filteredData = selectedProducers
    ? data.filter((item) => item.producers?.includes(selectedProducers))
    : data;

  const convertProducersToString = (producers: string[] | undefined) => {
    return producers ? producers.toString() : "";
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="data-list-view">
      <h2>{title}</h2>
      <img src={StarWarsFilmImg} className="banner" alt="chracters" />

      <label htmlFor="Producers">Producer Filter</label>
      <select
        id="Producers"
        onChange={(e) => {
          setCurrentPage(1);
          setSelectedProducers(e.target.value);
        }}
        value={selectedProducers || ""}
      >
        <option value="">All</option>
        {Array.from(new Set(data.flatMap((item) => item.producers ?? []))).map(
          (color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          )
        )}
      </select>
      <CSVLink
        data={filteredData.map((item) => ({
          ...item,
          producers: convertProducersToString(item.producers),
        }))}
        filename={"star-wars.csv"}
      >
        <button className="btn btn-success excel-button">Download Excel</button>
      </CSVLink>
      <table className="table table-dark">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Name</th>
            <th style={{ width: "50%" }}>Producers</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td> {convertProducersToString(item.producers) || "-"}</td>
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

export default FilmsDataListView;
