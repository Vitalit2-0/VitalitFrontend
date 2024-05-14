
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { FaCirclePlay } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

export default function SliderHelper({ items } : { items: any[] }) {
    const [slidesPerPage, setSlidesPerPage] = useState(2);
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1280) {
                setSlidesPerPage(1);
            }
            else {
                setSlidesPerPage(2);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
        <Swiper
            slidesPerView={slidesPerPage}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            allowSlideNext={true}
            allowSlidePrev={true}
            modules={[Pagination]}
            className="mySwiper"
        >
            {
                items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div key={index} className="w-full h-full flex flex-col items-center">
                            <div className="w-full h-full relative rounded-xl overflow-hidden choose-workout-card">
                                <div className={`flex w-full h-full cursor-pointer justify-center items-center rounded-xl absolute bottom-0 right-0 left-0 px-5 bg-[rgba(163,100,219,0.8)]`}>
                                    <div className={`text-white gap-5 justify-center items-center choose-workout-card_info`}>
                                        <a className="mr-5" href={item.url} target='_blank' >
                                            <FaCirclePlay className="text-white text-5xl cursor-pointer" />
                                        </a>
                                    </div>
                                    <h2 className="text-white text-md text-left">{item.name}</h2>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        </>
    );
}
