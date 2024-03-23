import React from "react";
import { MDBDataTable } from "mdbreact";

const MDTable = () => {
  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
    ],
  };

  return <MDBDataTable striped bordered small data={data} />;
};

export default MDTable;
