import { memo } from "react";
import { useDrag } from "react-dnd"
import { ItemType } from "./ItemType";

//& Component Making Items Dragable And Dropable
const Elements = memo(({ item, dropable }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.ELEMENT,
        item: { name: item },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                let tempList = dropable;
                tempList.push(item.name)
            }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
            isDragging: !!monitor.getItem(),
        })
    }), [],)

    return (
        <>
            <li ref={drag} className="bg-slate-500 text-white p-3 capitalize rounded-lg flex flex-row justify-center gap-3">
                {
                    item.componentType
                }
            </li>
        </>
    )
})

export default Elements