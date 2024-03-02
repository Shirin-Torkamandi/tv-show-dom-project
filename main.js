// async function searchShows(searchName) {
//   try {
//     const response = await axios.get(
//       `https://api.tvmaze.com/search/shows?q=${searchName}`
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// let searchName = "Game of Thrones";
// searchShows(searchName);

const sectionInMain = document.querySelector("#section-in-Main");
const ids = [
  [82, 3747, 17861, 37700],
  [335, 527, 768, 5],
  [45958, 179, 379, 4729],
];

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
    // Handle errors gracefully, e.g., display a placeholder image.
    return null;
  }
}

async function populateRow(row) {
  const div = document.createElement("div");
  div.classList.add("row", "p-0", "row-with-background");

  const elementsToAppend = [];
  for (const element of row) {
    const showData = await showMainInformation(element);
    if (!showData) continue; // Skip if error occurred

    const div1 = document.createElement("div");
    div1.classList.add("col", "me-2", "mb-2", "p-0", "div-1-in-main");
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
    elementsToAppend.push(div1);
  }

  div.append(...elementsToAppend);
  sectionInMain.append(div);
}

ids.forEach(async (row) => {
  await populateRow(row);
});