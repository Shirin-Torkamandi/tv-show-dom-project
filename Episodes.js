const urlParams = new URLSearchParams(window.location.search);
const episodeId = urlParams.get("id");

const ul = document.querySelector(".dropdown-menu-dark");
async function getEpisodes() {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${episodeId}/episodes`
    );
    const data = response.data;
    data.forEach((episode) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.classList.add("dropdown-item");
      a.setAttribute("href", `#`);
      const season = String(episode.season).padStart(2, "0");
      const number = String(episode.number).padStart(2, "0");
      const formattedName = `S${season}-E${number} ${episode.name}`;
      a.innerText = formattedName;
      li.append(a);
      ul.append(li);
    });
  } catch (error) {
    console.error("Error fetching show information:", error);
    return null;
  }
}
getEpisodes();