import React from "react";
import { ResponsiveLine } from "@nivo/line";

import "../styles/graph-view.css";

const GraphContainerView = (props) => {
  const handleGraphOptionChanged = (id) => {
    props.optionChangeHandler?.(id);
  };

  const options = props.graphOptions || [];
  const getGraphOptions = () => {
    return options.map((option) => {
      const className =
        props.selectedOption === option.id
          ? "graphOption selected btn btn-primary"
          : "graphOption btn btn-outline-primary";

      return (
        <div
          className={className}
          onClick={handleGraphOptionChanged.bind(this, option.id)}
          key={option.id}
        >
          {option.label}
        </div>
      );
    });
  };

  const getGraphHeader = () => {
    return (
      <div className="graphHeader">
        <div className="graphOptionsWrapper">{getGraphOptions()}</div>
        <div className="graphHeaderRightSection">
          {props.graphHeaderRightSection || null}
        </div>
      </div>
    );
  };

  return (
    <div
      className="graphContainer"
      style={{ backgroundColor: "white", marginTop: "30px" }}
    >
      {getGraphHeader()}
      <div className="graphWrapper" style={{ height: 300 }}>
        <ResponsiveLine
          data={props.data}
          margin={{ top: 50, right: 90, bottom: 50, left: 120 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
            stacked: true,
            min: "auto",
            max: "auto",
          }}
          minY="auto"
          maxY="auto"
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Expenses",
            legendOffset: -56,
            legendPosition: "middle",
          }}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Time",
            legendOffset: 40,
            legendPosition: "middle",
          }}
          dotSize={10}
          curve="cardinal"
          pointSize={10}
          pointColor="white"
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          useMesh={true}
          dotSize={10}
          dotColor="inherit:darker(0.3)"
          dotBorderWidth={2}
          dotBorderColor="#ffffff"
          enableDotLabel={true}
          dotLabel="y"
          dotLabelYOffset={-12}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default GraphContainerView;
