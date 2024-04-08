import { useState, useRef, useLayoutEffect } from "react";
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import BackDrop from "./Components/BackDrop"
import SideBar from "./Components/SideBar";

import { v4 as uuidv4 } from "uuid"

import Modal from "./Components/DialogModal/Modal";
import InputLabel from "./Components/InformationComponent/InputLabel";
import InputPlaceHolder from "./Components/InformationComponent/InputPlaceHolder";

function App() {

  const [drag, setDrag] = useState([
    {
      componentType: "input",
      id: uuidv4(),
    },
    {
      componentType: "textarea",
      id: uuidv4(),
    },
    {
      componentType: "button",
      id: uuidv4(),
    },
    {
      componentType: "number",
      id: uuidv4(),
    },
    {
      componentType: "select",
      id: uuidv4(),
    },
    {
      componentType: "upload",
      id: uuidv4(),
    },
    {
      componentType: "date",
      id: uuidv4(),
    },
    {
      componentType: "checkbox",
      id: uuidv4(),
    },
  ])

  const [dropable, setDropable] = useState([])

  const [attributes, setAttributes] = useState({
    label: [],
    placeholder: [],
  })

  console.log(drag)
  console.log(dropable)

  const modal = useRef()
  const warningModal = useRef()
  const userLabel = useRef();
  const userPlaceHolder = useRef();

  const handleSave = () => {
    const enteredLabel = userLabel?.current?.value
    const enteredPlaceHolder = userPlaceHolder?.current?.value

    userLabel === '' ? "" : document.getElementById("id").value = '' ;
    document.getElementById("id2").value = '';

    if (enteredLabel?.trim() === '' && enteredPlaceHolder.trim() === '') {
      warningModal.current.open();
      return;
    }

    setAttributes(
      prevState => {
        return {
          ...prevState,
          placeholder: [...prevState.placeholder, enteredPlaceHolder],
          label: [...prevState.label, enteredLabel],
        }
      }
    )
  }

  let i = 0;

  console.log(attributes);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="h-screen p-6 flex gap-4 mx-1 min-w-[650px] bg-">
        <SideBar drag={drag} dropable={dropable} />
        <BackDrop dropable={dropable} ref={modal} attributes={attributes} />
      </main>
      <Modal ref={warningModal} btnCaption="Close" handleSave={handleSave}>
        <h2 className="text-xl font-bold text-red-700 my-4">Invalid Input</h2>
        <p className="">Please enter valid input</p>
      </Modal>
      <Modal ref={modal} btnCaption="Save" handleSave={handleSave}>
        <h2 className="text-xl font-bold text-red-700 my-4">INFO</h2>
        <ul>
          {/* {drag.componentType === "button" ? "" : <InputLabel ref={userLabel} />} */}
          {/* {drag.find((i) => { i.componentType === "button" }) ? " " : <InputLabel ref={userLabel} />} */}
          {userLabel === "" ? "" :<InputLabel ref={userLabel}/>}
          {/* <p className="text-red-500 m-5">For Button You Can Left Label Field</p> */}
          <InputPlaceHolder ref={userPlaceHolder} />
        </ul>
      </Modal>
    </DndProvider>
  )
}

export default App