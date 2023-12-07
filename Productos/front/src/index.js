//Importaciones de React
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Importaciones Estilo
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, createTheme } from "@mui/material";
import ProductList from "./components/ListaProductos";
import AddProductForm from "./components/AgregarProductos";


const theme = createTheme({
  palette: {
    primary: {
      main: "#d63384",
    },
  },

  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/agregar-producto",
    element: <AddProductForm />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
