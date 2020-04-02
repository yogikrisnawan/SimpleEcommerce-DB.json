// Reducer/Divisi
// state = data dari brankas
// actuib = form dari user
let init = {
  id: "",
  username: "",
  message: ""
};

export default (state = init, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username
      };

    case "LOGOUT_SUCCESS":
      return { ...state, id: "", username: "" };

    default:
      return state;
  }
};
