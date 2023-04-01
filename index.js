// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Programming Language Comparison</h1>`;

document
  .getElementById('dotnet')
  .addEventListener('click', () => showLanguage('dotnet'));
document
  .getElementById('java')
  .addEventListener('click', () => showLanguage('java'));
document
  .getElementById('python')
  .addEventListener('click', () => showLanguage('python'));
document.getElementById('compare').addEventListener('click', showComparison);

function showComparison() {
  console.log("show comparison")
  fetchData().then((data) => {
    content.innerHTML = `
          <h2>Compare Languages</h2>
          <label for="language1">Language 1:</label>
          <select id="language1">
              ${Object.keys(data)
                .map(
                  (lang) =>
                    `<option value="${lang}">${data[lang].name}</option>`
                )
                .join('')}
          </select>
          <label for="language2">Language 2:</label>
          <select id="language2">
              ${Object.keys(data)
                .map(
                  (lang) =>
                    `<option value="${lang}">${data[lang].name}</option>`
                )
                .join('')}
          </select>
          <button id="compareBtn">Compare</button>
          <div id="comparisonResult"></div>
      `;

    document
      .getElementById('compareBtn')
      .addEventListener('click', function () {
        const lang1 = document.getElementById('language1').value;
        const lang2 = document.getElementById('language2').value;

        if (lang1 === lang2) {
          document.getElementById('comparisonResult').innerHTML =
            '<p>Please choose two different languages.</p>';
        } else {
          document.getElementById('comparisonResult').innerHTML = `
                  <h3>${data[lang1].name} vs ${data[lang2].name}</h3>
                  <table>
                      <tr>
                          <th>Attribute</th>
                          <th>${data[lang1].name}</th>
                          <th>${data[lang2].name}</th>
                      </tr>
                      <tr>
                          <td>Performance</td>
                          <td>${data[lang1].performance}</td>
                          <td>${data[lang2].performance}</td>
                      </tr>
                      <tr>
                          <td>Ease of Use</td>
                          <td>${data[lang1].ease_of_use}</td>
                          <td>${data[lang2].ease_of_use}</td>
                      </tr>
                      <tr>
                          <td>Popularity</td>
                          <td>${data[lang1].popularity}</td>
                          <td>${data[lang2].popularity}</td>
                      </tr>
                      <tr>
                          <td>Community Support</td>
                          <td>${data[lang1].community_support}</td>
                          <td>${data[lang2].community_support}</td>
                      </tr>
                  </table>
              `;
        }
      });
  });
}

function fetchData() {
  console.log('fetch data');
  return fetch('data.json')
    .then(
      (response) => response.json()
    )
    .catch((error) => console.error('Error fetching data:', error));
}

function showLanguage(language) {
  console.log('show language: ' + language);
  fetchData().then((data) => {
    console.log(data);
    const langData = data[language];
    content.innerHTML = `
          <h2>${langData.name}</h2>
          <p>${langData.description}</p>
          <label for="snippet">Choose a code snippet:</label>
          <select id="snippet">
              ${langData.snippets
                .map(
                  (snippet, index) =>
                    `<option value="${index}">${snippet.title}</option>`
                )
                .join('')}
          </select>
          <pre id="snippetCode">${langData.snippets[0].code}</pre>`;

    document
      .getElementById('snippet')
      .addEventListener('change', function (event) {
        const snippetIndex = event.target.value;
        document.getElementById('snippetCode').innerText =
          langData.snippets[snippetIndex].code;
      });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const content = document.getElementById('content');
});
