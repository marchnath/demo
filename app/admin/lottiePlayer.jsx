import { Player } from "@lottiefiles/react-lottie-player";

export const Circles = ({ width = 100, height = 100, speed = 1 }) => {
  return (
    <Player
      src="https://lottie.host/6385cd6c-fb7d-4dd7-9e94-981d4112931b/wJ7AWhdCFz.json"
      className="player"
      loop
      autoplay
      speed={speed}
      style={{ width, height }}
      background="transparent"
    />
  );
};

export const Cloud = ({ width = 100, height = 100, speed = 1 }) => {
  return (
    <Player
      src="https://lottie.host/451c4e92-5742-4392-8f29-488ff7954ac0/238usmHSsg.json" // Animation JSON URL
      className="player"
      loop
      autoplay
      speed={speed}
      style={{ width, height }}
      controls
      direction={1}
      mode="normal"
      background="transparent"
    />
  );
};

export const Cloud2 = ({ width = 100, height = 100, speed = 1 }) => {
  return (
    <Player
      src="https://lottie.host/5f11913c-2330-4f32-b00d-1f333b791a47/cp7967rjiW.json"
      className="player"
      loop
      autoplay
      speed={speed}
      style={{ width, height }}
      controls
      direction={1}
      mode="normal"
      background="transparent"
    />
  );
};
export const Explode = ({ width = 400, height = 400, speed = 1 }) => {
  return (
    <Player
      src="https://lottie.host/bc241747-b96f-4b8d-837a-3c8d925838a4/b7L9PhVThy.json"
      className="player"
      loop
      autoplay
      speed={speed}
      style={{ width, height }}
      controls
      direction={1}
      mode="normal"
      background="transparent"
    />
  );
};

import Image from "next/image";

export const Images = () => {
  return <Image src="/oil.png" width={200} height={200} alt="oil" />;
};

import { FaCircle } from "react-icons/fa";
import { SiGoogleassistant } from "react-icons/si";
import { HiMiniRectangleGroup } from "react-icons/hi2";

export const Icons = ({ index = 0 }) => {
  const icons = [
    <SiGoogleassistant className="text-red-500" />,

    <HiMiniRectangleGroup className="text-yellow-300" />,
  ];

  const selectedIcon = icons[index % icons.length];

  return (
    <div className="text-2xl flex">
      {[...Array(3)].map((_, i) => (
        <div>
          {" "}
          <span key={i}>{selectedIcon}</span>
          <span key={i}>{selectedIcon}</span>
        </div>
      ))}
    </div>
  );
};

export const riskIndicators = {
  // Ecological risks
  Загрязнение: { type: "lottie", component: Circles },
  "Изменение климата": { type: "lottie", component: Cloud },
  Перелов: { type: "image", src: "/water.png" },
  Индустриализация: { type: "lottie", component: Explode },
  "Природные катастрофы": { type: "lottie", component: Cloud2 },
  Болезни: { type: "icon", component: SiGoogleassistant },
  "Засухи и нехватка воды": { type: "image", src: "/water.png" },
  "Лесные пожары": { type: "lottie", component: Explode },

  // Social risks
  "Экономическое неравенство": { type: "icon", component: FaCircle },
  "Политическая нестабильность": {
    type: "icon",
    component: HiMiniRectangleGroup,
  },
  "Миграция и демографическое давление": { type: "image", src: "/cloud2.png" },
  "Образование и осведомленность": { type: "image", src: "/oil.png" },
};
