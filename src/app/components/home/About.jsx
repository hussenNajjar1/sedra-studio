import React from 'react';
import Image from 'next/image';
import { cairo100,cairo200 } from '../../../../fonts';

const About = () => {
  return (
    <div id='about'>
      <div className="about container mx-auto flex flex-col md:flex-row justify-between items-center p-8">
        <div className="text text-center md:text-right md:flex-1 md:order-1 mb-8 md:mb-0 pr-3 text-blue-500 font-bold">
          <h1 className={`${cairo200.className} text-2xl  color-title  md:text-3xl font-bold mb-4 text-customPurple pb-16`}>نبذة عن استديو سدرة</h1>
          <p className={`leading-relaxed mb-4 text-xl text-white ${cairo100.className}`}>مرحبًا بكم في استديو سدرة، وجهتكم المثالية لخدمات التصوير الاحترافية. نحن متخصصون في تقديم أروع اللحظات بلمسة فنية لا تُنسى. سواء كنت تبحث عن توثيق يوم زفافك، جلسة تصوير شخصية، أو حفلة عيد ميلاد مليئة بالذكريات، فإن فريقنا المحترف هنا لضمان حصولك على أفضل تجربة تصوير. بالإضافة إلى ذلك، نقدم خدمات تصميم وطباعة كروت الأعراس والمطبوعات، مع توفير حلول تسويقية مخصصة لمساعدتك على الارتقاء بأعمالك.</p>
        </div>
        <div className="image md:order-2">
          <Image src="/images/png/img2.png" alt="image" className="w-[350px] rounded-lg" width={350} height={350} />
        </div>
      </div>
    </div>
  );
}

export default About;
