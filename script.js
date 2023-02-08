let categoriesdiv = document.querySelector(".product_categories");
let productsDiv = document.querySelector(".products");

window.addEventListener("load", () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      displayCategoriesButtons(products);
      displayProducts(products);
      filterData(products);
    })
    .catch((err) => console.error(err));
});


function displayCategoriesButtons(array) {
  //mygtukas visoms kategorijoms
  categoriesdiv.innerHTML += `<button class="all_categories">All</button>`;

  //setas yra unikalių reikšmių rinkinys
  const categories = new Set();

  //   imame po vieną prekę ir jos kategoriją dedame į setą
  array.forEach((element) => {
    categories.add(element.category);
  });

  //   iš seto darome masyvą, nes priešingu atveju objektas ir kategorijas atvaizduojame mygtukais
  [...categories].forEach((category) => {
    categoriesdiv.innerHTML += `<button class="product_category"> ${category}</button>`;
  });
}


function filterData(array) {
  //kai spaudžiame ant kategorijų mygtukų, rodoma kategorija, kuri užrašyta mygtuke, naudojamas filtras
  let buttons = document.querySelectorAll(".product_category");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      let filtered = array.filter(
        (elem) => elem.category.trim() === button.innerHTML.trim()
      );
      displayProducts(filtered);
    });
  });

  // kai paspaustas, rodo visus produktus
  document.querySelector(".all_categories").addEventListener("click", () => {
    displayProducts(array);
  });
}


//funkcija skirta produktams atvaizduoti, visiems ir atfiltruotiems, priklausomai nuo to, kas paduota
function displayProducts(items) {
  productsDiv.innerHTML = "";

  items.forEach((item) => {
    productsDiv.innerHTML += `<p>${item.title} ${item.category}</p>`;
  });
}

