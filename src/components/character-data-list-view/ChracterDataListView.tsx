import "./ChracterDataListView.css";
import React, { useState } from "react";
import Pagination from "../pagination/Pagination";
import { CSVLink } from "react-csv";
import { ChracterDataListViewProps } from "./type";
import StarWarsCharactersImg from "../../assets/images/characters.jpg";

const ChracterDataListView: React.FC<ChracterDataListViewProps> = ({
  title,
  data,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedSpecies, setSelectedSpecies] = useState<string | undefined>(
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
    ? data.filter((item) => item.species?.skinColors.includes(selectedSpecies))
    : data;

  const convertSpeciesToString = (species?: { skinColors: string[] }) => {
    return species ? species.skinColors.toString() : "";
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="data-list-view">
      <h2>{title}</h2>
      <img src={StarWarsCharactersImg} className="banner" alt="chracters" />

      <label htmlFor="species">Skin Color Filter</label>
      <select
        id="species"
        onChange={(e) => {
          setCurrentPage(1);
          setSelectedSpecies(e.target.value);
        }}
        value={selectedSpecies || ""}
      >
        <option value="">All</option>
        {Array.from(
          new Set(data.flatMap((item) => item.species?.skinColors ?? []))
        ).map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </select>
      <CSVLink
        data={filteredData.map((item) => ({
          ...item,
          species: convertSpeciesToString(item.species),
        }))}
        filename={"star-wars.csv"}
      >
        <button className="btn btn-success excel-button">Download Excel</button>
      </CSVLink>
      <table className="table table-dark">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Name</th>
            <th style={{ width: "50%" }}>Skin Colors</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <th>{item.name}</th>
              <td> {convertSpeciesToString(item.species) || "-"}</td>
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

export default ChracterDataListView;
