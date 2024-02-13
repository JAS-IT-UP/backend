import { useState, useContext } from "react";

export default function Dropdown()  {
	const [selectedOption, setSelectedOption] = useState("Materials");

	const  handleDropdownChange = (event) => {
		setSelectedOption(event.target.value);
	};
console.log('hi')
return  (
	<div>
		<label>
			<h3>Choose Your Repurposed Materials:</h3>
				<select  value={selectedOption} onChange={handleDropdownChange}>
				<option  value="Milk Carton">Milk Carton</option>
				<option  value="Jeans">Jeans</option>
				<option  value="Mason Jars">Mason Jars</option>
                <option  value="NewsPaper/Magazine">NewsPaper/Magazine</option>
                <option  value="Fabric Scraps">Fabric Scraps</option>
                <option  value="Cans">Cans</option>
                <option  value="Other">Other</option>
			</select>
		</label>
		<p>Selected Material: {selectedOption}</p>
	</div>
	);
}