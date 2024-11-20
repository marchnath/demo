"use client";

import { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
import { useRisk } from "./riskContext";

const ecologicalRisks = [
  {
    category: "Экологические",
    items: ["Загрязнение", "Изменение климата", "Перелов", "Индустриализация"],
  },
  {
    category: "Природные",
    items: [
      "Природные катастрофы",
      "Болезни",
      "Засухи и нехватка воды",
      "Лесные пожары",
    ],
  },
];

const socialRisks = {
  category: "Социальные",
  items: [
    "Экономическое неравенство",
    "Политическая нестабильность",
    "Миграция и демографическое давление",
    "Образование и осведомленность",
  ],
};

export default function RiskSelect() {
  const { selectedRisks, setSelectedRisks } = useRisk();
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  const handleRiskSelection = (risk) => {
    if (isMultiSelect) {
      // Toggle risk in selectedRisks array
      setSelectedRisks((prevRisks) =>
        prevRisks.includes(risk)
          ? prevRisks.filter((r) => r !== risk)
          : [...prevRisks, risk]
      );
    } else {
      // Single selection mode
      setSelectedRisks([risk]);
    }
  };

  return (
    <div className="w-full z-10 max-w-md mx-auto p-4 space-y-4 fixed left-4 top-20 bg-white opacity-95 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center cursor-pointer">
          <span className="mr-2 font-bold">Множественный выбор</span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isMultiSelect}
              onChange={() => setIsMultiSelect(!isMultiSelect)}
            />
            <div
              className={`block bg-gray-600 w-14 h-8 rounded-full ${
                isMultiSelect ? "bg-green-400" : ""
              }`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                isMultiSelect ? "transform translate-x-6" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>

      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className="inline-flex justify-between w-full px-4 py-2  font-medium text-white bg-black bg-opacity-90 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Экологические риски
          <ChevronDown
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
        <Menu.Items className="absolute z-20 right-0 w-full mt-2 origin-top-right bg-black bg-opacity-90 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {ecologicalRisks.map((riskGroup, groupIndex) => (
            <div key={groupIndex} className="px-1 py-1">
              {riskGroup.items.map((risk, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-white"
                      } group flex rounded-md items-center w-full px-2 py-2`}
                      onClick={() => handleRiskSelection(risk)}
                    >
                      {selectedRisks.includes(risk) && (
                        <Check className="w-5 h-5 mr-2" aria-hidden="true" />
                      )}
                      {risk}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          ))}
        </Menu.Items>
      </Menu>

      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className="inline-flex justify-between w-full px-4 py-2 font-medium text-white bg-black bg-opacity-90 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Социальные риски
          <ChevronDown
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-black bg-opacity-90 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {socialRisks.items.map((risk, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2 `}
                    onClick={() => handleRiskSelection(risk)}
                  >
                    {selectedRisks.includes(risk) && (
                      <Check className="w-5 h-5 mr-2" aria-hidden="true" />
                    )}
                    {risk}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Выбранные риски:</h3>
        <ul className="list-disc pl-5">
          {selectedRisks.map((risk, index) => (
            <li key={index}>{risk}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
