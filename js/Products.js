//Reading category from url
let params=new URLSearchParams(window.location.search);
let selectedCategory=params.get('category');
// convert category into array
let categories = selectedCategory.split(',').map((item)=>{
    return item.trim();
});
let headingTitle=params.get('title');
console.log(headingTitle)

//set the heading
document.getElementById('category-title').innerText = headingTitle;
//fetch the data from products.json
async function getProductData(){
    let res=await fetch('./json/Products.json');
    let data=await res.json();
    // console.log(data)
    // filter the products
    let filteredProduct=data.filter((product)=>{
        // return (product.category===selectedCategory);
        return categories.includes(product.category)
    });
    // console.log(filteredProduct);
    //assign each card to inside filtered products
    let ProductContainer=document.getElementById('products-container');
    let count=0;
    filteredProduct.forEach((selectedcard,i)=>{
        if(selectedcard){
            count++;
        }
        let eachcard=document.createElement('div');
        //adding class name
        eachcard.classList.add('selected-card');
        //adding the card details
        eachcard.innerHTML=`
            <div class="product-image">
                 <img src="${selectedcard.image}" alt="${selectedcard.name}">
            </div>
            <div class="product-content">
                <h2>${selectedcard.name}</h2>
                <p>Rs ${selectedcard.price}<span>RS ${selectedcard.oldPrice}</span></p>
                 <button class="cart-btn" data-index="${i}">
                    Add To Cart
                </button>
            </div>
        `
           // append card
        ProductContainer.appendChild(eachcard);
        let addBtn=eachcard.querySelector('.cart-btn')
        addBtn.addEventListener('click',()=>{
            //send product to global cart system
            window.selectedProduct={title: selectedcard.name,
                                    salePrice: selectedcard.price,
                                    image: selectedcard.image};
            //open overlay
            document.getElementById("overlay").style.display = "flex";
             // fill modal
            document.getElementById("modal-title").innerText = selectedcard.name;
            document.getElementById("modal-price").innerText = selectedcard.price;
              document.getElementById("modaloption-name").innerText =selectedcard.optionname;
            document.getElementById("option1").innerText =selectedcard.options[0];
            document.getElementById("option2").innerText =selectedcard.options[1];
            document.getElementById("option3").innerText =selectedcard.options[2];
            document.getElementById("modal-image").src = selectedcard.image;
            // DEFAULT SELECT
            window.selectedOption = selectedcard.options[0];
            //reset the quantity
            window.quantity=1;
            document.getElementById("show-number").innerText = 1;
})

    })
    console.log(count)
    document.getElementById('card-count').innerText=`${count}products`

}
getProductData()