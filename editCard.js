const id = document.getElementById("id");
const albumId = document.getElementById("newAlbumId");
const title = document.getElementById("newTitle");
const url = document.getElementById("newUrl");
const params = new URLSearchParams(window.location.search);
const cardId = params.get("id");

let cardsArr = JSON.parse(localStorage.getItem("cardsData"));
let cardIndex = cardsArr.findIndex((card) => card.id === parseInt(cardId));

//pass card value to input fields
id.value = cardsArr[cardIndex].id;
albumId.value = cardsArr[cardIndex].albumId;
title.value = cardsArr[cardIndex].title;
url.value = cardsArr[cardIndex].url;

function editCard() {
  let updatedAlbumId = parseInt(albumId.value);
  let updatedTitle = title.value;
  let updatedUrl = url.value;

  // send PUT request to update the data
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `https://jsonplaceholder.typicode.com/photos/${cardId}`);
  xhr.setRequestHeader("Content-type", "application/json");

  let updatedCardData = {
    albumId: updatedAlbumId,
    title: updatedTitle,
    url: updatedUrl,
  };

  xhr.send(JSON.stringify(updatedCardData));

  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // update local storage with the new data
      cardsArr[cardIndex]["albumId"] = updatedAlbumId;
      cardsArr[cardIndex]["title"] = updatedTitle;
      cardsArr[cardIndex]["url"] = updatedUrl;
      localStorage.setItem("cardsData", JSON.stringify(cardsArr));
      window.location.href = "./index.html";
    } else {
      console.log("Error");
    }
  };
}

function cancelEdit() {
  window.history.back();
}
