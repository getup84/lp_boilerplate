import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
export const swiper = () => {
  window.addEventListener('load', () => {
    let ele = document.querySelector('.swiper');
    if (ele !== null) {
      // オプション
      let swiperOption = {
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        speed: 2000
      }
      new Swiper(ele, swiperOption);
    }
  });
};