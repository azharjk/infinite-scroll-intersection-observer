const LIMIT_IMAGE = 2;

const loadingText = document.getElementById('loading-text');
const productsContainer = document.getElementById('products-container');
let lastEntry = null;

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target.querySelector('img');
      img.src = img.dataset.src;
      imageObserver.unobserve(entry.target);
    }
  });

  if (!lastEntry) {
    lastEntry = entries[entries.length - 1];
  } else {
    if (lastEntry.target.isEqualNode(entries[0].target)) {
      fetchAndRender();
    }
  }
});

const fetchAndRender = async () => {
  const res = await fetch(`https://fakestoreapi.com/products?limit=${LIMIT_IMAGE}`);
  const data = await res.json();

  loadingText.classList.add('hidden');

  data.forEach((data) => {
    const product = document.createElement('div');
    product.innerHTML = `
      <img data-src="${data.image}" src="placeholder.png" />
      <h3>${data.title}</h3>
      <p>${data.description}</p>
    `;

    imageObserver.observe(product);
    productsContainer.appendChild(product);
  });
}

fetchAndRender();