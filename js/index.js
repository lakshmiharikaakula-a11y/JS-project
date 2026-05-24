
// --------------------cards-section-slider section-----------------------------
const carousel = document.getElementById("card-carousal");
let totalCards=0
let cardsPerSlide=4;
let currentIndex=0;
//responsive card count
// RESPONSIVE CARDS COUNT
function updateCardsPerSlide() {
    if(window.innerWidth <= 480){
        cardsPerSlide = 2;
    }
    else if(window.innerWidth <= 768){
        cardsPerSlide = 2.3; // 2 full + partial 3rd
    }
    else{
        cardsPerSlide = 4;
    }
    showslide(currentIndex);
}
//fetch data
async function getData(){
    const res=await fetch("./json/details.json")
    const data=await res.json()
    console.log(data)
    //loop through that json
    data.forEach((product)=>{
        const card=document.createElement('div')
        card.className='card';
        const imgDiv=document.createElement('div');
        imgDiv.className='card-image';
        const img=document.createElement('img')
        img.src=product.image;
        img.alt=product.title;
        //Hover effect 
        img.addEventListener('mouseover',()=>img.src=product.hoverImage);
        img.addEventListener('mouseout',()=>img.src=product.image);
        //appending the img to the imgdiv
        imgDiv.appendChild(img);
        const offerDiv=document.createElement('div');
        offerDiv.className="offer-badge"
        imgDiv.appendChild(offerDiv);
        offerDiv.innerHTML=`<span class="offer-text">${product.discount} off</span>`;
        const contentDiv=document.createElement('div')
        contentDiv.className="card-content";
        const rating=Math.max(0,(Math.min(5,Number(product.reviews))))
        contentDiv.innerHTML=`<p class="para1">From Rs ${product.salePrice} <s class="regular-price">${product.regularPrice}</s></p>
                                 <p class="para2">${product.title}-${product.description}</p>
                                <p class="reviews">${"★ ".repeat(rating)+"☆ ".repeat(5-rating)}(${product.reviews})</p>
                                <button class="card-carousel-btn">Choose Options</button>
                               `
        card.appendChild(imgDiv);
        card.appendChild(contentDiv);
        carousel.appendChild(card);
       //for choose btn functionality
       const chooseBtn=card.querySelector(".card-carousel-btn");
       chooseBtn.addEventListener('click',()=>{
            overlay.style.display="flex";
            selectedProduct=product;
            modalImage.src=product.image;
            modalHoverImage.src=product.hoverImage;
            modalTitle.innerText=`${product.title}-${product.description}`
            modalPrice.innerHTML=`From Rs ${product.salePrice} <s class="regular-price">${product.regularPrice}</s>`
              // for selecting options
            option1.innerText = product.options[0];
            option2.innerText = product.options[1];
            option3.innerText = product.options[2];

            // default select
            window.selectedOption = product.options[0];
        })     
})

    //update the length of the card
    totalCards = data.length;
    //update the cards per slide
    updateCardsPerSlide();
}

function showslide(index){
    const cards = document.querySelectorAll(".card");
    if(cards.length === 0) return;
    const cardStyle =window.getComputedStyle(cards[0]);
    const marginRight =parseInt(cardStyle.marginRight);
    const cardWidth =cards[0].offsetWidth + marginRight;
    const moveX = index * cardWidth;
    carousel.style.transform =`translateX(-${moveX}px)`;
}
//for the prev button
document.getElementById("prev").addEventListener("click",()=>{
    if(currentIndex>0){
        currentIndex--;
        showslide(currentIndex);
    }
})
//for the next button
document.getElementById('next').addEventListener("click",()=>{
    if(currentIndex< totalCards - cardsPerSlide){
        currentIndex++;
        showslide(currentIndex);
    }
})
window.addEventListener("resize",updateCardsPerSlide);
getData();
       
// --------------hero-slider-section-------------------
let slides=document.querySelectorAll('.farm-slide');
let slider=document.getElementById("farm-slider");
const nextBtn1 = document.getElementById("next1");
const prevBtn1 = document.getElementById("prev1");
let currentInd=0;
const totalslides=slides.length;
//for the next button
nextBtn1.addEventListener("click",()=>{
    currentInd++;
    if(currentInd>=totalslides){
        currentInd=0;
    }
    //move slider
    updateSlider()
})
//for the previous button
prevBtn1.addEventListener('click',()=>{
    currentInd--;
    if(currentInd<0){
        currentInd=totalslides-1
    }
    //move slider
    updateSlider()
})
//move slider function
function updateSlider(){
    slider.style.transform=`translateX(-${currentInd*100}%)`
}
// for auto slide
setInterval(()=>{
       currentInd++;
    if(currentInd >= totalslides){
        currentInd = 0;
    }
    updateSlider();
},4000)


