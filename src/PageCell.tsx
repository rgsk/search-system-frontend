import React from "react";

function PageCell({
  v,
  onClick,
  active,
}: {
  v: number;
  onClick: () => void;
  active: boolean;
}) {
  const activeStyles = active ? { borderColor: "blue", color: "blue" } : {};
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: "50%",
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        padding: "5px",
        minWidth: 30,
        minHeight: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 14,
        cursor: "pointer",
        ...activeStyles,
      }}
    >
      {v}
    </div>
  );
}

export default PageCell;
