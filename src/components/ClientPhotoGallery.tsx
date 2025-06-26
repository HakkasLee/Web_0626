"use client";

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Photo = {
  src: string;
  exif: {
    focalLength: string | null;
    fNumber: string | null;
    exposureTime: string | null;
    iso: number | null;
    model: string | null;
  } | null;
  desc?: string;
};

type Props = {
  photos: Photo[];
};

const ClientPhotoGallery = ({ photos }: Props) => {
  const [index, setIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(12);

  if (!photos || photos.length === 0) {
    return <p className="text-center text-gray-500">未能加载图片，或目录为空。</p>;
  }

  const showMore = () => setVisibleCount((c) => c + 12);

  return (
    <>
      <div className="masonry-gallery">
        {photos.slice(0, visibleCount).map((photo, idx) => (
          <div 
            key={idx} 
            className="masonry-item mb-4 break-inside-avoid group relative rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => setIndex(idx)}
          >
            <Image
              src={photo.src}
              alt={`Photography ${idx + 1}`}
              width={500}
              height={700}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              priority={idx < 8}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {photo.exif && (
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md">
                <p className='truncate font-semibold flex items-center gap-1'>
                  {/* 相机icon */}
                  <svg className="inline w-4 h-4 mr-1 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  {photo.exif.model}
                </p>
                <div className='flex flex-wrap justify-between items-center pt-1 gap-x-2 gap-y-1 text-[13px]'>
                  <span className="flex items-center gap-0.5">
                    {/* 镜头icon */}
                    <svg className="inline w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                    {photo.exif.focalLength}
                  </span>
                  <span className="flex items-center gap-0.5">
                    {/* 光圈icon */}
                    <svg className="inline w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
                    {photo.exif.fNumber}
                  </span>
                  <span className="flex items-center gap-0.5">
                    {/* 快门icon */}
                    <svg className="inline w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16"/></svg>
                    {photo.exif.exposureTime}
                  </span>
                  <span className="flex items-center gap-0.5">
                    {/* ISO icon */}
                    <svg className="inline w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M9 14h.01M12 10h.01M15 14h.01M18 10h.01"/></svg>
                    ISO {photo.exif.iso}
                  </span>
                </div>
                {photo.desc && (
                  <div className="mt-1 text-[13px] text-gray-200 font-normal truncate">{photo.desc}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {visibleCount < photos.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow font-semibold transition"
          >
            Show More
          </button>
        </div>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
        render={{
          slide: ({ slide }) => {
            const photo = slide as Photo;
            return (
              <div className="flex flex-row items-center justify-center w-full h-full px-4 md:px-12">
                <div className="flex flex-row items-center justify-center mx-auto">
                  <div className="flex-1 flex items-center justify-end bg-black">
                    <img
                      src={photo.src}
                      alt={photo.desc || 'photo'}
                      className="max-h-[80vh] max-w-full object-contain mx-0"
                      style={{ background: '#222' }}
                    />
                  </div>
                  <div className="w-[320px] max-w-[80vw] h-full flex flex-col justify-center bg-black bg-opacity-80 text-white p-5 md:p-6 text-sm shadow-xl ml-2 md:ml-6">
                    {photo.exif && (
                      <>
                        <p className='truncate font-semibold flex items-center gap-1 mb-2'>
                          {/* 相机icon */}
                          <svg className="inline w-5 h-5 mr-1 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          {photo.exif.model}
                        </p>
                        <div className='flex flex-wrap justify-between items-center gap-x-2 gap-y-2 text-[15px] mb-2'>
                          <span className="flex items-center gap-1">
                            {/* 镜头icon */}
                            <svg className="inline w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                            {photo.exif.focalLength}
                          </span>
                          <span className="flex items-center gap-1">
                            {/* 光圈icon */}
                            <svg className="inline w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
                            {photo.exif.fNumber}
                          </span>
                          <span className="flex items-center gap-1">
                            {/* 快门icon */}
                            <svg className="inline w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16"/></svg>
                            {photo.exif.exposureTime}
                          </span>
                          <span className="flex items-center gap-1">
                            {/* ISO icon */}
                            <svg className="inline w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M9 14h.01M12 10h.01M15 14h.01M18 10h.01"/></svg>
                            ISO {photo.exif.iso}
                          </span>
                        </div>
                        {photo.desc && (
                          <div className="mt-2 text-[15px] text-gray-200 font-normal break-words">{photo.desc}</div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          },
        }}
      />
    </>
  );
};

export default ClientPhotoGallery; 