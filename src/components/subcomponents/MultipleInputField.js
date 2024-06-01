import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { CategoriesService } from "../../services/Categories";

const MultiSelectDropdown = ({ options, label }) => {
  //Categories start
  const [categoriesDropdown, setCategoriesDropdown] = useState([]);
  const getCategoriesDropdown = async () => {
    try {
      const res = await CategoriesService.getAllCategories();
      if (res.data?.length > 0) {
        setCategoriesDropdown(res.data);
      } else {
        setCategoriesDropdown([]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getCategoriesDropdown();
  }, []);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  //Categories end
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Categories
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Form>
          {categoriesDropdown.map((i, index) => (
            <Form.Check
              key={i.id}
              type="checkbox"
              id={i.id}
              label={i.category}
              checked={selectedOptions.includes(i)}
              onChange={() => handleCheckboxChange(i)}
            />
          ))}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Example usage
const options = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
  { value: 3, label: "Option 3" },
];

const MultipleInputField = () => {
  return (
    <div className="App">
      <MultiSelectDropdown //options={options}
        label="Select Options"
      />
    </div>
  );
};

export default MultipleInputField;
