const urlParams = new URLSearchParams(window.location.search);
const episodeId = urlParams.get("id");

const ul = document.querySelector(".dropdown-menu-dark");
const sectionInMain = document.querySelector("#section-in-Main");
const div = document.createElement("div");
div.classList.add("row", "p-0", "row-with-background");

async function getEpisodes() {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${episodeId}/episodes`
    );
    const data = response.data;
    if (!data || data.length === 0) {
      console.log("No episodes found.");
      return;
    }
    ul.innerHTML = "";
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("dropdown-item");
    a.setAttribute("href", `#`);
    a.innerText = "All Episodes";
    a.addEventListener("click", () => {
      window.location.href = `./Episodes.html?id=${episodeId}`;
    })
    li.append(a);
    ul.append(li);

    data.forEach((episode) => {
      const season = String(episode.season).padStart(2, "0");
      const number = String(episode.number).padStart(2, "0");
      const formattedName = `S${season}-E${number} ${episode.name}`;

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.classList.add("dropdown-item");
      a.setAttribute("href", `#`);
      a.innerText = formattedName;
      li.append(a);
      ul.append(li);

      // Make that sections at first /start:
      const colContainer = document.createElement("div");
      colContainer.classList.add("col-6", "col-md-3", "mb-3", "p-0");

      const div1 = document.createElement("div");
      div1.classList.add("div-1-in-main");

      const img = document.createElement("img");
      img.src = episode.image?.medium || "placeholder.jpg"; // Use placeholder if no image

      const div2 = document.createElement("div");
      div2.classList.add("div-2-in-main");

      // Information popup on mouseover
      const divInfo = document.createElement("div");
      divInfo.classList.add("info");
      div2.addEventListener("mouseover", () => {
        divInfo.innerHTML = episode.summary;
        div2.append(divInfo);
      });
      div2.addEventListener("mouseout", () => {
        divInfo.remove();
      });
      const h6 = document.createElement("h6");
      h6.innerText = formattedName;
      const aLink = document.createElement("a");
      aLink.href = episode.url;
      const imgIcon = document.createElement("img");
      imgIcon.src = "./img/play (1).png";
      aLink.addEventListener("mouseover", () => {
        imgIcon.src = "./img/play (2).png";
      })
      aLink.addEventListener("mouseout", () => {
        imgIcon.src = "./img/play (1).png";
      })

      aLink.append(imgIcon);
      div2.append(h6, aLink);

      div1.append(img, div2);
      colContainer.append(div1);
      div.append(colContainer);
      sectionInMain.append(div);
      // Make that sections at first /end.

      const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (event) {
        const searchTerm = event.target.textContent.toLowerCase();
        const episodeSections = document.querySelectorAll(".div-2-in-main");

        episodeSections.forEach((section) => {
          const episodeTitle = section.querySelector("h6").textContent.toLowerCase();
          const isMatch = episodeTitle.includes(searchTerm);
          section.parentElement.style.display = isMatch ? "block" : "none";
        });
      });
    });
    });
  } catch (error) {
    console.error("Error fetching show information:", error);
    return null;
  }
}
getEpisodes();
