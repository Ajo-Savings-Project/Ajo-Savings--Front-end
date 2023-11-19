import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseRoute } from "./view/routes/BaseRoutes";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <main id="app">
        <BaseRoute />
      </main>
    </Provider>
  );
}

export default App;
