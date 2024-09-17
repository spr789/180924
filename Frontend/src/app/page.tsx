"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import the core Swiper CSS

const HomePage = () => {
  return (
    <div>
      {/* Swiper Carousel */}
      <div className="mb-8">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <div className="h-64 bg-blue-500 text-white flex justify-center items-center">
              <h2 className="text-3xl font-bold">Slide 1</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-64 bg-green-500 text-white flex justify-center items-center">
              <h2 className="text-3xl font-bold">Slide 2</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-64 bg-red-500 text-white flex justify-center items-center">
              <h2 className="text-3xl font-bold">Slide 3</h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Home Page Content */}
      <div>
        <h1 className="text-4xl font-bold mb-6">Welcome to My Next.js App</h1>
        <p className="text-lg mb-6">
          This is a simple homepage built with Next.js and Tailwind CSS.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold">Feature 1</h2>
            <p className="mt-2">
              Describe a cool feature of your application here.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-semibold">Feature 2</h2>
            <p className="mt-2">
              Describe another cool feature of your application here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
