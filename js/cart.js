
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-btn");
const modalImage = document.getElementById("modal-image");
const modalHoverImage = document.getElementById("modal-hoverimage");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const IncreaseCount=document.getElementById("increase-Count")
const DecreaseCount=document.getElementById("decrease-Count")
const ShowNumber=document.getElementById("show-number")
const CartButton=document.getElementById("btn-cart");

// const cartContainer=document.getElementById("cart-container");
window.cartnum=0;
window.quantity=1;
// window.cart=[];
window.cart=JSON.parse(localStorage.getItem('cart'))||[]
window.selectedProduct=null;
window.selectedOption="";
 //for incresecount(+) in overlay layer
        IncreaseCount.addEventListener('click',()=>{
            window.quantity++;
            ShowNumber.innerText=window.quantity;
        })
        //for decrease count(-) in overlay
        DecreaseCount.addEventListener('click',()=>{
            window.quantity--;
            if(window.quantity<0){
                window.quantity=0;
            }
            ShowNumber.innerText=window.quantity;
        })
        //for close button of choose options
    closeBtn.addEventListener('click',()=>{
    overlay.style.display="none";
    })
     //for add to cart button 
        CartButton.addEventListener('click',()=>{
            //check the existing product
            const existingProduct=window.cart.find((item)=>{
               return item.title===window.selectedProduct.title
            })
            if(existingProduct){
                existingProduct.quantity+=window.quantity
            }
            //product doesnot exist
            else{
           window.cart.push({
                ...window.selectedProduct,
                 selectedOption: window.selectedOption,
                quantity:window.quantity
            })
            }
            //updates cart number
           window.cartnum=window.cart.length;
            // document.getElementById('cart-display').innerText=window.cartnum;
            const cartDisplay = document.getElementById("cart-display");
            if (cartDisplay) {
                 cartDisplay.innerText = window.cartnum;
                }

            //save cart to localstorage.
            localStorage.setItem(
                "cart",
                 JSON.stringify(window.cart)
            )
            console.log(localStorage.getItem("cart"))
            //show cart items
            window.displayCartItems()
              // reset qunatity
              window.quantity = 1;
            ShowNumber.innerText = window.quantity;
            //ovelay close
       overlay.style.display = "none";
        })
   //for show cart items
    window.displayCartItems=function (){
        const cartItems=document.getElementById("cart-items");
        const cartTotal=document.getElementById("cart-total");
        const cartCount=document.getElementById("cart-count");
        cartItems.innerHTML="";
        cartCount.innerText=`(${window.cart.length})`;
        let total=0;
        window.cart.forEach((item,i)=>{
        let itemTotal = parseInt(item.salePrice) * item.quantity;
            total+=itemTotal
            cartItems.innerHTML+=`
            <div class="cart-item">
            <img src="${item.image}" width="60px"/>
            <div>
            <h3>${item.title}</h3>
             <p>Rs ${item.salePrice}*${item.quantity}</p>
             <p>Price : ${itemTotal}</p>
              <button class="delete-btn"
            onclick="deleteItem(${i})">
            Delete
        </button>
            </div>
            <div class="quantity-box">
            <button onclick="decreaseQty(${i})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQty(${i})">+</button>
            </div>
              <p>${item.selectedOption}</p>
            </div>`
        })
           cartTotal.innerText=total;
   }

window.initCart = function () {
    const cartContainer = document.getElementById("cart-container");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");
   if (!cartContainer || !cartOverlay || !closeCart) return;
    // OPEN CART
    cartContainer.addEventListener("click", () => {
        cartOverlay.style.display = "flex";
    });

    // CLOSE CART
    closeCart.addEventListener("click", () => {
        cartOverlay.style.display = "none";
    });
};
//for increase quantity
window.increaseQty=function(index){
    window.cart[index].quantity++;
    //save updated cart
     localStorage.setItem(
        "cart",
        JSON.stringify(window.cart)
    );
    window.displayCartItems()
}
//for decreasing qunatity
window.decreaseQty=function(index){
    window.cart[index].quantity--;
    if(window.cart[index].quantity<=0){
        window.cart.splice(index,1)
    }
     //save updated cart
    localStorage.setItem(
        "cart",
        JSON.stringify(window.cart)
    );

    window.displayCartItems();
}
//delete button functinality in add to cart overlay
window.deleteItem = function(index){
     // remove product from cart
    window.cart.splice(index,1);
  // update cart number
    window.cartnum = window.cart.length;
      // update navbar cart count
    document.getElementById("cart-display").innerText =
    window.cartnum;
     //save updated cart
    localStorage.setItem(
        "cart",
        JSON.stringify(window.cart)
    );

    // refresh cart UI
    window.displayCartItems();

}
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
option1.addEventListener("click",()=>{
    window.selectedOption = option1.innerText;
    option1.classList.add("active-option");
    option2.classList.remove("active-option");
    option3.classList.remove("active-option");
});
//for option2
option2.addEventListener("click",()=>{
    window.selectedOption = option2.innerText;
    option2.classList.add("active-option");
    option1.classList.remove("active-option");
    option3.classList.remove("active-option");
});
// for option3
option3.addEventListener("click",()=>{
    window.selectedOption = option3.innerText;
    option3.classList.add("active-option");
    option1.classList.remove("active-option");
    option2.classList.remove("active-option");
});


// restore cart count
window.cartnum = window.cart.length;

// update navbar cart number
const cartDisplay =
document.getElementById("cart-display");

if(cartDisplay){
    cartDisplay.innerText = window.cartnum;
}

window.displayCartItems()