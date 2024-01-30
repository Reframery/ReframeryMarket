import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"

import store from "app/store"
import App from "./App"

import "style/index.css"
import "style/app.scss"
import "react-toastify/dist/ReactToastify.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col min-h-screen">
        <App />
      </div>
    </Provider>
  </StrictMode>
)
