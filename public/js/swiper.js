/* 메인페이지 스와이퍼 */
var swiper = new Swiper(".mySwiper", {
  breakpoints: {
    /* 반응형 */ 479: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1199: { slidesPerView: 4 },
  },
  spaceBetween: 30 /* 슬라이드 사이간격 */,
  slidesPerGroup: 1 /* 넘기는 슬라이드 수 */,
  // centeredSlides: true, /* 센터모드 */
  loop: true,
  loopAdditionalSlides: 1,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 3000,
    // disableOnInteraction: false,
  },
  allowTouchMove: false /* 버튼으로만 넘길수 있음 */,
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/* hover시 멈춤 */
let mySwiper = document.querySelectorAll(".mySwiper");

mySwiper.forEach((i) => {
  i.addEventListener("mouseenter", () => {
    i.swiper.autoplay.stop();
  });
  i.addEventListener("mouseleave", () => {
    i.swiper.autoplay.start();
  });
});

/* 영화 홈페이지 swiper */
var swiper = new Swiper(".mySwiperSub", {
  slidesPerView: 1,
  // spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-paginationSub",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-nextSub",
    prevEl: ".swiper-button-prevSub",
  },
});
