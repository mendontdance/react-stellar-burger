import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from "./services/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// let afds = [{ _id: 1431, __v: 0 }, { _id: 333, __v: 0 }, { _id: 1431, __v: 0 }, { _id: 1431, __v: 0 }, { _id: 111, __v: 0 }]

// const ids = afds.map(({ _id }) => _id);
// const qwer =  afds.filter((elem, index) => {
//   return !ids.includes(elem._id, index + 1)
// });

// let rewq = [1432, 4312, 1111, 2222, 4312, 4312]

// const asdf = rewq.reduce((accum, elem) => {
//   accum[elem] = (accum[elem] || 0) + 1;
//   return accum
// }, {})

// console.log(asdf);


//  const result = [1, 3, 4, 1, 1, 3, 4, 5].reduce((acc, el) => {
//     acc[el] = (acc[el] || 0) + 1;
//     return acc;
//   }, {})
//   console.log(result);

// const arr = [{
//   id: 1,
//   name: 'one'
// }, {
//   id: 2,
//   name: 'two'
// }, {
//   id: 1,
//   name: 'one'
// }];

// const ids = arr.map(({ id }) => id);
// const filtered = arr.filter(({ id }, index) => !ids.includes(id, index + 1));

// console.log(filtered);

// const a = (id, name, surname) =>  {
//   return {
//     id, name, surname
//   }
// }

// const qwer = a(111, 'danil', 'DK')
// console.log(a());