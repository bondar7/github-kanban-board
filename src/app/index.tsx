import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import "./App.css";
import {Provider} from "react-redux";
import {store} from "../shared/store/store";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)
