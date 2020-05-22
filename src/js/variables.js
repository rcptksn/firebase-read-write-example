export const state = {
  firebaseConfig: {
    apiKey: "AIzaSyCZU84rJVUzqSYyRfqqypUUzs1SAroiPiI",
    authDomain: "userlist-f89f5.firebaseapp.com",
    databaseURL: "https://userlist-f89f5.firebaseio.com",
    projectId: "userlist-f89f5",
    storageBucket: "userlist-f89f5.appspot.com",
    messagingSenderId: "541058403188",
    appId: "1:541058403188:web:90a62f8409570290553a21"
  },
  userList: []
};

export let userListTemplate = `
<div class="media text-muted pt-3">
          <img
            src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
            width="32"
            class="bd-placeholder-img mr-2 rounded"
            alt=""
          />
          <div
            class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
          >
            <div
              class="d-flex justify-content-between align-items-center w-100"
            >
              <strong class="text-gray-dark">__USERNAME__ __USERLASTNAME__</strong>
              <a href="javascript:;" id="removeUserButton" data-id="__USERID__">Delete</a>
            </div>
            <span class="d-block">__USERLOCATION__</span>
          </div>
        </div>
`;
export let modalFormSendButton = document.getElementById(
  "modalform-send-button"
);
export let inputName = document.getElementById("form-name");
export let inputSurname = document.getElementById("form-surname");
export let inputLocation = document.getElementById("form-location");
export let formErr = document.getElementById("formErr");
