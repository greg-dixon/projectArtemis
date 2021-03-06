import React, { useState } from "https://esm.sh/react";
import artemisQuery from "../../../functions/artemisQuery.ts";
import calculateMetrics from "../../../functions/calculateMetrics.ts";
import clearSnapshots from "../../../functions/clearSnapshots.ts";
import "../../../style/query.css";

interface Result {
  apis: {};
  latencyAvg: string;
  latencyMax: string;
  sizeAvg: string;
  sizeMax: string;
  queryTotal: any;
  queryFrequency: number;
  errorFrequency: number;
}
interface Props {
  aggregateMetrics: Result | null;
  snapshotArray: any;
  setSnapshotArray: (myArray: any | symbol) => void;
  setAggregateMetrics: (myObject: object) => void;
}

const ClientQuery = (props: Props) => {
  const { snapshotArray, setAggregateMetrics, setSnapshotArray } = props;
  const [query, setQuery] = useState("");
  const [URL, setURL] = useState("");
  const [number, setNumber] = useState(0);

  const runQuery = (URL: string, query: string, number: number) => {
    try {
      if (number > 0) {
        artemisQuery(URL, query)
          .then((result) => {
            if (Array.isArray(snapshotArray) && snapshotArray.length > 0) {
              // console.log("Snapshot Array Before", snapshotArray);
              // console.log("New Array", [...snapshotArray, result]);
              setSnapshotArray([...snapshotArray, result]);
              // localStorage.setItem(
              //   "artemis",
              //   JSON.stringify([...snapshotArray, result]),
              // );
            } else {
              console.log(result);
              // localStorage.setItem(
              //   "artemis",
              //   JSON.stringify([result]),
              // );
              setSnapshotArray([result]);
            }
            // console.log("Snapshot Array After", snapshotArray);
            // console.log(
            //   "Local Storage Client Query",
            //   JSON.parse(localStorage.getItem("artemis")),
            // );
          }).then(() => {
            number--;
            return runQuery(URL, query, number);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  let formWidth = "600px";
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (number > 0) {
      runQuery(URL, query, number);
      if (Array.isArray(snapshotArray) && snapshotArray.length > 0) {
        const newMetrics = calculateMetrics(snapshotArray);
        setAggregateMetrics(newMetrics);
      }
    }
  };
  return (
    <div className="queryForm">
      <br></br>
      <form
        action=""
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitForm}
      >
        <div className="url-number">
          <label>URL:</label>
          <input
            id="urlInput"
            type="text"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
          />
          <div>
            <label className="numberLabel">Number of Queries:</label>
            <input
              id="numberInput"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>
        <br></br>
        <label>Query:</label>
        <textarea
          id="queryInput"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <br></br>
        <input id="submitButton" type="submit" value="Submit" />
        <button
          id="clearButton"
          onClick={(e) => {
            clearSnapshots();
            setSnapshotArray([]);
          }}
        >
          Clear Snapshots
        </button>
      </form>
    </div>
  );
};

export default ClientQuery;
