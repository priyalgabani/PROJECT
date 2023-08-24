import Navbar from "../components/nav.js";
document.getElementById('navbar').innerHTML=Navbar()

const display =(data) =>{
    data.map((products)=>{
        let img = document.createElement('img');
        img.src=products.image;
        let title = document.createElement('h2');
        title.innerHTML=products.title;
        let price = document.createElement('p');
        price.innerHTML=products.price;
        let category = document.createElement('p');
        category.innerHTML=products.category;
        let rating = document.createElement('span');
        rating.innerHTML=products.rating.rate;
        if(products.rating.rate > 4){
            rating.style.color="green"
        }
        else if((products.rating.rate < 4) && (products.rating.rate >= 3)){
            rating.style.color="yellow"
        }
        else{
            rating.style.color="red"

        }
        let btn = document.createElement("button");
    btn.innerHTML = "BUY NOW";
    btn.addEventListener("click", () => {
      let loggedIn = localStorage.getItem("loggedIn");
      if (loggedIn) {
        fetch(`http://localhost:3000/cart?id=${products.id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              alert("products was sucess cart");
              fetch(`http://localhost:3000/cart/${products.id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ qty: data[0].qty + 1 }),
              });
            } else {
              console.log("product", products);
              fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...products, qty: 1 }),
              });
            }
          });
        } else {
            alert("you have to login first");
            setTimeout(() => {
              window.location.href = "/pages/login.html";
            }, 1000);
          }
        });
        let div = document.createElement('div');
        div.append(img,title,price,category,rating,btn)
        document.getElementById("box2").append(div)
    })
}
let products = [];

document.getElementById("lth").addEventListener("click", () => {
  products.sort((a, b) => a.price - b.price);
  display(products);
});

document.getElementById("htl").addEventListener("click", () => {
  products.sort((a, b) => b.price - a.price);
  display(products);
});

document.getElementById("man").addEventListener("click", () => {
  const temp = products.filter((val) => val.category === "men's clothing");
  display(temp);
});

document.getElementById("woman").addEventListener("click", () => {
  const temp = products.filter((val) => val.category === "women's clothing");
  display(temp);
});

document.getElementById("jewelery").addEventListener("click", () => {
  const temp = products.filter((val) => val.category === "jewelery");
  display(temp);
});


const get =()=>{
    fetch("http://localhost:3000/products")
    .then((response)=>response.json())
    .then((response)=>display(response))
}
get()