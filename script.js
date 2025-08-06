
const slider_right = document.querySelector('.swiper-button-next');
const slider_left = document.querySelector('.swiper-button-prev');
const profiles = document.querySelectorAll('.swiper-slide');
const more_button = document.querySelector('.more-buttn');
let arrow = document.querySelector('.more-buttn i')
const hidden_menu = document.querySelectorAll('.menu-hide')
const cardList = document.querySelector('.card-list')
const cartValue=document.querySelector('.cart-value')
const hamnurger=document.querySelector('.hamburger')
const mobilemenu=document.querySelector('.mobile')
const bars=document.querySelector('.ri-menu-line')
let Totalqty=0
let arrow_dir = "down"
let currentIndex = 0;
// slider for review

// Initialize - show first profile
function slideUpdate(index) {
  profiles.forEach((slide, i) => {
    slide.classList.remove('active', 'diactive');
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.add('diactive');
    }
  });
}

slideUpdate(currentIndex);

// Right arrow click (next)
slider_right.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= profiles.length) {
    currentIndex = 0; // Loop to first
  }
  slideUpdate(currentIndex);
});

// Left arrow click (prev)
slider_left.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = profiles.length - 1; // Loop to last
  }
  slideUpdate(currentIndex);
});

//hamburger menu bar
hamnurger.addEventListener('click', () => {
  mobilemenu.classList.toggle('js-active-menu');
  
});
mobilemenu.addEventListener('click', () => {
   mobilemenu.classList.toggle('js-active-menu');
  
});
hamnurger.addEventListener('click', () => {
   bars.classList.toggle('ri-menu-line');
bars.classList.toggle('ri-close-line');
  
});
//cart icon
const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closebtn = document.querySelector('.close-btn');
const cartlist=document.querySelector('.cart-list')
const cartTotal = document.querySelector('.cart-total')
cartIcon.addEventListener('click', () => {
  cartTab.classList.add('cart-tab-active');
  
});
closebtn.addEventListener('click', () => {
  cartTab.classList.remove('cart-tab-active');
});

let productlist = []
let cartproduct = []

const updatetotal=()=>{
  let totalprice=0
  document.querySelectorAll('.item').forEach((el)=>{
    const price =parseFloat(el.querySelector('.item-price').textContent.replace('$',''))
    totalprice+=price
  })
  cartTotal.textContent = `$${totalprice.toFixed(2)}`
}

const showcard = () => {
  productlist.forEach((item) => {
    const ordercard = document.createElement('div')
    ordercard.classList.add('order-card')
    ordercard.innerHTML = `
    <div class="card-img">
    <img src="${item.image}" alt="">
    </div>
    <h4>${item.name}</h4>
    <h4 class="price">${item.price}</h4>
    <a href="#" class="button card-button">Add to cart</a>
    `
   
    const cardbtn = ordercard.querySelector('.card-button')
    cardbtn.addEventListener('click', (e) => {
      e.preventDefault()
      addtocart(item)
    })
    cardList.appendChild(ordercard)
  })
}

const addtocart =(item)=>{
  const existingproduct=cartproduct.find((product)=>{
    return product.id == item.id
  })
  if(existingproduct){
  
    return
  }
  cartproduct.push(item)
  let quantity=1
  Totalqty++
  cartValue.textContent=Totalqty;
const cartitem=document.createElement('div')
cartitem.classList.add('item')
cartitem.innerHTML=`
<div class="item-image">
<img src="${item.image}" alt="">
</div>
  <div>
  <h4>${item.name}</h4>
  <h4 class="item-price">${item.price}</h4>
  </div>
  <div>
  <a href="" class="qty-bttn minus">
    <i class="ri-subtract-line"></i>
  </a>
  <span class="qty">${quantity}</span>
  <a href="" class="qty-bttn plus">
    <i class="ri-add-line"></i>
  </a>
  </div>
  `
  
  cartlist.appendChild(cartitem)
   let qty = cartitem.querySelector('.qty')
   let price = parseFloat(item.price.replace('$', ''))
  const plusbtn = cartitem.querySelector('.plus')
  const minusbtn = cartitem.querySelector('.minus')
  const itemprice=cartitem.querySelector('.item-price')
  minusbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    if(quantity>1){
    quantity--;
    Totalqty--;
    cartValue.textContent=Totalqty;
    qty.textContent=quantity;
    itemprice.textContent = (price * quantity).toFixed(2)
    updatetotal()
    }
    else{
      Totalqty--
      cartValue.textContent=Totalqty;
      cartitem.classList.add('slide-out')
      setTimeout(()=>{
         cartitem.remove()
         updatetotal()
        for(i=0;i<cartproduct.length;i++){
        if(cartproduct[i].id==item.id){
          cartproduct.splice(i, 1)
        }
      }
      },300)  
     
      
    }
    
  })
  plusbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    quantity++;
    Totalqty++;
    cartValue.textContent=Totalqty;
    qty.textContent=quantity;
    itemprice.textContent = (price * quantity).toFixed(2)
    updatetotal()
  })
  updatetotal()
  console.log(quantity)
}




const initapp = async () => {
  const promise = await fetch('products.json')
  const data = await promise.json()
  productlist = data
  showcard()

}
initapp()