//product card slider 
let ProductCardSlider=document.getElementById("product-card-slider");
//fetch the data
async function getData1(){
    let res=await fetch("./json/cardDetails.json");
    let data=await res.json()
    // console.log(data)
    data.forEach((product,i)=>{
        const card1=document.createElement('div')
        card1.classList.add("product-card1");
        card1.style.animationDelay =`${i * 4}s`;
        card1.innerHTML=`
         <div class="product-image-box">
            <img src="${product.image}" class="product-image">
            <div class="offer-badge">
                10% <br> OFF
            </div>
        </div>
        <p class="price">Rs. ${product.salePrice}<span class="regular-price">Rs. ${product.regularPrice}</span></p>
        <h3 class="product-title">${product.title}</h3>
        <button class="addbtn1"> Add To Cart</button>
        `
        //accessing button
        let addBtn1=card1.querySelector(".addbtn1")
        //Eventlistner to addbtn1
        addBtn1.addEventListener('click',()=>{
           //check for the existion product
           const existingProduct=cart.find((item)=>{
            return item.title===product.title
           })
           //if product exists
           if(existingProduct){
            existingProduct.quantity+=1;
           }
           //new product
           else{
            cart.push({
                ...product,
                quantity:1
            })
           }
           //update the cart count
           cartnum=cart.length;
           document.getElementById('cart-display').innerText = cartnum;
           //display cart
           displayCartItems()
        })
        ProductCardSlider.appendChild(card1)
    })
}
getData1()

// ---------category cards carousel---------
let categoryContainer=document.getElementById("category-container");
let currentIndexx=0;
//movevalue(cardwidth+gap)
let movevalue=270;
let totallength=0;
let visibleCards = 4;
//fetch the data from the json
async function getCategoryData(){
    let res=await fetch('./json/categoryCardDetails.json');
    let categorydata=await res.json()
    categorydata.map((categorycard,i)=>{
        //create card
        let categoryCard=document.createElement('div');
        //add class name
        categoryCard.classList.add('category-card');
        //add the card details
        //add the image first
        categoryCard.innerHTML=`
                <img src="${categorycard.image}" alt="${categorycard.title}">
                <h3>${categorycard.title}</h3>
                `
        //add event to category card
        categoryCard.addEventListener('click',()=>{
            //redirect to the selectd page
            window.location.href=categorycard.page
        });
        //append the child to categorycontainer
        categoryContainer.appendChild(categoryCard)
    })
    totallength=document.querySelectorAll('.category-card').length;
}
getCategoryData()
//category card carousel
let prevButton=document.getElementById('prev-btn2');
let nextButton=document.getElementById('next-btn2');

function moveCarousel(){
    categoryContainer.style.transform=`translateX(-${currentIndexx*movevalue}px)`
}
nextButton.addEventListener('click',()=>{
    currentIndexx++;
    if(currentIndexx>totallength-visibleCards){
        currentIndexx=0;
    }
    moveCarousel()
})
prevButton.addEventListener("click",()=>{
    currentIndexx--;
    if(currentIndexx<0){
        currentIndexx=totallength-visibleCards;
    }
     moveCarousel();
})

// -----------testimonal slider--------------
let testimonalSlider=document.getElementById("testimonal-slider");
let testIndex=0;
let alltestimonalcards;
async function getReviews(){
    let reviewres=await fetch("./json/reviews.json");
    let reviewdata=await reviewres.json();
    reviewdata.forEach((review)=>{
        const review_card=document.createElement('div');
        review_card.classList.add("testimonal-card");
        review_card.innerHTML=`
         <div class="stars">
                ${"★".repeat(review.rating)}
            </div>
              <p class="review-text">
                ${review.review}
            </p>
              <div class="review-user">
                <img src="${review.image}">
                <div>
                    <h3>${review.name}</h3>
                    <p>${review.role}</p>
                </div>
            </div>
        `
         testimonalSlider.appendChild(review_card);
    })
    alltestimonalcards=document.querySelectorAll(".testimonal-card")
    showCard(testIndex);
}
getReviews()
function showCard(testIndex){
    let testcardwidth=alltestimonalcards[0].offsetWidth+20;//width+margin;
    const testoffset=-(testIndex*testcardwidth)
    testimonalSlider.style.transform=`translateX(${testoffset}px)`

}
document.getElementById('next-review').addEventListener('click',()=>{
    testIndex++;
    if(testIndex>=alltestimonalcards.length){
        testIndex=0;
    }
      showCard(testIndex)
});
document.getElementById('prev-review').addEventListener('click',()=>{
    testIndex--;
    if(testIndex<0){
        testIndex=alltestimonalcards.length-1;
    }
      showCard(testIndex)
})