import React from "react";

const PercentageCircle = ({
  circleSize = 168,
  percent = 0,
  fontColor = "rgba(0,0,0,.5)",
  circleColor = "#30b37e",
  circleInnerColor = "#d9f5ea",
}) => {
  const validPercent = Math.floor(Math.max(Math.min(percent, 100), 0));

  const strokeWidth = circleSize / 14;
  const diameter = circleSize - strokeWidth;
  const radius = diameter / 2;
  const circumference = 2 * Math.PI * radius;
  const pCircumference = (circumference * validPercent) / 100;
  const x = circleSize / 2;
  const y = (circleSize - diameter) / 2;
  const fontSize = circleSize / 3.73;
  const textX = circleSize / 2 - fontSize / 1.8;
  const d = `
    M ${x} ${y}
    a ${radius} ${radius} 0 0 1 0 ${diameter}
    a ${radius} ${radius} 0 0 1 0 ${diameter * -1}
  `;

  return (
    <div
      style={{
        position: "relative",
        width: circleSize,
        height: circleSize,
      }}
    >
      <svg viewBox={`0 0 ${circleSize} ${circleSize}`} stroke={circleColor}>
        <path
          style={{
            fill: "none",
            stroke: circleInnerColor,
            strokeWidth,
          }}
          d={d}
        />
        <path
          style={{
            fill: "none",
            strokeWidth,
          }}
          d={d}
          strokeDasharray={`${pCircumference} ${circumference}`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "center",
          color: fontColor,
          top: textX,
          fontSize,
        }}
      >
        {validPercent}
        <span style={{ fontSize: fontSize / 2 }}>%</span>
      </div>
    </div>
  );
};

export default PercentageCircle;
