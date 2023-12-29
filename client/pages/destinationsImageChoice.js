import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

const ImageUploader = () => {
  const router = useRouter();
  const { id } = router.query;

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      const { data, error } = await supabase.storage
        .from('image_article')
        .upload(`images/${selectedImage.name}`, selectedImage);

      if (error) {
        console.error('Error uploading image:', error.message);
      } else {
        console.log('Image uploaded successfully:', data);

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/image_article/images/${selectedImage.name}`;

        const { data: updateData, error: updateError } = await supabase
          .from('articles')
          .update({ image: imageUrl })
          .eq('id', id)
          .single();

        if (updateError) {
          console.error(
            'Error updating database with image URL:',
            updateError.message,
          );
        } else {
          console.log('Database updated with image URL:', updateData);
          router.push('/destinations');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">
          Ajouter une image à votre destination
        </h2>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          className="bg-customBlue hover:bg-customBlueGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleImageUpload}
        >
          Ajout de votre article
        </button>
      </section>
    </div>
  );
};

export default ImageUploader;
