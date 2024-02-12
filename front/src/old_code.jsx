// import axios from 'axios';
// import { createSlice } from '@reduxjs/toolkit';

// export const companyReducer = createSlice({
//   name: 'company',
//   initialState: {},
//   reducers: {
//     getCompany: (currentState, action) => {
//       const accessToken =
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE3MDc2NTUzNzMsImV4cCI6MTcwNzc0MTc3M30.6_GRVBLRPGsgSKXpNDTnErdMfIk5m-fKEIBqNZp-Ybw';
//       let company;
//       axios
//         .get('http://localhost:3080/company/1', {
//           headers: {
//             authorization: `Bearer ${accessToken}`,
//           },
//         })
//         .then((res) => {
//           company = res.data[0];
//           //return { ...currentState, company: res.data[0] };
//           //const company = { ...currentState.company, company: action.payload };
//           //return { ...currentState, company };
//           // const company = res.data[0];
//           // return company;
//           //currentState.push(res.data[0]);
//         })
//         .catch((error) => console.log(error));
//       console.log(company);
//       console.log('ici');
//     },
//     // updateCompany: (currentState, action) => {
//     //   const company = { ...currentState.company, company: action.payload };
//     //   return { ...currentState, company };
//     // },
//   },
// });

// import axios from 'axios';
// import { createSlice } from '@reduxjs/toolkit';

// export const companyReducer = createSlice({
//   name: 'company',
//   initialState: {},
//   reducers: (create) => ({
//     fetchTodo: create.asyncThunk(
//       async (id, thunkApi) => {
//         const res = await fetch(`myApi/todos?id=${id}`)
//         return await res.json()
//       },
//       {
//         pending: (state) => {
//           state.loading = true
//         },
//         rejected: (state, action) => {
//           state.loading = false
//         },
//         fulfilled: (state, action) => {
//           state.loading = false
//           state.todos.push(action.payload)
//         },
//       }
//     ),
//   })
//     // getCompany: (currentState, action) => {
//     //   const accessToken =
//     //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5LCJpYXQiOjE3MDc2NTUzNzMsImV4cCI6MTcwNzc0MTc3M30.6_GRVBLRPGsgSKXpNDTnErdMfIk5m-fKEIBqNZp-Ybw';
//     //   let company;
//     //   axios
//     //     .get('http://localhost:3080/company/1', {
//     //       headers: {
//     //         authorization: `Bearer ${accessToken}`,
//     //       },
//     //     })
//     //     .then((res) => {
//     //       company = res.data[0];
//     //       //return { ...currentState, company: res.data[0] };
//     //       //const company = { ...currentState.company, company: action.payload };
//     //       //return { ...currentState, company };
//     //       // const company = res.data[0];
//     //       // return company;
//     //       //currentState.push(res.data[0]);
//     //     })
//     //     .catch((error) => console.log(error));
//     //   console.log(company);
//     //   console.log('ici');
//     // },
//     // updateCompany: (currentState, action) => {
//     //   const company = { ...currentState.company, company: action.payload };
//     //   return { ...currentState, company };
//     // },
//   // },
// });


// COMPANY.JSX

// import { useStore } from 'react-redux';
// import { companyReducer } from '../store/companyReducer';

// function Company() {
//   const store = useStore();
//   console.log(store.getState().company);
//   return (
//     <div className="main">
//       <h1>ENTREPRISE</h1>
//       <button
//         onClick={() => {
//           store.dispatch(companyReducer.actions.getCompany());
//           console.log(store.getState().company);
//         }}
//       >
//         GET COMPANY
//       </button>
//       <p>{/* {company.id} {company.name} */}</p>
//     </div>
//   );
// }

// export default Company;




// PACKAGE.JSON

// {
//     "homepage": "https://phoenix23333323.github.io/backoffice",
//     "dependencies": {
//       "axios": "^1.6.7",
//     },
//     "scripts": {
//       "deploy": "gh-pages -d build",
//     },
//     "devDependencies": {
//       "gh-pages": "^6.1.1"
//     }
//   }


// AXIOS.JS

// import { Axios } from 'axios';

// const API_BASE_URL = 'http://localhost:3080/';
// const axios = Axios.create({ baseURL: API_BASE_URL });

// export default axios;
