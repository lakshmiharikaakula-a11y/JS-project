async function loadNavbar(){
    const container=document.getElementById('navbar-container');
    if(!container)return ;
    let res=await fetch('./Navbar.html');
    let data=await res.text()
    // console.log(data)
    container.innerHTML=data;
     // restore cart count
    const cartDisplay=document.getElementById("cart-display");
    if(cartDisplay){
        let cart=JSON.parse(localStorage.getItem("cart")) || [];
        cartDisplay.innerText = cart.length;
    }
    //navbar function
    if(window.initCart) window.initCart();
    if(window.initNavbar) window.initNavbar();
}
loadNavbar()
function initNavbar(){
// for topnavbar left and right arrow
const leftarrow=document.querySelector(".left-arrow");
const rightarrow=document.querySelector(".right-arrow");
const offertime=document.querySelector(".offer-time p");
const offercontent=document.querySelectorAll(".offer-content p");
// console.log(offercontent)
let step=0;
function show(){
//hiding first
offertime.style.display="none";
offercontent.forEach((p)=>{
    p.classList.remove("active")
})
//step1:show time and activeclass
if(step==0)
{
offertime.style.display="block";
offercontent[0].classList.add("active")
}
else if(step==1){
    offertime.style.display="none";
    offercontent[1].classList.add("active");
}
else if(step==2){
    offertime.style.display="none";
    offercontent[2].classList.add("active");
}
}
// show()
leftarrow.addEventListener('click',()=>{
    step=(step+1)%3;
    show()
})
rightarrow.addEventListener('click',()=>{
        step=(step-1+3)%3;
    show()
})
//for second nav bar dropdown
let selected_heading=document.querySelector('.selected');
let dropdown_container=document.querySelector('.dropdown');
let inputfield=document.querySelector("#search-input");
let text=document.querySelector(".selected-text")
selected_heading.addEventListener('click',()=>{
    dropdown_container.classList.toggle('active');
})
let options=document.querySelectorAll(".options li")
options.forEach((option)=>{
    option.addEventListener('click',()=>{
        let selectedtext=option.textContent;
        //changing heading text
        text.textContent=selectedtext;
        //focus on inputfield
        inputfield.focus();
        //close of dropdown after selecting
        dropdown_container.classList.remove("active");
    })
})

//for hamburger menu
let menuToggle=document.querySelector('.menu-toggle');
// console.log(menuToggle)
let bottomNavbar=document.querySelector(".bottomnav-container");
let closeMenu=document.querySelector(".close-menu");
menuToggle.addEventListener('click',()=>{
    bottomNavbar.classList.toggle('active');
})
//closemenu
closeMenu.addEventListener('click',()=>{
     bottomNavbar.classList.remove("active");
   
})
const allDropdowns = document.querySelectorAll(
".products-allindia,.products-mumbai,.story,.kfarms-list,.giving-back"
);

allDropdowns.forEach((item)=>{

const heading = item.querySelector(".dropdown-allindia-heading,.products-mumbai-heading,.story-heading,.kfarms-heading,.giving-back-heading");
    heading.addEventListener("click",(e)=>{
        e.stopPropagation()
        // desktop OR mobile both work
        const isMobile = window.innerWidth <= 768;
        if(isMobile){
            // accordion behavior
            allDropdowns.forEach((drop)=>{
                if(drop !== item){
                    drop.classList.remove("active");
                }
            });
        }
        // toggle current
        item.classList.toggle("active");
    });
});

document.addEventListener("click",(e)=>{
    allDropdowns.forEach((dropdown)=>{
        if(!dropdown.contains(e.target)){
            dropdown.classList.remove("active");
        }
    });
});

}