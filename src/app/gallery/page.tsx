"use client";
import { useEffect, useState } from 'react';
import ClientPhotoGallery from '@/components/ClientPhotoGallery';

const GalleryPage = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/Web_0626/gallery.json')
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>
      {loading ? (
        <div className="text-center text-gray-400 py-12">图片加载中…</div>
      ) : (
      <ClientPhotoGallery photos={photos} />
      )}
    </div>
  );
};

export default GalleryPage; 