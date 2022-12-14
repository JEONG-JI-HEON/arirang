let button = document.querySelector('.button');
let moviePlaceL = document.querySelector('.moviePlaceL');
let moviePlaceI = document.querySelectorAll('.moviePlaceI');
let selectBg = document.querySelector('.select_bg');
let selectNow = document.querySelector('.selectNow');
let moviePlaceCon = document.querySelectorAll('.mt_con ul');

/* 버튼 눌렀을때 리스트랑 배경 내려오게 하기 */
button.addEventListener('click', () => {
  selectBg.classList.toggle('active');
  moviePlaceL.classList.toggle('active');
});

/* 클릭한 옵션의 텍스트를 selectNow 안에 넣고 목록 닫기 */
const handleSelect = (item) => {
  /* 선택된 애들은 리스트에 안뜨게 하기 */
  for (i = 0; i < moviePlaceL.children.length; i++) {
    moviePlaceL.children[i].classList.remove('remove');
  };

  selectNow.innerHTML = item.textContent
  selectBg.classList.remove('active');
  moviePlaceL.classList.remove('active');


  if (selectNow.innerHTML == '1관') {
    moviePlaceCon.forEach(PlaceCon => {
      PlaceCon.classList.remove('on');
    })
    moviePlaceCon[0].classList.add('on');
  } else if (selectNow.innerHTML == '2관') {
    moviePlaceCon.forEach(PlaceCon => {
      PlaceCon.classList.remove('on');
    })
    moviePlaceCon[1].classList.add('on');
  } else{
    moviePlaceCon.forEach(PlaceCon => {
      PlaceCon.classList.remove('on');
    })
    moviePlaceCon[2].classList.add('on');
  }


  /* 아리랑인디웨이브일때 크기 조절 */
  if (selectNow.innerHTML == '아리랑인디웨이브') {
    selectNow.style.padding = '0 10px';
    selectNow.style.fontSize = '16px';
  } else {
    selectNow.style.padding = '0 50px';
    selectNow.style.fontSize = '18px';
  };
};

/* 옵션 클릭시 클릭한 옵션을 넘김 */
moviePlaceI.forEach(option => {
  option.addEventListener('click', () => {
    handleSelect(option);
  });
});

let fthSection = document.querySelector('.fth_sec')


fthSection.addEventListener('mouseleave', () => {
  selectBg.classList.remove('active');
  moviePlaceL.classList.remove('active');
})


/* 박스 오피스 순위 좋아요 버튼 */
let likeBtn = document.querySelectorAll('.like_btn');
let hoverHeart = document.querySelectorAll('.hoverHeart');
let likeN = document.querySelectorAll('.likeN')

likeBtn.forEach(item => {
  item.addEventListener('click', () => {
    item.firstElementChild.classList.toggle('active');

    let likeNum = Number(item.lastElementChild.innerText);

    /* 숫자가 아닐때(1.4K) 밑에 if절까지 안가고 여기서 스탑 */
    if (!likeNum) {
      return;
    }

    if (item.firstElementChild.classList.contains('active')) {
      likeNum += 1
      item.lastElementChild.innerText = likeNum;
    } else {
      likeNum -= 1
      item.lastElementChild.innerText = likeNum;
    }
  });
});

/**** 공지사항 탭메뉴 ****/
let noticeCon = document.querySelectorAll('.nt_con ul');
let noticetabBtn = document.querySelectorAll('.nt_tit span');
let noticeAll = document.querySelector('.nt_tit>span:first-child');
let noticeReal = document.querySelector('.nt_tit>span:nth-child(2)');
let noticeEvent = document.querySelector('.nt_tit>span:nth-child(3)');
let noticeFetival = document.querySelector('.nt_tit>span:last-child');

/* 전체 */
noticeAll.addEventListener('click', () => {
  noticeCon.forEach(ul => {
    ul.classList.remove('on');
  });
  noticetabBtn.forEach(span => {
    span.classList.remove('bold');
  })
  noticeCon[0].classList.add('on');
  noticeAll.classList.add('bold');
})

/* 공지사항 */
noticeReal.addEventListener('click', () => {
  noticeCon.forEach(ul => {
    ul.classList.remove('on');
  });
  noticetabBtn.forEach(span => {
    span.classList.remove('bold');
  })
  noticeCon[1].classList.add('on');
  noticeReal.classList.add('bold');
})

/* 이벤트 */
noticeEvent.addEventListener('click', () => {
  noticeCon.forEach(ul => {
    ul.classList.remove('on');
  });
  noticetabBtn.forEach(span => {
    span.classList.remove('bold');
  })
  noticeCon[2].classList.add('on');
  noticeEvent.classList.add('bold');
})

/* 행사 */
noticeFetival.addEventListener('click', () => {
  noticeCon.forEach(ul => {
    ul.classList.remove('on');
  });
  noticetabBtn.forEach(span => {
    span.classList.remove('bold');
  })
  noticeCon[3].classList.add('on');
  noticeFetival.classList.add('bold');
})

/* 5개 이상은 제거 */
let noticeData = document.querySelector('.nt_con ul.on');
console.log(noticeData.children.length);
while (noticeData.children.length > 5){
  noticeData.removeChild(noticeData.children[5]);
};