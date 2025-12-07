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
  favourit_box: document.querySelector(".favourit_box"),
  total_count_num: document.querySelector(".total_count_num"),
  emegency_text: document.querySelector(".emegency_text"),
  Update_btn: document.querySelector(".Update_btn"),
  add_btn_model: document.querySelector(".add_btn_model"),
};
let my_model = new bootstrap.Modal(dom.modal);
let contacts_list = [];

if (localStorage.getItem("data") == null) {
  localStorage.setItem("data", JSON.stringify(contacts_list));
} else {
  contacts_list = JSON.parse(localStorage.getItem("data"));
  display();
}

function add() {
  if (!validate() || !checkduplicate()) {
    return;
  } else {
    let contacts = {
      full_name: dom.full_name.value,
      phone_number: dom.phone_number.value,
      email: dom.email.value,
      address: dom.address.value,
      group_type: dom.group_type.value,
      notes: dom.notes.value,
      check_favour: dom.check_favour.checked,
      emergency_check: dom.emergency_check.checked,
    };
    contacts_list.push(contacts);

    localStorage.setItem("data", JSON.stringify(contacts_list));
    Swal.fire({
      title: "added sucssesfully",
      text: "done",
      icon: "success",
    });
    my_model.hide();
    dom.form.reset();
    dom.Update_btn.classList.remove("d-block");
    dom.Update_btn.classList.add("d-none");
    dom.add_btn.classList.remove("d-none");
    dom.add_btn.classList.add("d-block");
    display();
  }
}
dom.add_btn_model.onclick = () => {
  dom.Update_btn.classList.remove("d-block");
  dom.Update_btn.classList.add("d-none");
  dom.add_btn.classList.remove("d-none");
  dom.add_btn.classList.add("d-block");
  dom.form.reset();
};

