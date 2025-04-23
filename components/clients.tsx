import Image from "next/image";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {  testimonials } from "@/data";

export const Clients = () => {
  type ImageItem = {
    id: number;
    img: string;
  };

  const arr: ImageItem[] = [
    {
      id: 1,
      img: "/deo.svg",
    },
    {
      id: 2,
      img: "/adobe-2.svg",
    },
    {
      id: 3,
      img: "/moto.svg",
    },
    {
      id: 4,
      img: "/CGI_logo.svg",
    },
    {
      id: 5,
      img: "/flo.svg",
    },
    { 
      id: 6,
      img: "/gen.svg",
    },
  ];

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from <span className="text-purple">satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="relative flex h-[50vh] flex-col items-center justify-center overflow-hidden rounded-md antialiased md:h-[30rem]">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 max-lg:mt-10 md:gap-16">
  {arr.map(({ id, img }) => (
    <div key={id} className="flex max-w-100 gap-4 md:max-w-60">
      <Image
        height={100}
        width={120}
        src={img}
        alt="company logo"
        className="w-25 md:w-20"
      />
    </div>
  ))}
</div>

      </div>
    </section>
  );
};
