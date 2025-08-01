const slider_right = document.querySelector('.swiper-button-next');
const slider_left = document.querySelector('.swiper-button-prev');
const profiles = document.querySelectorAll('.swiper-slide');
const more_button=document.querySelector('.more-buttn');
let arrow=document.querySelector('.more-buttn i')
const hidden_menu=document.querySelectorAll('.menu-hide')
let arrow_dir="down"
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

// menu card hidden
function hide_menu(){

}
more_button.addEventListener('click',(e)=>{
    e.preventDefault();
    let more_button_text=document.querySelector('.more-text').textContent
    
  if(more_button_text=="More"){
    hidden_menu.forEach((card,i)=>{
        card.classList.remove('menu-hide')
      
    })
     document.querySelector('.more-text').textContent="Less"
      arrow_dir="up"
      arrow.className=`ri-arrow-${arrow_dir}-s-fill`
      
     
     
  }
  else{
    
     hidden_menu.forEach((card,i)=>{
        card.classList.add('menu-hide')
        
    })
    document.querySelector('.more-text').textContent="More"
    arrow_dir="down"
    arrow.className=`ri-arrow-${arrow_dir}-s-fill`

      
  }

})