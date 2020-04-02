// Action Creator = Customers

export let onLoginUser = user => {

  // Destruct object
  let{id,username}=user

  // Set local storage
  localStorage.setItem('userData', JSON.stringify({id,username}))
  // Mengirim data ke redux untuk kemudian di simpan di redux state
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      id: user.id,
      username: user.username
    }
  };
};

export let onLogoutUser = user => {
  // Set Localstorage
  localStorage.removeItem('userData')
  return {
    type: "LOGOUT_SUCCESS",
    payload: {
      id: "",
      username: ""
    }
  };
};

// user{}
export let keepLogin =(user)=>{
  return{
    type : 'LOGIN_SUCCESS',
    payload:{
      id: user.id,
      username:user.username
    }
  }
}