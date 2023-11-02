import React, { useState } from "react";
import expand from "../assets/expand_more.svg";
import useUserData from "../hooks/userData";
import FilterModal from "./Modal";
import { UserData } from "../hooks/userData.interface";

const User: React.FC = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const openFilterModal = () => {
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  const userData = useUserData(20);
  const totalUser = userData ? userData.length : 0;

  const applyFilters = (filteredData: UserData[] | null) => {
    setSelectedFilters(filteredData ? filteredData.map((user) => user.gender) : []);
  };

  const applyFiltersToUserData = (data: UserData[] | null, filters: string[]): UserData[] | null => {
    if (data === null) {
      return null;
    }

    let filteredUserData = [...data];

    if (filters.includes("Age")) {
      filteredUserData = filteredUserData.sort((a, b) => a.dob.age - b.dob.age);
    }

    if (filters.includes("Nationality")) {
      filteredUserData = filteredUserData.sort((a, b) => a.nat.localeCompare(b.nat));
    }

    if (filters.includes("Male") || filters.includes("Female")) {
      filteredUserData = filteredUserData.filter((user) => filters.includes(user.gender));
    }

    return filteredUserData;
  };

  const filteredUserData = applyFiltersToUserData(userData, selectedFilters);

  return (
    <div className="flex flex-col pt-10">
      <div className="flex justify between">
        <div className="text-neutral-900 flex flex-col gap-1">
          <p className="font-[degularbold] text-2xl">{totalUser} Users</p>
          <p className="font-[degularmedium] text-gray-600">Number of selected Users</p>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-gray-100 text-neutral-900 p-4 items-center flex gap-2 rounded-full font-[degularsemibold] h-12"
            onClick={openFilterModal}
          >
            Filter
            <img src={expand} alt="expand" />
          </button>
          <input
            className="bg-gray-100 text-neutral-900 p-4 items-center flex gap-2 rounded-full font-[degularsemibold] h-12"
            placeholder="Search users"
          />
        </div>
      </div>
      <div className="w-full border-t mt-4 border-gray-300" />
      <div className="flex flex-col gap-4 pt-6">
        {filteredUserData !== null
          ? filteredUserData.map((user, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">{/* Add the appropriate gender image */}</div>
                  <div className="flex flex-col gap-1">
                    <p className="text-neutral-900 text-base font-[degularmedium]">{`${user.name.first} ${user.name.last}`}</p>
                    <p className="text-gray-600 text-sm font-[degularmedium]">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <p className="text-base font-[degularbold] text-neutral-900">{`Age: ${user.dob.age}`}</p>
                  <p className="text-sm font-[degularmedium] text-gray-600">{user.nat}</p>
                </div>
              </div>
            ))
          : "Loading..."}
      </div>{" "}
      <FilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} onApplyFilters={applyFilters} />
    </div>
  );
};

export default User;
