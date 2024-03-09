const sectionInMain = document.querySelector("#section-in-Main");
const ids = [82, 3747, 17861, 37700, 335, 527, 768, 5, 45958, 179, 379, 4729];

const cache = {};

async function showMainInformation(id) {
  if (cache[id]) {
    return cache[id];
  }

  try {
    const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
    const data = response.data;
    cache[id] = data;
    return data;
  } catch (error) {
    console.error("Error fetching show information:", error);
    return null;
  }
}

const div = document.createElement("div");
div.classList.add("row", "p-0", "row-with-background");
async function populateRow(element) {
  const showData = await showMainInformation(element);

  const colContainer = document.createElement("div");
  colContainer.classList.add("col-6", "col-md-3", "mb-2", "p-0");
  const div1 = document.createElement("div");
  div1.classList.add("div-1-in-main");

  div1.addEventListener("click", () => {
    window.location.href = "./Episodes.html?id=" + showData.id;
  });

  const img = document.createElement("img");
  img.src = showData.image?.medium || "placeholder.jpg"; // Use placeholder if no image

  const div2 = document.createElement("div");
  div2.classList.add("div-2-in-main");
  const h6 = document.createElement("h6");
  h6.innerText = showData.name;
  const p = document.createElement("p");
  p.classList.add("genres");
  p.innerText = showData.genres?.join(" | ") || "No genres";
  const p2 = document.createElement("p");
  p2.classList.add("average");
  p2.innerText = showData.rating?.average || "No rating";
  div2.append(h6, p, p2);
  div1.append(img, div2);
  colContainer.append(div1);
  div.append(colContainer);
  sectionInMain.append(div);
}

ids.forEach(async (row) => {
  await populateRow(row);
});

const searchInput = document.querySelector('.wrapper input[type="search"]');

searchInput.addEventListener("keyup", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const visibleMovies = document.querySelectorAll(".div-1-in-main");

  visibleMovies.forEach((movieDiv) => {
    const movieTitle = movieDiv
      .querySelector(".div-2-in-main h6")
      .innerText.toLowerCase();
    const isPrefixMatch = movieTitle.includes(searchTerm);

    movieDiv.parentElement.style.display = isPrefixMatch ? "block" : "none";
  });
});
