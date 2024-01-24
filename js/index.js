const baseUrl = 'https://dog.ceo/api/';
const imgsRandom = baseUrl + 'breeds/image/random';
const breedsList = baseUrl + 'breeds/list/all'; 

const doc = document;
const btnText = 'Random dog';
const getDataBtn = doc.querySelector('.get-data');
const qtyImgsEl = doc.querySelector('.qty-imgs');
const isBreedsSelectEl = doc.querySelector('.select-beeds-block input');
let isBreedsSelect = false;
const breedsSelectEl = doc.querySelector('.select-breeds');

const imgBlockEl = doc.querySelector('.img-block');

fetch(breedsList)
  .then(res => res.json())
  .then(data => {
    const breedOptions = Object.keys(data.message).map(breed => `<option value="${breed}">${breed}</option>`).join('');
    breedsSelectEl.innerHTML = breedOptions;
  });

showBreedsSelect();

isBreedsSelectEl.onchange = (e) => {
  isBreedsSelect = e.target.checked;
  showBreedsSelect();
}

getDataBtn.onclick = () => {
  const value = qtyImgsEl.value;
  const qty = Number.isInteger(+value) && value > 0 ? +value : 1;

  let apiUrl = isBreedsSelect ? `${baseUrl}breed/${breedsSelectEl.value}/images/random/${qty}` : `${imgsRandom}/${qty}`;

  fetch(apiUrl )
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      const imgData = data.message;
      if (qty > 1) {
        renderImgs(imgData);
      } else {
        renderImg(imgData)
      }
      qtyImgsEl.value = '1';
    });
}

function showBreedsSelect() {
  breedsSelectEl.style.display = isBreedsSelect ? '' : 'none';
  getDataBtn.innerHTML = !isBreedsSelect ? btnText : btnText + ' (of breeds)';
}

function renderImg(src) {
  const imgItem = 
  `<div class="img-block__item">
    <img src="${ src }" alt="">
  </div>`;

  imgBlockEl.innerHTML = '';
  imgBlockEl.insertAdjacentHTML('afterbegin', imgItem);
}

function renderImgs(imgsArr) {
  let imgItems = '';
  for (let src of imgsArr) {
    console.log(src);
    imgItems += 
    `<div class="img-block__item">
      <img src="${ src }" alt="">
    </div>`;
  }

  imgBlockEl.innerHTML = '';
  imgBlockEl.insertAdjacentHTML('afterbegin', imgItems);
}