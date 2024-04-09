import Elements from './Elements';

//& Component For Displaying Side Component
const SideBar = ({ drag, dropable }) => {

    return (
        <aside className="w-1/3 px-8 py-16 border-2 border-stone-600 bg-stone-50 md:w-96 rounded-xl text-center">
            <h2
                className="mb-8 font-bold uppercase md:text-xl font-sans">
                Components
            </h2>
            <div className=''>
                <ul className='grid grid-cols-2 gap-2'>
                    {
                        drag.map((item) =>
                            // * Passing Items To Element Component For Making Them 
                            <Elements
                                key={item.id}
                                item={item}
                                dropable={dropable}
                            />)
                    }
                </ul>
            </div>
        </aside>
    )
}

export default SideBar
