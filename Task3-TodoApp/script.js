const movieInput = document.getElementById("movie-input");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

const initialFeelGoodFilms = ["Meiyazhagan", "96", "Abhiyum Naanum", "Mozhi"];

function buildMediaCard(titleText, isCompleted) {
    const rowItem = document.createElement("li");

    const titleSpan = document.createElement("span");
    titleSpan.className = "movie-title";
    titleSpan.innerText = titleText;
    rowItem.appendChild(titleSpan);

    const interactivePanel = document.createElement("div");
    interactivePanel.className = "btn-group";

    if (!isCompleted) {
        const watchButton = document.createElement("button");
        watchButton.innerText = "Done";
        watchButton.onclick = function() {
            rowItem.remove();
            buildMediaCard(titleText, true);
        };
        interactivePanel.appendChild(watchButton);

        const modifyButton = document.createElement("button");
        modifyButton.innerText = "Edit";
        modifyButton.onclick = function() {
            const updatedTitle = prompt("Modify title:", titleSpan.innerText);
            if (updatedTitle !== null && updatedTitle.trim() !== "") {
                titleSpan.innerText = updatedTitle.trim();
                titleText = updatedTitle.trim();
            }
        };
        interactivePanel.appendChild(modifyButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Del";
    deleteButton.onclick = function() {
        rowItem.remove();
    };
    interactivePanel.appendChild(deleteButton);

    rowItem.appendChild(interactivePanel);

    if (isCompleted) {
        completedList.appendChild(rowItem);
    } else {
        pendingList.appendChild(rowItem);
    }
}

function addMovie() {
    const freshValue = movieInput.value.trim();
    if (freshValue === "") {
        alert("Enter a film title first!");
        return;
    }
    buildMediaCard(freshValue, false);
    movieInput.value = "";
}

initialFeelGoodFilms.forEach(function(filmName) {
    buildMediaCard(filmName, false);
});