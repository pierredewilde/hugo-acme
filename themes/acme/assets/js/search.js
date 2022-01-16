import * as params from '@params';
import Fuse from './fuse@6.5.3.esm.min';
import SearchSupport from './searchSupport'

const search = document.getElementById('search');
const input = document.getElementById('search_input');
const result = document.getElementById('search_result');
let index = null;


export default {
  async init() {
// console.log(params);
    try {
      const response = await fetch(params.baseURL + '/index.json'); // baseURL needed by GitHub Pages
      if (!response.ok) {
        search.remove();
        return;
      }
      let data = await response.json(); // content cover date tags[] title url
      index = new Fuse(data, { // create fuse index
        keys: [{
          name: 'title',
          weight: 20
        }, {
          name: 'tags',
          weight: 5
        }, {
          name: 'content',
          weight: 1
        }]
      });
      SearchSupport();
    } catch(e) {
      search.remove();
    }
    input.addEventListener('input', this.showResults);
  },

  showResults(event) {
    if (event.target !== input) return;
    result.style.display = 'block';
    if (input.value.length > 0) {
      const results = index.search(input.value);
// console.log(results);
      result.innerHTML = results
        .slice(0, params.maxSearch)
        .map(x => `
          <a href="${x.item.url}">
          <img src="${x.item.cover || params.baseURL + '/image/blank.gif'}" width=40 height=40>
          <h3>${x.item.title}</h3>
            <span>${x.item.content.substr(0,40)}...</span>
          </a>
        `)
        .join("");
    } else {
      result.innerHTML = '';
    }
  }
}