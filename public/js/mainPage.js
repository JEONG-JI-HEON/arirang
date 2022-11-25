let button = document.querySelector('.button');
let moviePlaceL = document.querySelector('.moviePlaceL');
let moviePlaceI = document.querySelectorAll('.moviePlaceI');
let selectBg = document.querySelector('.select_bg');
let selectNow = document.querySelector('.selectNow');

/* 버튼 눌렀을때 리스트랑 배경 내려오게 하기 */
button.addEventListener('click', ()=>{
  selectBg.classList.toggle('active');
  moviePlaceL.classList.toggle('active');
});

/* 클릭한 옵션의 텍스트를 selectNow 안에 넣고 목록 닫기 */
const handleSelect = (item)=>{
  /* 선택된 애들은 리스트에 안뜨게 하기 */
  for(i = 0; i < moviePlaceL.children.length; i++){
    moviePlaceL.children[i].classList.remove('remove');
  };
  item.classList.add('remove');

  selectNow.innerHTML = item.textContent
  selectBg.classList.remove('active');
  moviePlaceL.classList.remove('active');

  /* 아리랑인디웨이브일때 크기 조절 */
  if(selectNow.innerHTML == '아리랑인디웨이브'){
    selectNow.style.padding = '0 10px';
    selectNow.style.fontSize = '16px';
  } else{
    selectNow.style.padding = '0 50px';
    selectNow.style.fontSize = '18px';
  };
};

/* 옵션 클릭시 클릭한 옵션을 넘김 */
moviePlaceI.forEach(option =>{
  option.addEventListener('click', ()=>{
    handleSelect(option);
  });
});

let fthSection = document.querySelector('.fth_sec')


fthSection.addEventListener('mouseleave',()=>{
  selectBg.classList.remove('active');
  moviePlaceL.classList.remove('active');
})


/* 박스 오피스 순위 좋아요 버튼 */
let likeBtn = document.querySelectorAll('.like_btn');
let hoverHeart = document.querySelectorAll('.hoverHeart');
let likeN = document.querySelectorAll('.likeN')

likeBtn.forEach(item =>{
  item.addEventListener('click', ()=>{
    item.firstElementChild.classList.toggle('active');

    let likeNum = Number(item.lastElementChild.innerText);
    
    /* 숫자가 아닐때(1.4K) 밑에 if절까지 안가고 여기서 스탑 */
    if(!likeNum){
      return;
    }
    
    if (item.firstElementChild.classList.contains('active')){
      likeNum += 1
      item.lastElementChild.innerText = likeNum;
    } else{
      likeNum -= 1
      item.lastElementChild.innerText = likeNum;
    }
  });
});