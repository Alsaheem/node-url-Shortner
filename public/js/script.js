console.log(`fetching.....`);

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

console.log(`Done.....`);

const shortnerForm = document.querySelector(`form`);
const search = document.querySelector(`input`);
let alert = document.getElementById(`alert`);
let message = document.getElementById(`message`);
let button = document.getElementById(`search`);
let loader = document.getElementById(`loader`);

shortnerForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  button.disabled = true;
  loader.style.display = `block`;
  const url = search.value;
  console.log(url);
  fetch(`/generate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  }).then((response) =>
    response.json().then((data) => {
      if (data.errors) {
        console.log(data.message);
        alert.classList.add("alert-danger");
        alert.style.display = `block`;
        message.innerHTML = data.message;
        button.disabled = false;
        loader.style.display = `none`;
        setTimeout(() => {
          alert.style.display = `none`;
        }, 3000);
      } else {
        console.log(data);
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
        alert.style.display = `block`;
        message.innerHTML = `copy your link to the clipboard ${data.shortened_link}`;
        button.disabled = false;
        loader.style.display = `none`;
        setTimeout(() => {
          alert.style.display = `none`;
        }, 20000);
      }

    })
  );
});
