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

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newContact = {
    name: inputName.value,
    phone: inputNumber.value,
    email: inputEmail.value,
  };

  await createUser(newContact);

  inputName.value = "";
  inputNumber.value = "";
  inputEmail.value = "";

  getUsers(); 
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
        <button class="btn-delete" data-id="${element.id}">Удалить</button>
      `;

      list.appendChild(li);
    });

    document.querySelectorAll(".btn-delete").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const id = e.target.getAttribute("data-id");
        await deleteUser(id);
        getUsers(); //
      });
    });
  } catch (error) {
    console.error("error", error);
  }
};

showContacts.addEventListener("click", () => {
  getUsers();
});

const deleteUser = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    console.log(`Контакт удалён`);
  } catch (error) {
    console.error("error", error);
  }
};
