import { forwardRef, memo } from 'react'
import { useDrop } from 'react-dnd'
import { UploadOutlined } from '@ant-design/icons';
import {
    Input,
    Button,
    InputNumber,
    Select,
    Upload,
    DatePicker,
    Checkbox,
    Radio,
    Calendar,
    theme,
} from 'antd';
import { ItemType } from './ItemType';
//? Component For Making A Dropable Area For Dragable Items
const BackDrop = memo(forwardRef(
    (
        {
            dropable,
            attributes,
            options,
        },
        ref
    ) => {

        const [{ isOver, canDrop }, drop] = useDrop(() => ({
            accept: ItemType.ELEMENT,
            drop: () => (ref.current.open()),
            collect: (monitor) => (
                {
                    isOver: !!monitor.isOver(),
                    canDrop: !!monitor.canDrop(),
                }
            )
        }))

        const calsses = 'border-2 border-black rounded-lg p-1 ';

        // const props = {
        //     name: 'file',
        //     // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        //     headers: {
        //         authorization: 'authorization-text',
        //     },
        //     onChange(info) {
        //         if (info.file.status !== 'uploading') {
        //             console.log(info.file, info.fileList);
        //         }
        //         if (info.file.status === 'done') {
        //             message.success(`${info.file.name} file uploaded successfully`);
        //         } else if (info.file.status === 'error') {
        //             message.error(`${info.file.name} file upload failed.`);
        //         }
        //     },
        // };

        const plainOptions = ['Apple', 'Pear', 'Orange'];

        const { token } = theme.useToken();
        const wrapperStyle = {
            width: 300,
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadiusLG,
        };

        return (
            <>
                <div className=" text-center w-10/12 rounded-xl px-8 py-16 bg-stone-50 border-stone-600 border-2 overflow-scroll no-scrollbar" ref={drop}>
                    <h2 className='mb-8 font-bold uppercase md:text-xl font-sans'>
                        From
                    </h2>
                    {dropable.length == 0 ? <p className=" mb-4 text-3xl">Drag An Element To Get Started<sup className='text-red-600 text-3xl'>*</sup></p> : ""}
                    <form>
                        <ul className='flex flex-col gap-2 items-center'>
                            {/* <ul className='grid grid-cols-2 gap-4'> */}
                            {dropable.map((item, i) =>
                            (
                                <li key={i} className=' inline-flex '>
                                    {item.componentType === "button" ? " " : <label className='whitespace-pre text-xl font-semibold capitalize text-slate-900'>
                                        {attributes.label[i]}{"  "}
                                    </label>}
                                    {
                                        item.componentType === "input" ?

                                            <Input className={calsses} placeholder={attributes.placeholder[i]} />

                                            : item.componentType === "button" ?

                                                <Button type='primary' onClick={(e) => { e.preventDefault() }}>
                                                    {attributes.placeholder[i]}
                                                </Button>

                                                : item.componentType === "text Area" ?

                                                    <Input.TextArea className={calsses} placeholder={attributes.placeholder[i]} />

                                                    : item.componentType === "number Format" ?

                                                        <InputNumber className={calsses} placeholder={attributes.placeholder[i]} />

                                                        : item.componentType === "dropdown" ?

                                                            <Select
                                                                className={calsses}
                                                                defaultValue={options[0]}
                                                                options={options}
                                                            />

                                                            : item.componentType === "upload" ?

                                                                <Upload className={calsses} >
                                                                    <Button icon={<UploadOutlined />}>{attributes.placeholder[i]}</Button>
                                                                </Upload>

                                                                : item.componentType === "date Picker" ?

                                                                    <DatePicker className={calsses} format={"DD/MM/YYYY"} placeholder={attributes.placeholder[i]} />

                                                                    : item.componentType === "checkbox" ?

                                                                        <Checkbox.Group className={calsses} options={plainOptions} />

                                                                        : item.componentType === "radio Group" ?

                                                                            <Radio.Group className={calsses}>
                                                                                <Radio value={1}>A</Radio>
                                                                                <Radio value={2}>B</Radio>
                                                                                <Radio value={3}>C</Radio>
                                                                                <Radio value={4}>D</Radio>
                                                                            </Radio.Group>

                                                                            : item.componentType === "calander" ?

                                                                                <div style={wrapperStyle}>
                                                                                    <Calendar fullscreen={false} />
                                                                                </div>

                                                                                : ''
                                    }
                                </li>
                            )
                            )
                            }
                        </ul>
                    </form>
                </div>
            </>
        )
    }))

export default BackDrop