import { forwardRef } from 'react'
import { useDrop } from 'react-dnd'
import { UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Button,
    InputNumber,
    Select,
    Upload,
    message,
    DatePicker,
    Checkbox,
} from 'antd';
//? Component For Making A Dropable Area For Dragable Items
const BackDrop = forwardRef(({ dropable, attributes }, ref) => {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'element',
        drop: () => (ref.current.open()),
        collect: (monitor) => (
            {
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }
        )
    }))

    const calsses = 'border-2 border-black rounded-lg p-1 ';

    const props = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const plainOptions = ['Apple', 'Pear', 'Orange'];

    return (
        <>
            <div className=" text-center w-10/12 rounded-xl px-8 py-16 bg-stone-50 border-stone-600 border-2 overflow-scroll no-scrollbar" ref={drop}>
                <h2 className='mb-8 font-bold uppercase md:text-xl font-sans'>
                    From
                </h2>
                {dropable.length == 0 ? <p className=" mb-4 text-3xl">Drag An Element To Get Started<sup className='text-red-600 text-3xl'>*</sup></p> : ""}
                <form>
                    <ul className='flex flex-col gap-2 items-center'>
                        {dropable.map((item, i) => (
                            <ul key={i} className=' inline-flex '>
                                {item.componentType === "button" ? " " :<label className='whitespace-pre text-xl font-semibold capitalize text-slate-900'>
                                    {attributes.label[i]}{"  "}
                                </label>}
                                {
                                    item.componentType === "input" ?
                                        <Input className={calsses} placeholder={attributes.placeholder[i]} />
                                        : item.componentType === "button" ?
                                            <Button type='primary' onClick={(e) => { e.preventDefault() }}>
                                                {attributes.placeholder[i]}
                                            </Button>
                                            : item.componentType === "textarea" ?
                                                <Input.TextArea className={calsses} placeholder={attributes.placeholder[i]} />
                                                : item.componentType === "number" ?
                                                    <InputNumber placeholder={attributes.placeholder[i]} />
                                                    : item.componentType === "select" ?
                                                        <Select
                                                            defaultValue="lucy"
                                                            style={{ width: 120 }}
                                                            options={[
                                                                { value: 'jack', label: 'Jack' },
                                                                { value: 'lucy', label: 'Lucy' },
                                                                { value: 'Yiminghe', label: 'yiminghe' },
                                                                { value: 'disabled', label: 'Disabled', disabled: true },
                                                            ]}
                                                        />
                                                        : item.componentType === "upload" ?
                                                            <Upload {...props} >
                                                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                            </Upload>
                                                            : item.componentType === "date" ?
                                                                <DatePicker format={"DD/MM/YY"} placeholder={attributes.placeholder[i]} />
                                                                : item.componentType === "checkbox" ?
                                                                    <Checkbox.Group options={plainOptions} />
                                                                    : ""
                                }
                            </ul>
                        ))
                        }
                    </ul>
                </form>
            </div>
        </>

    )
})

export default BackDrop