const baseUrl = "http://localhost:3000/contacts";

const headers = {
  "Content-Type": "application/json",
};

const contactForm = document.querySelector(".contact-form");
const inputName = document.querySelector(".name");
const inputNumber = document.querySelector(".number");
const inputEmail = document.querySelector(".email");
const list = document.querySelector(".list");
const showContacts = document.querySelector(".btn-show-contacts");

const createUser = async (newContact) => {
  try {
    const response = await axios.post(baseUrl, newContact);
    console.log("response", response.data);
  } catch (error) {
    console.log("error", error);
  }
};

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newContact = {
    name: inputName.value,
    phone: inputNumber.value,
    email: inputEmail.value,
  };

  createUser(newContact);

  inputName.value = "";
  inputNumber.value = "";
  inputEmail.value = "";
});

const getUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log("response", response.data);

    list.innerHTML = "";

    response.data.forEach((element) => {
      const li = document.createElement("li");
      li.classList.add("list-item");
      li.innerHTML = ` 
      <div>
      <h3 class="list-item__name">${element.name}</h3>
      <p class="list-item__phone">${element.phone}</p>
      <p class="list-item__email">${element.email}</p>
      </div>
      <button class="btn-delete">Удалить</button>
      `;

      list.appendChild(li);
    });
  } catch (error) {}
};

showContacts.addEventListener("click", () => {
  getUsers();
});
