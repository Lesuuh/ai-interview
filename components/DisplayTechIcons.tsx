import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcon = await getTechLogos(techStack);
  console.log(techIcon);
  return (
    <div className="flex flex-row ">
      {techIcon.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={index}
          className={cn(
            "relative group bg-dark-300 rounded-full flex-center p-2",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            alt="tech"
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
