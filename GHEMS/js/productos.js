document.addEventListener("DOMContentLoaded", () => {

  const categoryButtons = document.querySelectorAll(".category-card");
  const productsList = document.getElementById("productsList");
  const activeHeader = document.getElementById("activeCategoryHeader");
  const categoriesBlock = document.querySelector(".products-categories");

  let activeCategory = null;

  /* ===============================
     INFO DE CATEGORÍAS
  =============================== */

  const categoryInfo = {
    tomasmultiples: {
      title: "Tomas múltiples",
      desc: "Soluciones seguras para múltiples conexiones domiciliarias e industriales."
    },
    prolongadores: {
      title: "Prolongadores",
      desc: "Extensiones eléctricas resistentes para uso cotidiano e intensivo."
    },
    adaptadores: {
      title: "Adaptadores",
      desc: "Versatilidad y compatibilidad para todo tipo de enchufes."
    },
    tripydupli: {
      title: "Triples y duplicadoras",
      desc: "Optimización del espacio eléctrico con máxima seguridad."
    },
    guirnaldas: {
      title: "Guirnaldas",
      desc: "Iluminación decorativa para interiores y exteriores."
    },
    lineadomi: {
      title: "Línea domiciliaria",
      desc: "Accesorios eléctricos pensados para el hogar moderno."
    }
  };

  /* ===============================
     PRODUCTOS (EJEMPLO)
  =============================== */

  const productsData = {
    tomasmultiples: [
      {
        name: "Toma múltiple 3 salidas",
        img: "assets/products/tomasmultiples/ejemplo.jpg",
        desc: "Diseño compacto y resistente para uso domiciliario."
      },
      {
        name: "Toma múltiple 5 salidas",
        img: "assets/products/tomasmultiples/ejemplo.jpg",
        desc: "Ideal para múltiples conexiones simultáneas."
      },
      {
        name: "Toma múltiple 7 salidas",
        img: "assets/products/tomasmultiples/ejemplo.jpg",
        desc: "Mayor capacidad manteniendo seguridad eléctrica."
      },
      {
        name: "Toma múltiple 9 salidas",
        img: "assets/products/tomasmultiples/ejemplo.jpg",
        desc: "Pensado para espacios de alta demanda."
      }
    ],

    prolongadores: [
      {
        name: "Prolongador 5 m",
        img: "assets/products/prolongadores/ejemplo.jpg",
        desc: "Cable reforzado para uso intensivo."
      }
    ],

    adaptadores: [
      {
        name: "Adaptador universal",
        img: "assets/products/adaptadores/ejemplo.jpg",
        desc: "Compatibilidad con múltiples formatos."
      }
    ],

    tripydupli: [
      {
        name: "Duplicadora",
        img: "assets/products/tripydupli/duplicadora.jpg",
        desc: "Solución práctica para ampliar tomas sin perder seguridad."
      }
    ],

    guirnaldas: [],
    lineadomi: []
  };

  /* ===============================
     EVENTOS DE CATEGORÍAS
  =============================== */

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      // Si se vuelve a clickear la misma → cerrar suave
      if (activeCategory === category) {
        closeCategory();
        return;
      }

      activeCategory = category;

      // Reset visual de botones
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Ocultar contenido actual (fade out)
      activeHeader.classList.remove("visible");
      productsList.classList.remove("visible");

      setTimeout(() => {
        renderCategory(category);
      }, 250);
    });
  });

  /* ===============================
     RENDER DE CATEGORÍA
  =============================== */

  function renderCategory(category) {
    productsList.innerHTML = "";

    activeHeader.innerHTML = `
      <h2>${categoryInfo[category].title}</h2>
      <p>${categoryInfo[category].desc}</p>
    `;

    activeHeader.classList.add("visible");

    if (!productsData[category] || productsData[category].length === 0) {
      productsList.innerHTML = `
        <div class="products-empty">
          <p>Estamos trabajando para sumar productos a esta categoría.</p>
          <span>Si necesitás información, no dudes en consultarnos.</span>
        </div>
      `;
    } else {
      productsData[category].forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.animationDelay = `${index * 0.12}s`;

        card.innerHTML = `
          <div class="product-img">
            <img src="${product.img}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
          </div>
        `;

        productsList.appendChild(card);
      });
    }

    productsList.classList.add("visible");

    scrollToProducts();
  }

  /* ===============================
     SCROLL CONSISTENTE
  =============================== */

  function scrollToProducts() {
    const offset =
      categoriesBlock.getBoundingClientRect().bottom +
      window.scrollY -
      20;

    setTimeout(() => {
      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
    }, 150);
  }

  /* ===============================
     CIERRE SUAVE
  =============================== */

  function closeCategory() {
    activeCategory = null;

    categoryButtons.forEach(btn => btn.classList.remove("active"));
    activeHeader.classList.remove("visible");
    productsList.classList.remove("visible");

    setTimeout(() => {
      activeHeader.innerHTML = "";
      productsList.innerHTML = "";
    }, 250);
  }

});
