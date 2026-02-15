import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AppRoutes from "./routes";
import "antd/dist/reset.css";
import Loader from "./component/common/Loader";
// import LoaderAnimation from "./component/common/LoaderAnimation";

function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AppRoutes />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
