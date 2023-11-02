import React, { useState } from "react";
import close from "../assets/close.svg";
import FilterDropdown from "./FilterDropdown";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetNumberOfResults: (number: number) => void;
  onFilterByAge: () => void;
  onFilterByNationality: () => void;
  selectedGenderFilters: GenderFilter[];
  setSelectedGenderFilters: (selectedGenderFilters: GenderFilter[]) => void;
}

interface GenderFilter {
  id: number;
  text: string;
  checked: boolean;
}

const buttonLabels = ["10", "50", "100", "200", "500", "1000", "2000"];

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onSetNumberOfResults,
  onFilterByAge,
  onFilterByNationality,
  selectedGenderFilters,
  setSelectedGenderFilters,
}) => {
  const [genderDropdown, setGenderDropdown] = useState(false);

  const toggleGenderTypesDropdown = () => {
    setGenderDropdown(!genderDropdown);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
      <div className="fixed inset-0 bg-gray-400 opacity-50 z-10" onClick={onClose}></div>
      <div
        className={`fixed top-2 right-2 w-[420px] h-[97.5%] rounded-[20px] bg-white shadow-2xl transform z-20 animate-slide-in-slow ${
          isOpen ? "" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between p-4 h-full">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-[degularsemibold] text-neutral-900">Filter</h2>
              <button onClick={onClose} className="hover:bg-gray-200 rounded-full">
                <img src={close} alt="close" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="h-4 text-neutral-900 text-base font-[degularsemibold] leading-normal">Select number of users</p>
              <div className="flex h-9 gap-3 overflow-x-auto w-full">
                {buttonLabels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => onSetNumberOfResults(parseInt(label))}
                    className={`p-4 rounded-full border border-gray-100 flex items-center gap-1 
        hover:bg-gray-200 "bg-neutral-900 text-white" : "bg-white text-neutral-900"}`}
                  >
                    <p className="text-sm inline-block w-full font-[degularsemibold]">{label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="h-4 text-neutral-900 text-base font-[degularsemibold] leading-normal">Filter by</p>
              <div className="flex justify-between gap-3">
                <button
                  className="p-4 rounded-full w-full border border-neutral-900 items-center
        hover:bg-gray-200 bg-white text-neutral-900"
                  onClick={() => onFilterByAge()}
                >
                  Age
                </button>
                <button className="w-full border border-neutral-900 rounded-full p-4 hover:bg-gray-200" onClick={() => onFilterByNationality()}>
                  Nationality
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="h-4 text-neutral-900 text-base font-[degularsemibold] leading-normal">Filter by Gender</p>
              <FilterDropdown
                items={selectedGenderFilters} 
                onItemCheck={(id) => {
                  const updatedItems = selectedGenderFilters.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
                  console.log(selectedGenderFilters);
                  setSelectedGenderFilters(updatedItems);
                  setSelectedGenderFilters(updatedItems); // Update selected gender filters in the parent
                }}
                selectedItems={selectedGenderFilters.filter((item) => item.checked)}
                onToggleDropdown={toggleGenderTypesDropdown}
                dropdownVisible={genderDropdown}
                buttonText="Select Gender"
                onSelect={(selected) => setSelectedGenderFilters(selected)} // Update selected gender filters in the parent
              />
            </div>
          </div>
          <div className="flex justify-between gap-3 ">
            <button className="h-12 px-6 py-3 bg-white rounded-[100px] border border-gray-100 justify-center items-center w-full">Clear</button>
            <button className="h-12 px-6 py-3 bg-neutral-900 rounded-[100px] justify-center items-center gap-2 text-white w-full">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
