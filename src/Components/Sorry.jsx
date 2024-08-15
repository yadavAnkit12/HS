import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SorryGIF from "../assets/sorry.gif";

const MySwal = withReactContent(Swal);

const Sorry = () => {

  const handleButtonClick = () => {
    MySwal.fire({
      title: 'A Big Hug for You! 🤗',
      text: "Let's meet and do more and more hugssssss",
    //   imageUrl: 'https://i.imgur.com/5R9uT29.png', // Example hug image, you can replace with any hug image URL or emoji
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Hug',
      confirmButtonText: 'Aww, Thanks!',
      confirmButtonColor: '#3085d6',
      background: '#fff',
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src={SorryGIF}
        alt="Sorry GIF"
        className="w-64 h-64 animate-bounce mb-4"
      />
      <h1 className="text-3xl font-bold text-red-600 animate-pulse">
        I'm reallyyyyyy soryyyyy 😔
      </h1>
      <p className="text-center mt-4 text-lg text-gray-600">
      I know I made a mistake, and I'm truly sorry.      </p>
      <button
        onClick={handleButtonClick}
        className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Let's Meet
      </button>
    </div>
  );
};

export default Sorry;
