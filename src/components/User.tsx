import React, { useState } from "react";
import expand from "../assets/expand_more.svg";
import useUserData from "../hooks/userData";
import FilterModal from "./Modal";
import { UserData } from "../hooks/userData.interface";
import UserCard from "./UserCard";
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
  const [filteredUsersByGender, setfilteredUsersByGender] = useState<UserData[] | null>(null);
  const [selectedGenderFilters, setSelectedGenderFilters] = useState<GenderFilter[]>([
    { id: 1, text: "male", checked: false },
    { id: 2, text: "female", checked: false },
  ]);

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
      const nationalitySorted = [...userData].sort((a, b) => {
        if (a.nat < b.nat) return -1;
        if (a.nat > b.nat) return 1;
        return 0;
      });

      setFilteredUsersByAge(nationalitySorted);
    }
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    setFilteredUsersByAge(null);
  };

  const handleGenderSelect = (selectedGenders: GenderFilter[]) => {
    setSelectedGenderFilters(selectedGenders);
    const filteredUsersByGender =
      filteredData?.filter((user) => {
        if (selectedGenders.length === 0) {
          return true;
        } else {
          return selectedGenders.some((filter) => filter.checked && filter.text === user.gender);
        }
      }) || null;
    setfilteredUsersByGender(filteredUsersByGender);
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
            onChange={(e) => handleSearchQueryChange(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full border-t mt-4 border-gray-300" />
      <div className="flex flex-col gap-4 pt-6">
        {((filteredUsersByAge  || filteredUsersByGender) || filteredData) !== null
          ? [...(filteredUsersByAge || []), ...(filteredUsersByGender || []), ...(filteredData || [])].map((user, index) => (
              <UserCard key={index} user={user} />
            ))
          : "Loading..."}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        onSetNumberOfResults={handleSetNumberOfResults}
        onFilterByAge={handleFilterByAge}
        onFilterByNationality={handleFilterByNationality}
        selectedGenderFilters={selectedGenderFilters}
        setSelectedGenderFilters={handleGenderSelect}
      />
    </div>
  );
};

export default User;
