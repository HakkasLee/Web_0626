"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

interface ImageInfo {
  src: string;
  location: string;
  latlng: string;
}

export default function HomeCarousel({ images }: { images: ImageInfo[] }) {
  const [current, setCurrent] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    slideChanged(s) {
      setCurrent(s.track.details.rel);
    },
  });

  const goTo = (idx: number) => {
    if (instanceRef.current) {
      instanceRef.current.moveToIdx(idx);
    }
  };

  // 轮播高度
  const carouselHeight = 'h-[60vh] md:h-[70vh] lg:h-[80vh]';

  const currentInfo = images[current] || images[0];

  return (
    <div className={`fixed top-[64px] left-0 w-screen ${carouselHeight} z-0 overflow-hidden`} style={{minWidth:'100vw'}}>
      <div ref={sliderRef} className={`keen-slider w-screen h-full`}>
        {images.map((img, idx) => (
          <div key={idx} className={`keen-slider__slide flex items-center justify-center w-screen h-full`}>
            <img
              src={img.src}
              alt={`home-bg-${idx}`}
              className="object-cover w-full h-full select-none pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
      {/* 半透明遮罩增强文字可读性 */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      {/* 左下角地理信息文字（相对背景图） */}
      <div className="absolute left-6 bottom-6 z-30 bg-black/50 text-white px-5 py-3 rounded-xl shadow-md select-none pointer-events-none">
        <div className="text-xl font-bold leading-tight">{currentInfo.location}</div>
        <div className="text-lg font-medium mt-1">{currentInfo.latlng}</div>
      </div>
      {/* 左右切换按钮absolute定位 */}
      {images.length > 1 && (
        <>
          <button
            className={`pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white/90 rounded-full p-2 shadow-md ml-4`}
            style={{height:'48px'}}
            onClick={() => goTo((current - 1 + images.length) % images.length)}
            aria-label="上一张"
            type="button"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            className={`pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white/90 rounded-full p-2 shadow-md mr-4`}
            style={{height:'48px'}}
            onClick={() => goTo((current + 1) % images.length)}
            aria-label="下一张"
            type="button"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </>
      )}
      {/* 底部小圆点指示器 */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4 flex space-x-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border border-white transition-colors duration-200 ${current === idx ? 'bg-gray-800' : 'bg-white/70'}`}
              onClick={() => goTo(idx)}
              aria-label={`跳转到第${idx + 1}张`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
} 