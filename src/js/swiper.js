import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
export const swiper = () => {
  window.addEventListener('load', () => {
    let ele = document.querySelector('.swiper');
    if (ele !== null) {
      // オプション
      let swiperOption = {
        loop: true,
        effect: 'slider',
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        speed: 1000,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
      new Swiper(ele, swiperOption);
    }
  });
};