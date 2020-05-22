import firebase from "firebase/app";
import "firebase/database";
import {
  state,
  userListTemplate,
  modalFormSendButton,
  inputName,
  inputSurname,
  inputLocation,
  formErr
} from "./js/variables";

firebase.initializeApp(state.firebaseConfig);

const viewUserList = async () => {
  let expansion = await fetchUserList();
  if (expansion) {
    const userListItems = state.userList.reduce((transport, item) => {
      transport += userListTemplate
        .replace(/__USERNAME__/, item.name)
        .replace(/__USERLASTNAME__/, item.lastname)
        .replace(/__USERLOCATION__/, item.location)
        .replace(/__USERID__/, item.id);
      return transport;
    }, "");
    document.getElementById("userListContainer").innerHTML = userListItems;
  }
};

const fetchUserList = () => {
  state.userList = [];
  return new Promise(resolve => {
    firebase
      .database()
      .ref("/")
      .once("value")
      .then(function(snapshot) {
        if (snapshot.val() !== null) {
          let myData = snapshot.val();
          for (let index in myData) {
            state.userList.push(myData[index]);
            resolve(true);
          }
        }
      });
  });
};

const writeUserData = (name, surname, location) => {
  let lastUserId = 0;
  if (state.userList.length > 0) {
    lastUserId = state.userList[state.userList.length - 1].id + 1;
  }
  firebase
    .database()
    .ref("/" + lastUserId)
    .set({
      id: lastUserId,
      name: name,
      lastname: surname,
      location: location
    });
};

const removeUserData = userId => {
  var userData = firebase.database().ref("/" + userId);
  userData
    .remove()
    .then(function() {
      console.log("Remove Ok.");
    })
    .catch(function(error) {
      console.log("Remove fail: " + error.message);
    });

  viewUserList();
};

modalFormSendButton.addEventListener("click", function() {
  let name = inputName.value;
  let surname = inputSurname.value;
  let location = inputLocation.value;

  if (name !== "" && surname !== "" && location !== "") {
    writeUserData(name, surname, location);
    formErr.classList.add("d-none");
    viewUserList();
    $("#exampleModal").modal("hide");
    clearInputValue();
  } else {
    formErr.classList.remove("d-none");
  }
});

document.body.addEventListener("click", function(event) {
  if (event.srcElement.id === "removeUserButton") {
    let userId = event.target.getAttribute("data-id");
    removeUserData(userId);
  }
});

const clearInputValue = () => {
  inputName.value = "";
  inputSurname.value = "";
  inputLocation.value = "";
};

viewUserList();
