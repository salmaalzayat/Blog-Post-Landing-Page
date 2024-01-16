const cardContainer = document.getElementById("cards");
let photos = getPhotos();

function renderCards() {
  cardContainer.innerHTML = "";

  for (let i = 0; i < photos.length; i++) {
    let card = `
                  <div class="card border-0 ">
                    <img class='card-img-top py-2' src='${photos[i].url}'>
                    <h5>Album ID: ${photos[i].albumId}</h5>
                    <h5>ID: ${photos[i].id}</h5>
                    <h5 class='h-25 py-2'>Title: ${photos[i].title}</h5>
                    <form onsubmit='event.preventDefault()'>
                      <button class='btn btn-light px-4 py-2 fw-semibold' onclick='updateCard(${photos[i].id})'>Edit</button>
                      <button class='btn btn-light px-4 py-2 fw-semibold' onclick='deleteCard(${photos[i].id})'>Delete</button>
                    </form>
                  </div> `;

    cardContainer.innerHTML += card;
  }
}

function getPhotos() {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=42",
    false
  );
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send();

  if (xhr.status === 200) {
    console.log("Request has been successful");
    const photos = JSON.parse(xhr.responseText);
    saveToLocalstorage(photos);
    return photos;
  } else {
    console.log("Error happened");
    throw new Error("Request failed");
  }
}

function saveToLocalstorage(photos) {
  try {
    const photosJSON = JSON.stringify(photos);
    localStorage.setItem("cardsData", photosJSON);
    console.log("Photos data saved to local storage");
  } catch (error) {
    console.error("Error while saving data to local storage:", error);
  }
}

function updateCard(id) {
  console.log("Edit button clicked");
  window.location.href = `editCard.html?id=${id}`;
}

function deleteCard(id) {
  if (confirm("Are you sure you want to delete this card?")) {
    const index = photos.findIndex((photo) => photo.id === id);
    photos.splice(index, 1);
    renderCards();
    saveToLocalstorage(photos);
  }
}

renderCards();
