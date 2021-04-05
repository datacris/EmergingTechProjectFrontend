import Axios from "axios";

export const initialState = {
  user: null,
  // endpoint_API: 'https://cristian-zuluaga-emerging-tech-final-project.netlify.app',
  // endpoint_API: 'https://datacris-emerging-mern-project.herokuapp.com',
  endpoint_API: 'http://localhost:3000',
};


//***************************************** */
//Use promises to get user info in the cookie
//***************************************** */
export const readCookie = (

  Axios.get('/read_cookie')
    .then((result) => {
      return (result.data);
    })
    .catch((error) => {
      console.log(error);
    }))
  .then((response) => {
    return response;
  });


const reducer = (state, action) => {

  console.log(action);

  switch (action.type) {
    case 'ACTION':
      return {};

    default:
      return state;
  }
};

export default reducer;
