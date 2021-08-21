import React from "react";

import { AppLayout } from "../../_components";
import { Route, useParams, Redirect } from "react-router-dom";
import { D3CirclePage, D3LineChartPage } from "./subPages";

function D3PracticePage() {
  const { id } = useParams();

  return (
    <AppLayout>
      {id === undefined && <Redirect to="/d3_practice/circle" />}
      <Route
        path={`/d3_practice/${id}`}
        component={id === "circle" && D3CirclePage}
      ></Route>
      <Route
        path={`/d3_practice/${id}`}
        component={id === "line_chart" && D3LineChartPage}
      ></Route>
    </AppLayout>
  );
}

export { D3PracticePage };
