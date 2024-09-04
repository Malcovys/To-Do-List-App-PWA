import { MagicCard } from "../magicui/magic-card";

const Card: React.FC<{text:string}> = ({text}) => {
  return (
    <div className="flex h-12 w-full">
        <MagicCard
            className="bg-white cursor-pointer flex-col items-center justify-center shadow-lg whitespace-nowrap"
            gradientColor={"#D9D9D955"}
        >
            {text}
        </MagicCard>
    </div>
  );
};

export default Card;