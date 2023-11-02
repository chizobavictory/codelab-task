import React, { useState } from "react";
import expand from "../assets/expand_more.svg";
import useUserData from "../hooks/userData";
import FilterModal from "./Modal";
import { UserData } from "../hooks/userData.interface";
import male from "../assets/gender-male.svg";
interface GenderFilter {
  id: number;
  text: string;
  checked: boolean;
}
const User: React.FC = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [numberOfResults, setNumberOfResults] = useState(10);
  const [filteredUsersByAge, setFilteredUsersByAge] = useState<UserData[] | null>(null);
  const [, setSelectedGender] = useState<GenderFilter[]>([
    { id: 1, text: "Male", checked: false },
    { id: 2, text: "Female", checked: false },
  ]);
  const handleGenderSelect = (selectedGenders: GenderFilter[]) => {
    setSelectedGender(selectedGenders);
  };

  const openFilterModal = () => {
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  const userData = useUserData(numberOfResults);
  const totalUser = userData ? userData.length : 0;

  let filteredData: UserData[] | null = null;
  

  const handleSetNumberOfResults = (number: number) => {
    setNumberOfResults(number);
  };

  if (userData !== null) {
    filteredData = userData.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  const handleFilterByAge = () => {
    if (userData !== null) {
      const ageRange = [...userData].sort((a, b) => a.dob.age - b.dob.age);
      console.log(ageRange);
      setFilteredUsersByAge(ageRange);
    }
  };

  const handleFilterByNationality = () => {
    if (userData !== null) {
      // Sort users by nationality in ascending order
      const nationalitySorted = [...userData].sort((a, b) => {
        if (a.nat < b.nat) return -1;
        if (a.nat > b.nat) return 1;
        return 0;
      });

      setFilteredUsersByAge(nationalitySorted);
    }
  };

  return (
    <div className="flex flex-col pt-10">
      <div className="flex justify-between items-center">
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full border-t mt-4 border-gray-300" />
      <div className="flex flex-col gap-4 pt-6">
        {filteredUsersByAge !== null
          ? filteredUsersByAge.map((user, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex gap-2">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <img src={male} alt="male" />
                  </div>
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
          : filteredData !== null
          ? filteredData.map((user, index) => (
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
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onSetNumberOfResults={handleSetNumberOfResults}
        onFilterByAge={handleFilterByAge}
        onFilterByNationality={handleFilterByNationality}
        onGenderSelect={handleGenderSelect}
      />
    </div>
  );
};

export default User;
