import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";
// redux
import { Provider } from "react-redux";
import { persistor, store } from "./store";
// axios
import "./services/axios-global.js"
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css"
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
        <AppRouter/>
        </PersistGate>
    </Provider>
);
