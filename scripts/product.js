let params = new URL(document.location).searchParams;
let id = params.get("id");

const productCardImg = document.querySelector(".img");
const productCardName = document.querySelector(".product-card__infos__title");
const productCardDescription = document.querySelector(
  ".product-card__infos__description"
);
const productCardPrice = document.querySelector(".product-card__infos__price");
const camNumber = document.querySelector("#CameraNum");
const colorSelect = document.querySelector("#color-select");


main();

function main() {
  /*checkIf404();*/
  getArticles();
  addToCart();
}


/*function checkIf404() {
  window.addEventListener("error", (e) => {
      let container = document.querySelector(".container");
      container.innerHTML = `<p>Cette page n'existe pas. <a class="back-to-home" href="index.html">Retourner dans la boutique ?</a></p>`;
      container.style.padding = "26vh 0";
      container.style.fontSize = "26px";
      let backToHomeLink = document.querySelector(".back-to-home");
      backToHomeLink.style.textDecoration = "underline";
    },
    true
  );
}
*/

function getArticles() {

  fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      let container = document.querySelector(".container");
      container.innerHTML =
        "Nous n'avons pas réussi à afficher nos appareils. Avez-vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
      container.style.textAlign = "center";
      container.style.padding = "45vh 0";
    })
    .then(function (resultatAPI) {

      article = resultatAPI;
      productCardName.innerHTML = article.name;
      productCardImg.src = article.imageUrl;
      productCardDescription.innerText = article.description;
      console.log(article)
     
      article.price = article.price / 100;
      productCardPrice.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(article.price);

      let colorSelect = document.getElementById("color-select");
      for (let i = 0; i < article.lenses.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.lenses[i];
        colorSelect.appendChild(option);
      }
    });
}

function addToCart() {
  const addToCartBtn = document.querySelector(".add-to-cart");
  const confirmation = document.querySelector(".added-to-cart-confirmation");
  const textConfirmation = document.querySelector(".confirmation-text");
  
  addToCartBtn.addEventListener("click", () => {
    if (camNumber.value > 0 && camNumber.value < 100) {
     
      let productAdded = {
        name: productCardName.innerHTML,
        price: parseFloat(article.price),
        quantity: parseFloat(document.querySelector("#CameraNum").value),
        _id: id,
      };

      
      let arrayProductsInCart = [];
      

      if (localStorage.getItem("products") !== null) {
        arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
        
        
 
      } 
        arrayProductsInCart.push(productAdded);
        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      
      

      confirmation.style.visibility = "visible";
      textConfirmation.innerHTML = `Vous avez ajouté ${camNumber.value} appareils photo à votre panier !`;
      setTimeout("location.reload(true);", 4000);
    } else {
      confirmation.style.visibility = "visible";
      textConfirmation.style.background = "red";
      textConfirmation.style.border = "red";
      textConfirmation.style.color = "white";
      textConfirmation.style.whiteSpace = "normal";
      textConfirmation.innerText = `La quantité doit être comprise entre 1 et 99,.`;
    }
  });
}