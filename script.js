let dom = {
  total_counter: document.querySelector(".total_counter"),
  Favorites_counter: document.querySelector(".Favorites_counter"),
  Emergency_counter: document.querySelector(".Emergency_counter"),
  full_name: document.querySelector(".full_name"),
  phone_number: document.querySelector(".phone_number"),
  email: document.querySelector(".email"),
  address: document.querySelector(".address"),
  group_type: document.querySelector(".group_type"),
  notes: document.querySelector(".notes"),
  check_favour: document.querySelector(".check_favour"),
  emergency_check: document.querySelector(".emergency_check"),
  add_btn: document.querySelector(".add_btn"),
  boxs: document.querySelector(".boxs"),
  modal: document.querySelector(".modal"),
  form: document.querySelector(".form"),
  fullName_erroe: document.querySelector(".fullName_erroe"),
  phoneNumber_erroe: document.querySelector(".phoneNumber_erroe"),
  email_erroe: document.querySelector(".email_erroe"),
};

let contacts_list = [];

if (localStorage.getItem("data") == null) {
  localStorage.setItem("data", JSON.stringify(contacts_list));
} else {
  contacts_list = JSON.parse(localStorage.getItem("data"));
  display();
}

function add() {
  if (!validate()) {
    return;
  } else {
    let contacts = {
      full_name: dom.full_name.value,
      phone_number: dom.phone_number.value,
      email: dom.email.value,
      address: dom.address.value,
      group_type: dom.group_type.value,
      notes: dom.notes.value,
      check_favour: dom.check_favour.value,
      emergency_check: dom.emergency_check.value,
    };

    contacts_list.push(contacts);

    localStorage.setItem("data", JSON.stringify(contacts_list));
    Swal.fire({
      title: "added sucssesfully",
      text: "done",
      icon: "success",
    });
    dom.form.reset();
    display();
  }
}

function display() {
  dom.total_counter.innerHTML = contacts_list.length;
  var cartona = "";

  for (let i = 0; i < contacts_list.length; i++) {
    cartona += `<div class="col-12 display_box col-md-6 ">
                <div class="shadow p-1 box rounded-2 w-100">
                  <div class="upper_card d-flex align-items-center gap-3">
                    <div class="upper_card_left">
                      <p class="m-0 tow_letter rounded-2 p-4 text-white">${getFirsttowletter(
                        contacts_list[i].full_name
                      )}</p>
                    </div>
                    <div class="upper_card_left_text d-flex flex-column gap-2">
                      <p class="m-0 name fw-bold">${
                        contacts_list[i].full_name
                      }</p>
                      <div
                        class="upper_card_left_text_phone d-flex align-items-center gap-2"
                      >
                        <div class="upper_card_left_text_icon p-2 rounded-2">
                          <i class="fa-solid fa-phone text-center"></i>
                        </div>
                        <p class="m-0 text-muted">${
                          contacts_list[i].phone_number
                        }</p>
                      </div>
                    </div>
                  </div>
                  <div class="box_body mt-4 d-flex flex-column gap-3">
                    <div class="box_body_top d-flex align-items-center gap-2">
                      <div class="box_body_top_icon p-2 text-center rounded-2">
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                      <p class="m-0">${contacts_list[i].email}</p>
                    </div>
                    <div
                      class="box_body_miidle d-flex align-items-center gap-2"
                    >
                      <div
                        class="box_body_middle_icon p-2 text-center rounded-2"
                      >
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                      <p class="m-0">${contacts_list[i].address}</p>
                    </div>
                    <div class="rounded-4 text-center foot p-1">
                      <p class="box_body_footer">${
                        contacts_list[i].group_type
                      }</p>
                    </div>
                  </div>
                  <div
                    class="box_footer my-3 d-flex justify-content-between align-items-center"
                  >
                    <div
                      class="box_footer_left d-flex align-items-center gap-2"
                    >
                      <div class="box_footer_left_tel rounded p-2 text-center">
                        <a href="tel:${contacts_list[i].phone_number}">
                          <i class="fa-solid fa-phone text-center"></i>
                        </a>
                      </div>
                      <div class="box_footer_left_mail rounded p-2 text-center">
                        <a href=mailto:"${contacts_list[i].email}">
                          <i class="fa-solid fa-envelope text-center"></i>
                        </a>
                      </div>
                    </div>
                    <div
                      class="box_footer_left d-flex align-items-center gap-2"
                    >
                      <i class="fa-regular fa-star"></i>
                      <i class="fa-regular fa-heart"></i>
                      <i class="fa-solid fa-pen"></i>
                      <i class="fa-solid fa-basket-shopping"></i>
                    </div>
                  </div>
                </div>
              </div>`;

    dom.boxs.innerHTML = cartona;
  }
  localStorage.setItem("data", JSON.stringify(contacts_list));
}
function getFirsttowletter(word) {
  return (word = word
    .split(" ")
    .map(function (w) {
      return w[0];
    })
    .join("")
    .toUpperCase());
}
function showerror(inputClass, errorName, msg) {
  inputClass.style.borderColor = "red";
  errorName.innerHTML = msg;
}
function removeError(inputClass, errorName) {
  inputClass.style.borderColor = "green";
  errorName.innerHTML = "";
}
function validate() {
  let regex_fullName = /^[a-zA-Z ]+$/;
  let regex_phone_num = /^(\+02|022)?(01)(0|1|2|5)[0-9]{8}$/;
  let regex_email = /^[a-zA-Z0-9]+[-_]?[a-zA-Z0-9]+@gmail\.com$/;
  let isValid = true;
  if (dom.full_name.value === "") {
    isValid = false;
    showerror(dom.full_name, dom.fullName_erroe, "please enter your fullname");
  } else if (!regex_fullName.test(dom.full_name.value)) {
    showerror(dom.full_name, dom.fullName_erroe, "enter only letter");
    isValid = false;
  } else {
    removeError(dom.full_name, dom.fullName_erroe);
  }
  if (dom.email.value == "" || !regex_email.test(dom.email.value)) {
    isValid = false;
    showerror(dom.email, dom.email_erroe, "plese enter valid email");
  } else {
    removeError(dom.email, dom.email_erroe);
  }
  if (
    dom.phone_number.value === "" ||
    !regex_phone_num.test(dom.phone_number.value)
  ) {
    showerror(
      dom.phone_number,
      dom.phoneNumber_erroe,
      "please enter valid egyption phone number"
    );
    isValid = false;
  } else {
    // isValid = true;
    removeError(dom.phone_number, dom.phoneNumber_erroe);
  }
  return isValid;
}
