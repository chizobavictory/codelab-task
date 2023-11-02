import React, { useState } from "react";
import close from "../assets/close.svg";
import FilterDropdown from "./FilterDropdown";
import { UserData } from "../hooks/userData.interface";
import useUserData from "../hooks/userData";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filteredUsers: UserData[] | null) => void;
}

const buttonLabels = ["10", "50", "100", "200", "500", "1000", "2000"];

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [transactionTypes, setTransactionTypes] = useState([
    { id: 1, text: "Age", checked: false },
    { id: 2, text: "Nationality", checked: false },
  ]);
  const [gender, setGender] = useState([
    { id: 1, text: "Male", checked: false },
    { id: 2, text: "Female", checked: false },
  ]);

  const [transactionTypesDropdownVisible, setTransactionTypesDropdownVisible] = useState(false);
  const [genderTypesDropdownVisible, setGenderTypesDropdownVisible] = useState(false);

  const toggleTransactionTypesDropdown = () => {
    setTransactionTypesDropdownVisible(!transactionTypesDropdownVisible);
  };
  const toggleGenderTypesDropdown = () => {
    setGenderTypesDropdownVisible(!genderTypesDropdownVisible);
  };

  interface Filter {
    id: number;
    text: string;
    checked: boolean;
  }

  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

  // Fetch user data using the useUserData hook.
  const numberOfResults = 100; // You can set the number of results you want to fetch.
  const userData = useUserData(numberOfResults);

  const handleApplyFilters = () => {
    // Apply filters based on selected options.
    let filteredUsers: UserData[] | null = null;

    if (userData !== null) {
      // Implement filtering logic for Age
      if (transactionTypes[0].checked) {
        filteredUsers = [...userData].sort((a, b) => a.dob.age - b.dob.age);
      }

      // Implement filtering logic for Nationality
      if (transactionTypes[1].checked) {
        filteredUsers = [...userData].sort((a, b) => a.nat.localeCompare(b.nat));
      }

      // Implement filtering logic for Gender
      if (gender[0].checked || gender[1].checked) {
        filteredUsers = userData.filter((user) => {
          return gender.some((g) => g.checked && g.text === user.gender);
        });
      }
    }

    onApplyFilters(filteredUsers);
    onClose();
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
                  <button key={index} className="p-4 bg-white rounded-full border border-gray-100 flex items-center gap-1">
                    <p className="text-neutral-900 text-sm inline-block w-full font-[degularsemibold]">{label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="h-4 text-neutral-900 text-base font-[degularsemibold] leading-normal">Filter by</p>
              <FilterDropdown
                items={transactionTypes}
                onItemCheck={(id) => {
                  const updatedItems = transactionTypes.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
                  setTransactionTypes(updatedItems);
                }}
                selectedItems={transactionTypes.filter((item) => item.checked)}
                onToggleDropdown={toggleTransactionTypesDropdown}
                dropdownVisible={transactionTypesDropdownVisible}
                buttonText="Select Filter Type"
                onSelect={(selected) => setSelectedFilters(selected)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="h-4 text-neutral-900 text-base font-[degularsemibold] leading-normal">Filter by Gender</p>
              <FilterDropdown
                items={gender}
                onItemCheck={(id) => {
                  const updatedItems = gender.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
                  setGender(updatedItems);
                }}
                selectedItems={gender.filter((item) => item.checked)}
                onToggleDropdown={toggleGenderTypesDropdown}
                dropdownVisible={genderTypesDropdownVisible}
                buttonText="Select Gender"
                onSelect={(selected) => setSelectedFilters(selected)}
              />
            </div>
          </div>
          <div className="flex justify-between gap-3 ">
            <button className="h-12 px-6 py-3 bg-white rounded-[100px] border border-gray-100 justify-center items-center w-full">Clear</button>
            <button
              onClick={handleApplyFilters}
              className="h-12 px-6 py-3 bg-neutral-900 rounded-[100px] justify-center items-center gap-2 text-white w-full"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
