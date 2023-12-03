import React, { useEffect, useState } from "react";
import "./DiseaseTable.css";
import { fetchData } from "../services/api";
import BarChart from "./BarChart";
import RadarChart from "./RadarChart";

function DiseaseTable() {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedChart, setSelectedChart] = useState("bar"); // default bar chart is selected
  const [dynamicTitle, setDynamicTitle] = useState("");
  const categories = [
    "literature",
    "rna_expression",
    "genetic_association",
    "somatic_mutation",
    "known_drug",
    "animal_model",
    "affected_pathway",
  ]; // define all categories

  useEffect(() => {
    fetchData()
      .then((result) => {
        const sortedData =
          result.disease.associatedTargets &&
          result.disease.associatedTargets.rows.sort(
            (a, b) => b.score - a.score
          );
        const top10Targets = sortedData.slice(0, 10); // top 10 targets in desc order
        setData(top10Targets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRowClick = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
      setSelectedChart("bar");
      setDynamicTitle(""); // Reset the title when collapsing the row
    } else {
      setExpandedRows([...expandedRows, index]);
      setDynamicTitle(data[index].target.approvedSymbol);
    }
  };

  return (
    <div>
      {data && (
        <div>
          <h2>Associated Targets for Lung Carcinoma</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Approved Symbol</th>
                <th scope="col">Gene Name</th>
                <th scope="col">Overall Association Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <React.Fragment key={row.target.id}>
                  <tr>
                    <td>
                      <button
                        className="expand"
                        onClick={() => handleRowClick(index)}
                      >
                        {expandedRows.includes(index) ? "-" : "+"}
                      </button>
                    </td>
                    <td>
                      <a
                        href={`https://platform.opentargets.org/target/${row.target.approvedName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.target.approvedSymbol}
                      </a>
                    </td>
                    <td>{row.target.approvedName}</td>
                    <td>{row.score}</td>
                  </tr>
                  {expandedRows.includes(index) && (
                    <tr>
                      <td colSpan="4">
                        <div>
                          <button
                            className={`chartButton ${
                              selectedChart === "bar" ? "active" : ""
                            }`}
                            onClick={() => setSelectedChart("bar")}
                          >
                            Bar Chart
                          </button>
                          <button
                            className={`chartButton ${
                              selectedChart === "radar" ? "active" : ""
                            }`}
                            onClick={() => setSelectedChart("radar")}
                          >
                            Radar Chart
                          </button>
                        </div>
                        <div>
                          <h3>
                            Data Type Scores: {dynamicTitle} and lung carcinoma
                          </h3>
                        </div>
                        {selectedChart === "bar" ? (
                          <BarChart
                            data={row.datatypeScores}
                            categories={categories}
                          />
                        ) : selectedChart === "radar" ? (
                          <RadarChart
                            data={row.datatypeScores}
                            categories={categories}
                          />
                        ) : null}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DiseaseTable;
