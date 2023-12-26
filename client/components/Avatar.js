import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = createClientComponentClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        if (path.startsWith('https://')) {
          setAvatarUrl(path); 
        } else {
          const { data, error } = await supabase.storage
            .from('avatars')
            .download(path);
          if (error) throw error;
          const url = URL.createObjectURL(data);
          setAvatarUrl(url);
        }
      } catch (error) {
        console.error('Error downloading image:', error.message);
      }
    }
    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full"
          width={size}
          height={size}
        />
      ) : (
        <div
          className="bg-gray-200 rounded-full"
          style={{ height: size, width: size }}
        >
          <span className="text-gray-500 text-sm">Pas d&apos;image</span>
        </div>
      )}
      <div className="mt-4">
        <label
          htmlFor="single"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${
            uploading ? 'opacity-50' : ''
          }`}
        >
          {uploading ? 'Modification en cours ...' : 'Charger une image'}
        </label>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="hidden"
        />
      </div>
    </div>
  );
}
