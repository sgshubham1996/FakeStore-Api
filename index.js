function LoadProducts(url){
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for(var item of data)
        {
            var div1 = document.createElement("div");
            div1.className="style1";
            div1.innerHTML=`
            <img src=${item.image} class="cardimage" >
            <div class="cardheader" >
              <p>${item.title}</p>
            </div>
            <div class="cardbody" >
               <dl>
                 <dt>Price</dt>
                 <dd>${item.price}</dd>
                 <dt>Rating</dt>
                 <dd>
                 <span class="span1" ><i class="fa-sharp fa-solid fa-star"></i>
                 <i class="fa-sharp fa-solid fa-star"></i>
                 <i class="fa-sharp fa-solid fa-star"></i>
                 <i class="fa-sharp fa-solid fa-star"></i></span>
                    ${item.rating.rate}
                    [${item.rating.count}]
                 </dd>
               </dl>
            </div>
            <div class="cardfooter" >
            
              <button class="cardbutton" onclick="AddToCartClick(${item.id})" ><span><i class="fa-sharp fa-solid fa-cart-shopping"></i></span>&nbsp;&nbsp;Add to Cart</button>
            </div>
            `;
            document.getElementById("catalog").appendChild(div1);
        }
    })
}

function Loadcategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        data.unshift("all")
    for(var item of data){
        var option = document.createElement("option");
        option.text=item.toUpperCase();
        option.value=item;
        document.getElementById("1stCategories").appendChild(option);
      }
    })
}



function bodyload(){
    LoadProducts("https://fakestoreapi.com/products");
    Loadcategories();
    GetCartItemsCount();
    
}

function CategoryChange(){
    var categoryname = document.getElementById("lstCategories").value;
    if(categoryname=="all") {
        LoadProducts("http://fakestoreapi.com/products");
    } else {
        LoadProducts(`http://fakestoreapi.com/products/category/${categoryname}`);
    }
}

var CartItems = [];
function GetCartItemsCount(){
  document.getElementById("lblCount").innerHTML=CartItems.length;
}

function AddToCartClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        CartItems.push(data);
        GetCartItemsCount();
        alert(`${data.title} \n Added to Cart `);
    })
}

function showCart(){
    document.getElementById("cart").style.display="block";
    document.querySelector("tbody").innerHTML = "";
    for(var item of CartItems)
    {
        var tr= document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPhoto = document.createElement("td");
        var tdRemove = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;

        var img = document.createElement("img");
        img.width="50";
        img.height="50";
        img.src= item.image;

        tdPhoto.appendChild(img);

        tdRemove.innerHTML = `
          <button>
            <span style="background-color: red;></span>  
          </button>
        `;

        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPhoto);
        tr.appendChild(tdRemove);

        document.querySelector("tbody").appendChild(tr);
    }
}

function closecart(){
    document.getElementById("cart").style.display="none";
}

