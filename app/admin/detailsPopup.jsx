// DetailsPopup.jsx
import { useEffect } from "react";

const riskList = [
  "Вечная мерзлота",
  "Вулканы",
  "Землетрясения",
  "Наводнения",
  "Риск оползней",
  "Пожары",
  "Терроризм",
  "Удары молнии",
  "Циклоны",
  "Засухи",
  "Экстремальные погодные явления",
  "Загрязнение воздуха",
  "Вырубка лесов",
  "Дефицит воды",
  "Вспышки заболеваний",
];

const calculateProbabilityLevels = (item) => {
  const levels = {};
  riskList.forEach((risk) => {
    // Simple logic to assign probability levels based on item data
    levels[risk] = Math.floor(Math.random() * 4) + 1;
  });
  return levels;
};

const DetailsPopup = ({ item, onClose }) => {
  const probabilityLevels = calculateProbabilityLevels(item);

  useEffect(() => {
    // Prevent background scrolling when popup is open
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const getColorClass = (level, current) => {
    if (level === current) {
      switch (current) {
        case 1:
          return "border border-black bg-green-200";
        case 2:
          return "border border-black bg-yellow-200";
        case 3:
          return "border border-black bg-orange-200";
        case 4:
          return "border border-black bg-red-200";
        default:
          return "";
      }
    } else {
      switch (current) {
        case 1:
          return "bg-green-200";
        case 2:
          return "bg-yellow-200";
        case 3:
          return "bg-orange-200";
        case 4:
          return "bg-red-200";
        default:
          return "";
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-3/4 max-w-3xl p-5 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <div className="flex items-center space-x-4">
          <img
            src="/item-placeholder.png"
            alt="Placeholder"
            className="w-24 h-24"
          />
          <div>
            <h2 className="text-2xl font-bold">{item.Name}</h2>
            <p className="text-gray-600">
              {item["Industry Type"] || item.Type}
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-y-auto max-h-96">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border p-2">Риск</th>
                <th className="border p-2">Вероятность</th>
              </tr>
            </thead>
            <tbody>
              {riskList.map((risk) => (
                <tr key={risk}>
                  <td className="border p-2">{risk}</td>
                  <td className="border p-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-6 h-6 ${getColorClass(
                            probabilityLevels[risk],
                            level
                          )} mx-0.5`}
                        ></div>
                      ))}
                      <span className="ml-2">{probabilityLevels[risk]}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailsPopup;
