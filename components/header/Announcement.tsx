import { useEffect, useState } from "preact/hooks";

export interface Props {
  ads: string[];
  interval: number;
}

function Announcement({ ads = [], interval }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCurrentIndex = (prevIndex: number) => {
    return prevIndex === ads.length - 1 ? 0 : prevIndex + 1;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((
        prevIndex,
      ) => updateCurrentIndex(prevIndex));
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [ads.length, interval]);

  return (
    <>
      <div className="flex justify-center items-center bg-[#2e2e2e] w-full h-[28px] lg:hidden">
        <a
          className="text-[11px] leading-[15px] tracking-[0.55px] text-white"
          href="#"
        >
          {ads[currentIndex]}
        </a>
      </div>

      <div className="justify-around items-center bg-[#2e2e2e] w-full h-[28px] hidden lg:flex">
        {ads.map((ad, index) => (
          <a
            className="text-[11px] leading-[15px] tracking-[0.55px] text-white font-helvetica"
            href="#"
            key={index}
          >
            {ad}
          </a>
        ))}
      </div>
    </>
  );
}

export default Announcement;

{
  /* <div className="flex justify-around items-center bg-[#2e2e2e] w-full h-[28px]">
{ads.map((ad, index) => (
  <a
    className="text-[11px] leading-[15px] tracking-[0.55px] text-white font-helvetica"
    href="#"
    key={index}
  >
    {ad}
  </a>
))}
</div> */
}
