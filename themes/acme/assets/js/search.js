import * as params from '@params';
import Fuse from './fuse';

const search = document.getElementById('search');
const input = document.getElementById('search_input');
const result = document.getElementById('search_result');
let index = null;

export default {
  async init() {
    console.log(params);    
    try {
      const response = await fetch(params.baseURL + 'index.json'); // needed by GitHub Pages
      if (!response.ok) {
        search.remove();
        return;
      }
      let data = await response.json(); // content cover date tags[] title url
      // fuzzy search indexation      
      index = new Fuse(data, {
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
  console.log(results);
      result.innerHTML = results
        .slice(0, params.maxSearch)
        .map(x => `
          <a href="${x.item.url}">
          <img src="${x.item.cover || params.relURL + 'image/blank.gif'}" width=40 height=40>
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