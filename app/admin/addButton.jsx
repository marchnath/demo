import React, { useState } from "react";
import { Plus, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleOrganisationData, sampleFacilityData } from "./data";
import { organisationFields, facilityFields } from "./data";
import { FaPlus } from "react-icons/fa6";

export default function AddButton() {
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState([{}]);
  const [savedData, setSavedData] = useState({
    Organisation: [],
    Facility: [],
  });

  const openForm = (type) => {
    setFormType(type);
    setFormData([{}]);
  };

  const closeForm = () => {
    setFormType(null);
  };

  const handleInputChange = (rowIndex, field, value) => {
    const newData = [...formData];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };

    // Add new row if name is being filled in last row
    if (field === "Name" && value && rowIndex === formData.length - 1) {
      newData.push({});
    }

    setFormData(newData);
  };

  const useExampleData = () => {
    const sampleData =
      formType === "Предприятие" ? sampleOrganisationData : sampleFacilityData;
    setFormData([...sampleData, {}]); // Add empty row at end
  };

  const saveData = () => {
    const validData = formData.filter((row) => Object.keys(row).length > 0);
    setSavedData((prev) => ({
      ...prev,
      [formType]: [...prev[formType], ...validData],
    }));
    closeForm();
  };

  const fields =
    formType === "Предприятие" ? organisationFields : facilityFields;

  return (
    <div className="relative min-h-screen">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className=" bg-white hover:bg-slate-200">
          <Button className="fixed bottom-4 font-bold  text-black right-28 rounded-lg w-20 h-20 p-0">
            <FaPlus className="text-2xl font-bold " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => openForm("Предприятие")}
            className="text-2xl p-4"
          >
            Предприятие
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => openForm("Оборудование")}
            className="text-2xl p-4"
          >
            Оборудование
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {formType && (
        <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{formType} Форма</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={useExampleData}>
                  Использовать пример
                </Button>
                <Button variant="default" onClick={saveData}>
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить
                </Button>
                <Button variant="ghost" size="icon" onClick={closeForm}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="flex-grow p-4">
              <ScrollArea className="h-[calc(90vh-8rem)] w-full rounded-md border">
                <div className="p-4">
                  <table className="w-max border-collapse">
                    <thead>
                      <tr>
                        {Object.keys(fields).map((field) => (
                          <th key={field} className="border p-2 bg-gray-50">
                            {field}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {formData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.entries(fields).map(([field, config]) => (
                            <td key={field} className="border p-2">
                              {config.type === "select" ? (
                                <Select
                                  value={row[field] || ""}
                                  onValueChange={(value) =>
                                    handleInputChange(rowIndex, field, value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={config.placeholder}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {config.options.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <input
                                  type={config.type}
                                  value={row[field] || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      rowIndex,
                                      field,
                                      e.target.value
                                    )
                                  }
                                  placeholder={config.placeholder}
                                  className="w-full min-w-[200px] p-1 border rounded"
                                />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
