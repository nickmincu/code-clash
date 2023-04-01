// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Programming Language Comparison</h1>`;

document
  .getElementById('javascript')
  .addEventListener('click', () => showLanguage('javascript'));
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
  fetchData().then((data) => {
    content.innerHTML = `
          <label for="snippet1">Snippet 1:</label>
          <select id="snippet1">
              ${Object.keys(data)
                .map(
                  (lang) =>
                    `<optgroup label="${data[lang].name}">${data[lang].snippets
                      .map(
                        (snippet, index) =>
                          `<option value="${lang}-${index}">${data[lang].name} - ${snippet.title}</option>`
                      )
                      .join('')}</optgroup>`
                )
                .join('')}
          </select>
          <label for="snippet2">Snippet 2:</label>
          <select id="snippet2">
              ${Object.keys(data)
                .map(
                  (lang) =>
                    `<optgroup label="${data[lang].name}">${data[lang].snippets
                      .map(
                        (snippet, index) =>
                          `<option value="${lang}-${index}">${data[lang].name} - ${snippet.title}</option>`
                      )
                      .join('')}</optgroup>`
                )
                .join('')}
          </select>
          <button id="compareBtn">Compare</button>
          <div id="comparisonResult"></div>
      `;

    document
      .getElementById('compareBtn')
      .addEventListener('click', function () {
        const [lang1, snippetIndex1] = document
          .getElementById('snippet1')
          .value.split('-');
        const [lang2, snippetIndex2] = document
          .getElementById('snippet2')
          .value.split('-');

        if (lang1 === lang2 && snippetIndex1 === snippetIndex2) {
          document.getElementById('comparisonResult').innerHTML =
            '<p>Please choose two different snippets.</p>';
        } else {
          document.getElementById('comparisonResult').innerHTML = `
                  ... (rest of the comparison table)

                  <h3>Code Snippet Comparison</h3>
                  <h4>${data[lang1].name} - ${data[lang1].snippets[snippetIndex1].title}</h4>
                  <pre>${data[lang1].snippets[snippetIndex1].code}</pre>
                  <h4>${data[lang2].name} - ${data[lang2].snippets[snippetIndex2].title}</h4>
                  <pre>${data[lang2].snippets[snippetIndex2].code}</pre>
              `;
        }
      });
  });
}

function fetchData() {
  console.log('fetch data');
  return fetch(
    'https://raw.githubusercontent.com/nickmincu/code-clash/main/data.json'
  )
    .then((response) => response.json())
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
