import "./Gsap.sass"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef, useState } from "react"

const Gsap_с = () => {
const box1Ref = useRef<HTMLDivElement>(null)
const box2Ref = useRef<HTMLDivElement>(null)
const box3Ref = useRef<HTMLDivElement>(null)
const box4Ref = useRef<HTMLDivElement>(null)
const [active, setActive] = useState(false)
// в отличие от useEffect, запускается синхронно после мутаций DOM, но до того, как браузер успеет отрисовать изображение, что делает его подходящим для задач, требующих измерений DOM
useLayoutEffect(() => {
   // 1. Основные методы: .to(), .from(), .fromTo()
   // | Метод                               | Что делает                                                     |
   // | ----------------------------------- | --------------------------------------------------------       |
   // | .to(target, vars)                   | Анимирует к новому состоянию “сейчас 0 → стань 300”            |
   // | .from(target, vars)                 | Анимирует от указанного состояния “начни с -300 → вернись в 0” |
   // | .fromTo(target, fromVars, toVars)   | Полный контроль — от чего и к чему “начни с -300, стань 300”   |

   // можно и по классу (".item")
   // gsap.to(".item", { x: 300, duration: 2 }) - к позиции x: 300 за 2 сек
   // gsap.from(boxRef.current, { opacity: 0, duration: 1 }) - появляется из прозрачности
   // gsap.fromTo(boxRef.current, { y: -100 }, { y: 0, opacity: 1, duration: 1 }) - комбинированный вариант

   // 2. Timeline — ключевая фишка GSAP - Timeline позволяет комбинировать анимации в цепочки с точным управлением временем, паузами и обратным воспроизведением
   // Можно:
   // синхронизировать анимации
   // повторять (repeat)
   // реверсить (tl.reverse())
   // запускать/останавливать (tl.pause(), tl.play())
   const tl = gsap.timeline({ repeat: -1, yoyo: true })

   tl.to(".box1", { x: 100, duration: 1 })
   .to(".box2", { x: 100, duration: 1 }, "-=0.5") // начинается на 0.5 сек раньше
   .to(".box3", { x: 100, duration: 1 })

   // 3. Плагины (модули как в Swiperjs)
   // MotionPathPlugin	- Движение по кривой (SVG path)
   // Draggable - Перетаскивание элементов
   // ScrollToPlugin -	Плавный скролл к элементу
   // SplitText - Анимация по буквам/словам
   // ScrollTrigger - Анимация при скролле
   gsap.registerPlugin(ScrollTrigger)
   gsap.to(box1Ref.current, {
      x: 400,
      scrollTrigger: {
        trigger: box1Ref.current,
        start: "top 80%",   // когда верх элемента входит в 80% окна
        end: "bottom 20%",  // когда низ достигает 20%
        scrub: true,        // плавно по скроллу
        markers: true       // визуальные маркеры (для отладки)
      }
    })
   
   // 4. Можно запускать анимации при изменении состояния
   gsap.to(box3Ref.current, {
      x: active ? 200 : 0,
      backgroundColor: active ? "tomato" : "skyblue",
      duration: 0.6
   })
   
   // 5. Свойства
   gsap.to(box2Ref.current, {
      x: 200,            // движение по X (z) 
      y: 50,             // движение по Y
      rotation: 45,      // поворот (rotationX, rotationY)
      scale: 1.5,        // масштаб (scaleX, scaleY)
      skewX: 20,         // наклон
      opacity: 0.5,      // прозрачность
      color: "white",    // цвета (backgroundColor) 
      duration: 1.5,     // сколько длится
      delay: 0.3,        // задержка (через сколько начнётся)
      ease: "power2.out",// плавность (ускорение)

      repeat: 2,         // повторить N раз (-1 = бесконечно)
      yoyo: true,        // туда-сюда (Вместо того, чтобы возвращаться к исходному состоянию, анимация будет двигаться вперед и назад)
      stagger: 0.2,      // Задержка между началом анимации каждого последующего элемента (0.2 секунды)

      // события
      onStart: () => console.log("Анимация началась!"),              // один раз в момент первого запуска анимации
      onUpdate: () => { console.log("Обновить допустим позицию") },  // вызывается на каждом кадре (тике) во время выполнения анимации
       
      onComplete: ()=>console.log("Анимация началась!"),             // один раз, когда анимация полностью завершена
      // Примечание: Для всех этих коллбэков можно передавать параметры с помощью свойств onStartParams, onUpdateParams, onCompleteParams соответственно

      transformOrigin: "left center",                                // Вращение относительно левого края
      paused: true,	                                                // Анимация создана, но не запущена

      // immediateRender: false,	// отрисовать сразу (для from-анимаций) хз для чего
   })
}, [])

// ✔ Правильный React-код (идеальный)
// GSAP придумали gsap.context(), который:
// привязывает анимации к компоненту
// автоматически очищает их при размонтировании

useLayoutEffect(() => {
   let ctx = gsap.context(() => {
      gsap.to(box4Ref.current, { x: 200 });
   });

   return () => ctx.revert(); // авто-очистка
}, [])

return (
<div className="Gsap_с">
   <div className='block box1' ref={box1Ref} >1</div>
   <div className='block box2' ref={box2Ref} >2</div>
   <div className='block box3' ref={box3Ref} onClick={() => setActive(!active)}>3 click me</div>
   <div className='block box4' ref={box4Ref} >4</div>
</div>
)}
export default Gsap_с