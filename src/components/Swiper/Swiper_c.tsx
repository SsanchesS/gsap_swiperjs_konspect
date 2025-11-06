import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from "swiper"
import { Navigation, Pagination, Scrollbar, Autoplay, FreeMode, EffectFade } from 'swiper/modules'

// Импорт стилей Swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import "./Swiper.sass"

const Swiper_с = () => {

   // берем ref свайпера
   const swiperRef = useRef<SwiperType | null>(null)
   // При динамическом обновлении данных — вызывать swiperRef.current?.update() если нужно перерендерить.
   // swiperRef.current?.slideTo(index)
   // swiperRef.current?.autoplay.start() / autoplay.stop()

return (
<div className='Swiper_с' style={{ width: "100%" }}>
   <Swiper
      slidesPerView={1} // сколько слайдов показывать одновременно number | "auto"
      spaceBetween={1} // расстояние между слайдами в px
      grabCursor={true} // если true, курсор меняется на «руку» при наведении / перетаскивании.
      // centeredSlides={true} // Центрирует активный слайд
      // slidesPerGroup={2} // сколько слайдов перелистывать за один шаг
      // speed={800} - Определяет длительность анимации при смене слайда (в мс).
      loop={true} // если true, слайды зацикливаются
      
      // модули навигации/точек/ползунка/автоматическая прокрутка
      modules={[Navigation, Pagination, Scrollbar, Autoplay, FreeMode, EffectFade]}
      // navigation={true} // стрелочки
      // pagination={{ clickable: true }} // точки внизу
      scrollbar={{ draggable: true }} // Добавляет ползунок прокрутки
      autoplay={{ delay: 3000, disableOnInteraction: false }} // автоматическая прокрутка каждые 3сек / не останавливать при ручной прокрутке - Если true, то пользователь останавливает автоплей навсегда

      // объект для адаптивных настроек (на основе ширины окна).
      breakpoints={{
         0: { slidesPerView: 1 },
         480: { slidesPerView: 1.2 }, // часть следующего слайда, можно 1.5 и др
         768: { slidesPerView: 2 },
         1024: { slidesPerView: 3 },
      }}

      // События
      onSlideChange={swiper => console.log("Изменен слайд:", swiper.activeIndex)} // при каждом переключении слайда
      onReachEnd={() => console.log("Достигнут конец")}
      onReachBeginning={() => console.log("Достигнуто начало")}
      // берем ref свайпера
      onSwiper={swiper => swiperRef.current = swiper}

      // свои стрелочки
      navigation={{
         nextEl: ".custom-next",
         prevEl: ".custom-prev",
      }}
      // свой контейнер для пагинации
      pagination={{
         el: ".custom-pagination",
         clickable: true,
      }}

      // freeMode делает Swiper инерционным,то можешь прокрутить не фиксированно “по слайдам”, а как список — плавно, с “накатом”. - но тут не работает хз поч
      // freeMode={true}

      // тип перехода
      // effect="fade" 
      // fadeEffect={{ crossFade: true }}
      // | Эффект    | Что подключать    | Значение `effect` |
      // | --------- | ----------------- | ----------------- |
      // | Затухание | `EffectFade`      | fade              |
      // | Переворот | `EffectFlip`      | flip              |
      // | Карточки  | `EffectCards`     | cards             |
      // | Куб       | `EffectCube`      | cube              |
      // | Coverflow | `EffectCoverflow` | coverflow         |
   >
      <SwiperSlide><div className='img'>1<img src="/vite.svg" alt="vite" /></div></SwiperSlide>
      <SwiperSlide><div className='img'>2<img src="/vite.svg" alt="vite" /></div></SwiperSlide>
      <SwiperSlide><div className='img'>3<img src="/vite.svg" alt="vite" /></div></SwiperSlide>
      <SwiperSlide><div className='img'>4<img src="/vite.svg" alt="vite" /></div></SwiperSlide>
      <SwiperSlide><div className='img'>5<img src="/vite.svg" alt="vite" /></div></SwiperSlide>
      <SwiperSlide><div className='img'>6<img src="/vite.svg" alt="vite" /></div></SwiperSlide>
      <SwiperSlide><div className='img'>7<img src="/vite.svg" alt="vite" /></div></SwiperSlide>
      <SwiperSlide><div className='img'>8<img src="/vite.svg" alt="vite" /></div></SwiperSlide>
   </Swiper>
   <button onClick={() => swiperRef.current?.slideNext()}>
      Next
   </button>
   <button className="custom-prev">←</button>
   <button className="custom-next">→</button>
   <div className="custom-pagination"></div> 
</div>
)}
export default Swiper_с

// Прочие модули:

// Virtual - Очень важно для длинных списков — рендерит в DOM только видимые слайды
// Keyboard / Mousewheel - Управление клавишами и колесом мыши
// Модуль A11y - добавляет aria-атрибуты и улучшает навигацию для скринридеров
// Zoom - Зум и паннинг внутри слайда (полезно для галерей картинок)
// Lazy - ленивая подгрузка картинок - но чет не робит у меня
// Много других Событий (Events)
// Полностью отключает реальное движение DOM, только логически меняет активный слайд. Нужно для случаев, когда ты сам анимируешь движение через GSAP или CSS.
// <Swiper virtualTranslate={true} onSlideChange={() => console.log("change")} /> - Слайды не будут двигаться, но событие onSlideChange будет вызываться