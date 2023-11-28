document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".search-box");
  const input = form.querySelector("input[type='search']");
  const resultsContainer = document.querySelector(".results");
  const resultscounter = document.querySelector("header p");

  const searchWikipedia = (searchTerm) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=
    url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(
      searchTerm
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispalyResults(data.query.search);
      })
      .catch((err) => alert("error " + err));
  };

  const dispalyResults = (results) => {
    resultsContainer.innerHTML = "";
    resultscounter.textContent = `Results Counter : ${results.length}`;
    results.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.className = "result";
      resultElement.innerHTML = `
            <h3>${result.title}</h3>
            <P>${result.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target = "_blank">Read More</a>
        `;
      resultsContainer.appendChild(resultElement);
    });
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = input.value;
    if (searchTerm) {
      searchWikipedia(searchTerm);
    }
  });
});
