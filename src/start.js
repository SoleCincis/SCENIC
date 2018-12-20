import React from "react";
import ReactDOM from "react-dom";
import SceneReader from "./sceneReader";
import SceneImporter from "./sceneImporter";
import Welcome from "./welcome";

import { BrowserRouter, Route } from "react-router-dom";

const router = (
  <BrowserRouter>
    <div>
      <Route path="/read/:id" component={SceneReader} />
      <Route path="/import" component={SceneImporter} />
      <Route path="/welcome" component={Welcome} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(router, document.querySelector("main"));
