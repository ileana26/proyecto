import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
    <App />
    </MuiPickersUtilsProvider>
  </React.StrictMode>
);



