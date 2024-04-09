import React, { useState } from 'react'
import { Button } from "antd"

const AddDynamicInputFields = () => {
    const [inputs, setInputs] = useState([{ value: "", option: "" }])
    const inputFieldClass = "border-[0.2rem] rounded-md border-sky-100 h-12 shadow-lg shadow-rose-200 px-2 w-[20rem] text-stone-600 focus:outline-none focus:border-yellow-400";

    const handleAddInput = () => {
        setInputs([...inputs, { value: "", option: "" }]);
    };

    const handleChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };

    console.log(inputs);

    return (
        <div className="">
            {inputs.map((item, index) => (
                <div className="grid grid-cols-2 gap-2" key={index}>
                    <input
                        className={inputFieldClass}
                        name="value"
                        type="text"
                        value={item.value}
                        onChange={(event) => handleChange(event, index)}
                    />
                    <input
                        className={inputFieldClass}
                        name="option"
                        type="text"
                        value={item.option}
                        onChange={(event) => handleChange(event, index)}
                    />
                    {inputs.length > 1 && (
                        <Button onClick={() => handleDeleteInput(index)}>Delete</Button>
                    )}
                    {index === inputs.length - 1 && (
                        <Button onClick={() => handleAddInput()}>Add</Button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default AddDynamicInputFields