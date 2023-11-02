import React from "react";

interface FilterDropdownProps {
  items: { id: number; text: string; checked: boolean }[];
  onItemCheck: (id: number) => void;
  onSelect: (selected: { id: number; text: string; checked: boolean }[]) => void;
  selectedItems: { id: number; text: string; checked: boolean }[];
  onToggleDropdown: () => void;
  dropdownVisible: boolean;
  buttonText: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  items,
  onItemCheck,
  onSelect,
  selectedItems,
  onToggleDropdown,
  dropdownVisible,
  buttonText,
}) => {
  const handleItemClick = (item: { id: number; text: string; checked: boolean }) => {
    const updatedSelectedItems = [...selectedItems];
    const index = updatedSelectedItems.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      updatedSelectedItems[index] = { ...item, checked: !item.checked };
    } else {
      updatedSelectedItems.push(item);
    }
    onSelect(updatedSelectedItems);
    onItemCheck(item.id);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={onToggleDropdown}
        className="h-12 bg-white rounded-md px-4 py-2 text-sm border-neutral-900 border-2 font-[degularsemibold] justify-center text-center w-full"
      >
        {selectedItems.length === 0 ? buttonText : selectedItems.map((item) => item.text).join(", ")}
      </button>
      {dropdownVisible && (
        <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-center px-4 py-2 cursor-pointer text-base font-[degularsemibold]">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-neutral-900"
                  checked={item.checked}
                  onChange={() => handleItemClick(item)} // Use the new function
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
