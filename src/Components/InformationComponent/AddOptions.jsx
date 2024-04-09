import { Button } from "antd"

const AddOptions = ({ options, setOptions }) => {
    const inputFieldClass = "border-[0.2rem] rounded-md border-sky-100 h-12 shadow-lg shadow-rose-200 px-2 w-[20rem] text-stone-600 focus:outline-none focus:border-yellow-400";

    const handleAddInput = () => {
        setOptions([...options, { value: "", option: "" }]);
    };

    const handleChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...options];
        onChangeValue[index][name] = value;
        setOptions(onChangeValue);
    };

    const handleDeleteInput = (index) => {
        const newArray = [...options];
        newArray.splice(index, 1);
        setOptions(newArray);
    };

    const label = "capitalize font-semibold"
    const li = 'mx-5 flex gap-2'

    console.log(options);

    return (
        <div className="">
            {options.map((item, index) => (
                <ul className="flex flex-col gap-4" key={index}>
                    <li className={li}>
                        <label className={label}>
                            option:
                        </label>
                        <input
                            className={inputFieldClass}
                            name="option"
                            type="text"
                            value={item.option}
                            onChange={(event) => handleChange(event, index)}
                        />
                    </li>
                    <li className={li}>
                        <label className={label}>
                            value:
                        </label>
                        <input
                            className={inputFieldClass}
                            name="value"
                            type="text"
                            value={item.value}
                            onChange={(event) => handleChange(event, index)}
                        />
                    </li>
                    <li className={li}>
                        {options.length > 1 && (
                            <Button type='primary' onClick={() => handleDeleteInput(index)}>Delete</Button>
                        )}
                    </li>
                    <li className={li}>
                        {index === options.length - 1 && (
                            <Button type='primary' onClick={() => handleAddInput()}>Add</Button>
                        )}
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default AddOptions