function display() {
  dom.total_count_num.innerHTML = contacts_list.length;

  dom.total_counter.innerHTML = contacts_list.length;
  var cartona = "";

  for (let i = 0; i < contacts_list.length; i++) {
    cartona += `<div class="col-12 display_box  col-lg-6 ">
                <div class="shadow  box rounded-2 w-100 h-100 p-3">
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
                    <div class="box_body_top d-flex align-items-center gap-2 ">
                      <div class="box_body_top_icon p-2 text-center rounded-2">
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                      <p class="m-0 " style="font-size: 0.8rem">${
                        contacts_list[i].email
                      }</p>
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
                      <i class="${
                        contacts_list[i].check_favour
                          ? "fa-solid"
                          : "fa-regular"
                      } fa-star"  onclick="toggelfavouritcheck(${i})"></i>
                      <i class="${
                        contacts_list[i].emergency_check
                          ? "fa-solid"
                          : "fa-regular"
                      } fa-heart" onclick="toogelemergencycheck(${i})"></i>
                      <i onclick="setUpToUpdate(${i})" class="fa-solid fa-pen"></i>
                      <i onclick="deleteElement(${i})" class="fa-solid fa-basket-shopping"></i>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  dom.boxs.innerHTML = cartona;
  favouritcount();
  favouritetext();
  countEmergency();
  emergencyDisplay();

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
  if (dom.full_name.value.trim() == "") {
    isValid = false;
    showerror(dom.full_name, dom.fullName_erroe, "please enter your fullname");
  } else if (!regex_fullName.test(dom.full_name.value)) {
    showerror(dom.full_name, dom.fullName_erroe, "enter only letter");
    isValid = false;
  } else {
    removeError(dom.full_name, dom.fullName_erroe);
  }
  if (dom.email.value.trim() == "" || !regex_email.test(dom.email.value)) {
    isValid = false;
    showerror(dom.email, dom.email_erroe, "plese enter valid email");
  } else {
    removeError(dom.email, dom.email_erroe);
  }
  if (
    dom.phone_number.value.trim() === "" ||
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
  if (!isValid) {
    return false;
  }

  return isValid;
}
function checkduplicate() {
  for (let i = 0; i < contacts_list.length; i++) {
    if (
      contacts_list[i].full_name.trim().toUpperCase() ===
      dom.full_name.value.trim().toUpperCase()
    ) {
      showerror(
        dom.full_name,
        dom.fullName_erroe,
        "you enterd this name before"
      );
      return false;
    }
    if (
      contacts_list[i].phone_number.trim() === dom.phone_number.value.trim()
    ) {
      showerror(
        dom.phone_number,
        dom.phoneNumber_erroe,
        "this phone numper already exist"
      );
      return false;
    }
    if (
      contacts_list[i].email.trim().toUpperCase() ===
      dom.email.value.trim().toUpperCase()
    ) {
      showerror(dom.email, dom.email_erroe, "this email already exist");
      return false;
    }
  }
  return true;
}
function toggelfavouritcheck(index) {
  contacts_list[index].check_favour = !contacts_list[index].check_favour;
  localStorage.setItem("data", JSON.stringify(contacts_list));
  display();
}
function favouritcount() {
  let currentFavour = 0;
  for (let i = 0; i < contacts_list.length; i++) {
    if (contacts_list[i].check_favour === true) {
      currentFavour++;
    }
  }

  dom.Favorites_counter.innerHTML = currentFavour;
}
function favouritetext() {
  let box_favourite = "";

  for (let i = 0; i < contacts_list.length; i++) {
    if (contacts_list[i].check_favour === true) {
      box_favourite += ` <div class="col-12">

  <div class="upper_card d-flex align-items-center  gap-3 p-3 rounded-3 shadow-sm">


    <div class="upper_card_left">
      <p class="m-0 tow_letter rounded-2 p-4 text-white">
        ${getFirsttowletter(contacts_list[i].full_name)}
      </p>
    </div>

    
    <div class="upper_card_left_text d-flex flex-column gap-2 text-center">
      <p class="m-0 name fw-bold">
        ${contacts_list[i].full_name}
      </p>

      <div class="upper_card_left_text_phone d-flex align-items-center justify-content-center gap-2">
        <div class="upper_card_left_text_icon p-2 rounded-2 bg-light">
          <i class="fa-solid fa-phone text-center"></i>
        </div>
        <p class="m-0 text-muted">
          ${contacts_list[i].phone_number}
        </p>
      </div>

    </div>

  </div>
</div>

                    `;
    }
  }
  dom.favourit_box.innerHTML = box_favourite;
}

function toogelemergencycheck(index) {
  contacts_list[index].emergency_check = !contacts_list[index].emergency_check;
  localStorage.setItem("data", JSON.stringify(contacts_list));
  display();
}
function countEmergency() {
  let total_emergency = 0;
  for (let i = 0; i < contacts_list.length; i++) {
    if (contacts_list[i].emergency_check === true) {
      total_emergency++;
    }
  }
  dom.Emergency_counter.innerHTML = total_emergency;
}
function emergencyDisplay() {
  let emergency_box = "";
  for (let i = 0; i < contacts_list.length; i++) {
    if (contacts_list[i].emergency_check === true) {
      emergency_box += `<div class="col-12">

  <div class="upper_card d-flex align-items-center  gap-3 p-3 rounded-3 shadow-sm">


    <div class="upper_card_left">
      <p class="m-0 tow_letter rounded-2 p-4 text-white">
        ${getFirsttowletter(contacts_list[i].full_name)}
      </p>
    </div>

    
    <div class="upper_card_left_text d-flex flex-column gap-2 text-center">
      <p class="m-0 name fw-bold">
        ${contacts_list[i].full_name}
      </p>

      <div class="upper_card_left_text_phone d-flex align-items-center justify-content-center gap-2">
        <div class="upper_card_left_text_icon p-2 rounded-2 bg-light">
          <i class="fa-solid fa-phone text-center"></i>
        </div>
        <p class="m-0 text-muted">
          ${contacts_list[i].phone_number}
        </p>
      </div>

    </div>

  </div>
</div>`;
    }
  }
  dom.emegency_text.innerHTML = emergency_box;
}
function deleteElement(index) {
  Swal.fire({
    title: "Do you want to delete this box?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      contacts_list.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(contacts_list));
      display();
    } else if (result.isDenied) {
      return;
    }
  });
}
let currenIndex;
function setUpToUpdate(index) {
  my_model.show();
  dom.full_name.value = contacts_list[index].full_name;
  dom.email.value = contacts_list[index].email;
  dom.phone_number.value = contacts_list[index].phone_number;
  dom.address.value = contacts_list[index].address;
  dom.group_type.value = contacts_list[index].group_type;
  dom.notes.value = contacts_list[index].notes;
  dom.check_favour.checked = contacts_list[index].check_favour;
  dom.emergency_check.checked = contacts_list[index].emergency_check;
  currenIndex = index;
  dom.add_btn.classList.add("d-none");
  dom.Update_btn.classList.remove("d-none");

  dom.Update_btn.classList.add("d-block");
}
dom.Update_btn.onclick = () => {
  if (!validate() || !stoprepeatonupdate()) return;
  else {
    my_model.hide();
    contacts_list[currenIndex].full_name = dom.full_name.value;
    contacts_list[currenIndex].email = dom.email.value;
    contacts_list[currenIndex].phone_number = dom.phone_number.value;
    contacts_list[currenIndex].address = dom.address.value;
    contacts_list[currenIndex].group_type = dom.group_type.value;
    contacts_list[currenIndex].notes = dom.notes.value;
    contacts_list[currenIndex].check_favour = dom.check_favour.checked;
    contacts_list[currenIndex].emergency_check = dom.emergency_check.checked;

    localStorage.setItem("data", JSON.stringify(contacts_list));
    display();
  }
};
function stoprepeatonupdate() {
  for (let i = 0; i < contacts_list.length; i++) {
    if (i === currenIndex) continue;
    if (
      contacts_list[i].full_name.trim().toUpperCase() ===
      dom.full_name.value.trim().toUpperCase()
    ) {
      showerror(
        dom.full_name,
        dom.fullName_erroe,
        "you enterd this name before"
      );
      return false;
    }
    if (
      contacts_list[i].phone_number.trim() === dom.phone_number.value.trim()
    ) {
      showerror(
        dom.phone_number,
        dom.phoneNumber_erroe,
        "this phone numper already exist"
      );
      return false;
    }
    if (
      contacts_list[i].email.trim().toUpperCase() ===
      dom.email.value.trim().toUpperCase()
    ) {
      showerror(dom.email, dom.email_erroe, "this email already exist");
      return false;
    }
  }
  return true;
}
