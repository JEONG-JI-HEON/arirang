/* header */
let gnb = document.querySelector('#gnb_wrap');
let gnb_bg = document.querySelector('.gnb_bg');
let lnb = document.querySelectorAll('.lnb');

/* 배경 */
gnb.addEventListener('mouseenter',()=>{
  gnb_bg.style.height = '250px'
  for(i = 0; i < lnb.length; i++){
    lnb[i].style.height = '250px';
    lnb[i].style.opacity = 1;
  }
  
})

gnb.addEventListener('mouseleave',()=>{
  gnb_bg.style.height = '0px'
  for(i = 0; i < lnb.length; i++){
    lnb[i].style.height = '0px';
    lnb[i].style.opacity = 0;
  }
})


/* 글씨 그림자효과 */
let info = document.querySelectorAll('.lnb>li>a');

info.forEach((e)=>{
  e.addEventListener('mouseenter',()=>{
    e.style.textShadow = '2px 2px 2px #fff';
  })
  e.addEventListener('mouseleave',()=>{
    e.style.textShadow = '0px 0px 0px';
  })
})

/* subheader */
let subGnb = document.querySelectorAll('#sub_menu');

subGnb.forEach(gnb =>{
  let subGnb_bg = gnb.firstElementChild;
  let subLnb = gnb.lastElementChild;
  
  gnb.addEventListener('mouseenter',()=>{
    subGnb_bg.style.height = '250px'
    
    subLnb.style.height = '250px';
    subLnb.style.opacity = 1;
  })

  gnb.addEventListener('mouseleave',()=>{
    subGnb_bg.style.height = '0px'
    
    subLnb.style.height = '0px';
    subLnb.style.opacity = 0;
  })
})