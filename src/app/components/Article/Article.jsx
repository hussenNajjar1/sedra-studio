'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import React from 'react';
import { cairo100, cairo200 } from '../../../../fonts';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/article',{ cache: 'no-store' });
        const data = await res.json();
        if (res.ok) {
          setArticles(data.articles);
        } else {
          console.error('Error fetching articles:', data.message);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className='container mx-auto mt-16' id='Article'>
      <h1 className={`text-center color-title text-3xl py-20 ${cairo200.className}`}>المقالات</h1>
      <div className='flex justify-center items-center flex-wrap'>
        {articles.map((article) => (
          <div key={article._id} className="item w-[400px] rounded-[25px] bg-article m-3 overflow-hidden">
            <div className="item_head bg-article flex justify-end items-center rounded-[25px]">
              <div className="text">
                <p className={`${cairo200.className} text-article text-2xl`}>استديو سدرة</p>
              </div>
              <div className='head-article rounded-full w-[70px] ml-5 m-2'>
                <Image src='/images/png/img4.png' alt='Profile' width={70} height={70} className='p-3' />
              </div>
            </div>
            <div className="item_body">
              <div className='flex justify-center items-center flex-col'>
                <p className={`text-xl text-right px-4 py-2 ${cairo100.className} flex-grow`}>
                  {article.description}
                </p>
                <div className='rounded-md w-full h-[350px]'>
                  <Image src={article.imageUrl} alt='Article Image' width={400} height={350} className='rounded-md w-full h-full' />
                </div>
                <div className='footer-article flex justify-between items-center w-full px-3 py-2 rounded-b-[25px]'>
                  <Image src='/images/svg/save.svg' alt='save' width={30} height={30} />
                  <Image src='/images/svg/comments 6.svg' alt='comments' width={30} height={30} />
                  <Image src='/images/svg/Vector.svg' alt='share' width={30} height={30} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
