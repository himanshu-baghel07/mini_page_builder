import "./App.css";
import cardIcon from "../src/assets/cardIcon.svg";
import closeIcon from "../src/assets/closeIcon.svg";
import { useState, useEffect } from "react";

const App = () => {
  const [dragItem, setDragItem] = useState(null);
  const [dropItems, setDropItems] = useState(() => {
    const data = localStorage.getItem("mini_items");
    const storedItems = JSON.parse(data);
    return storedItems?.dropItems ? storedItems.dropItems : [];
  });
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(false);
  const [textVal, setTextVal] = useState("");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [fontsizeVal, setFontsizeVal] = useState("");
  const [fontWeightVal, setFontWeightVal] = useState("");
  const [heightVal, setHeightVal] = useState("");
  const [widthVal, setWidthVal] = useState("");
  const [draggingPosition, setDraggingPosition] = useState({ x: 0, y: 0 });
  const [selectItem, setSelectItem] = useState("");

  const [dragInputItem, setDragInputItem] = useState(null);
  const [dropInputItems, setDropInputItems] = useState(() => {
    const data = localStorage.getItem("mini_items");
    const storedItems = JSON.parse(data);
    return storedItems?.dropInputItems ? storedItems.dropInputItems : [];
  });

  const [dragButtonItem, setDragButtonItem] = useState(null);
  const [dropButtonItems, setDropButtonItems] = useState(() => {
    const data = localStorage.getItem("mini_items");
    const storedItems = JSON.parse(data);
    return storedItems?.dropButtonItems ? storedItems.dropButtonItems : [];
  });

  const handleLabelDragStart = (e, item) => {
    setDragItem(item);
    setDraggingPosition({ x: e.clientX, y: e.clientY });
  };

  const handleInputDragStart = (e, item) => {
    setDragInputItem(item);
    setDraggingPosition({ x: e.clientX, y: e.clientY });
  };

  const handleButtonDragStart = (e, item) => {
    setDragButtonItem(item);
    setDraggingPosition({ x: e.clientX, y: e.clientY });
  };

  const handleLabelDragEnd = (e) => {
    console.log("X pos", e.clientX);
    console.log("DragItem", dragItem);
    console.log("Dragging Pos", draggingPosition);
    if (dragItem) {
      const offsetX = e.clientX - draggingPosition.x;
      const offsetY = e.clientY - draggingPosition.y;
      console.log("OffsetX", offsetX);
      const updatedItems = dropItems.map((item) =>
        item.id === dragItem.id
          ? { ...item, x: item.x + offsetX, y: item.y + offsetY }
          : item
      );

      setDropItems(updatedItems);
      setDragItem(null);
      setDraggingPosition({ x: 0, y: 0 });
    }
  };

  const handleInputDragEnd = (e) => {
    console.log("X pos", e.clientX);
    console.log("DragInputItem", dragInputItem);
    if (dragInputItem) {
      const offsetX = e.clientX - draggingPosition.x;
      const offsetY = e.clientY - draggingPosition.y;
      console.log("OffsetX", offsetX);
      const updatedItems = dropInputItems.map((item) =>
        item.id === dragInputItem.id
          ? { ...item, x: item.x + offsetX, y: item.y + offsetY }
          : item
      );

      setDropInputItems(updatedItems);
      setDragInputItem(null);
      setDraggingPosition({ x: 0, y: 0 });
    }
  };

  const handleButtonDragEnd = (e) => {
    console.log("X pos", e.clientX);
    console.log("DragInputItem", dragButtonItem);
    if (dragButtonItem) {
      const offsetX = e.clientX - draggingPosition.x;
      const offsetY = e.clientY - draggingPosition.y;
      console.log("OffsetX", offsetX);
      const updatedItems = dropButtonItems.map((item) =>
        item.id === dragButtonItem.id
          ? { ...item, x: item.x + offsetX, y: item.y + offsetY }
          : item
      );

      setDragButtonItem(updatedItems);
      setDragButtonItem(null);
      setDraggingPosition({ x: 0, y: 0 });
    }
  };

  const handleDragOverItem = (e) => {
    e.preventDefault();
  };

  const handleDropItem = (e) => {
    console.log("Drag Item", dragItem);
    console.log("Drag Input Item", dragInputItem);
    if (dragItem && dragItem.type === "label") {
      const itemIndex = dropItems.findIndex((item) => item.id === dragItem.id);

      if (itemIndex === -1) {
        setShowLabelModal(true);
      } else {
        const updatedItems = [...dropItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          x: e.clientX,
          y: e.clientY,
        };
        setDropItems(updatedItems);
      }
      setXAxis(e.clientX);
      setYAxis(e.clientY);
    } else if (dragInputItem && dragInputItem.type === "input") {
      const itemIndex = dropInputItems.findIndex(
        (item) => item.id === dragInputItem.id
      );

      if (itemIndex === -1) {
        setShowInputModal(true);
      } else {
        const updatedItems = [...dropInputItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          x: e.clientX,
          y: e.clientY,
        };
        setDropInputItems(updatedItems);
      }
      setXAxis(e.clientX);
      setYAxis(e.clientY);
    } else if (dragButtonItem && dragButtonItem.type === "button") {
      const itemIndex = dropButtonItems.findIndex(
        (item) => item.id === dragButtonItem.id
      );

      if (itemIndex === -1) {
        setShowButtonModal(true);
      } else {
        const updatedItems = [...dropButtonItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          x: e.clientX,
          y: e.clientY,
        };
        setDropButtonItems(updatedItems);
      }
      setXAxis(e.clientX);
      setYAxis(e.clientY);
    }
    setDragItem(null);
    setDragInputItem(null);
    setDragButtonItem(null);
  };

  const handleLabelSave = () => {
    const itemToAdd = {
      id: selectItem ? selectItem.id : Math.random().toString(),
      text: textVal,
      type: "label",
      x: xAxis,
      y: yAxis,
      fontSize: fontsizeVal,
      fontWeight: fontWeightVal,
    };

    if (selectItem) {
      const updatedItems = dropItems.map((item) =>
        item.id === selectItem.id ? itemToAdd : item
      );
      setDropItems(updatedItems);
      setSelectItem("");
    } else {
      setDropItems((prev) => [...prev, itemToAdd]);
    }

    setShowLabelModal(false);
    setTextVal("");
    setXAxis("");
    setYAxis("");
    setFontsizeVal("");
    setFontWeightVal("");
  };

  const handleInputSave = () => {
    const itemToAdd = {
      id: selectItem ? selectItem.id : Math.random().toString(),
      type: "input",
      text: textVal,
      x: xAxis,
      y: yAxis,
      height: heightVal,
      width: widthVal,
    };

    if (selectItem) {
      const updatedItems = dropInputItems.map((item) =>
        item.id === selectItem.id ? itemToAdd : item
      );
      setDropInputItems(updatedItems);
      setSelectItem("");
    } else {
      setDropInputItems((prev) => [...prev, itemToAdd]);
    }

    setShowInputModal(false);
    setTextVal("");
    setXAxis("");
    setYAxis("");
    setHeightVal("");
    setWidthVal("");
  };

  const handleButtonSave = () => {
    const itemToAdd = {
      id: selectItem ? selectItem.id : Math.random().toString(),
      type: "button",
      text: textVal,
      x: xAxis,
      y: yAxis,
      height: heightVal,
      width: widthVal,
    };

    if (selectItem) {
      const updatedItems = dropButtonItems.map((item) =>
        item.id === selectItem.id ? itemToAdd : item
      );
      setDropButtonItems(updatedItems);
      setSelectItem("");
    } else {
      setDropButtonItems((prev) => [...prev, itemToAdd]);
    }

    setShowButtonModal(false);
    setTextVal("");
    setXAxis("");
    setYAxis("");
    setHeightVal("");
    setWidthVal("");
  };

  const handleDeleteInput = (index) => {
    const newInputs = [...dropInputItems];
    newInputs.splice(index, 1);
    setDropInputItems(newInputs);
  };

  const handleEnterInput = () => {
    setShowInputModal(true);
    setTextVal(selectItem.text);
    setXAxis(selectItem.x);
    setYAxis(selectItem.y);
    setHeightVal(selectItem.height);
    setWidthVal(selectItem.width);
  };

  const handleDeleteButton = (index) => {
    const newInputs = [...dropButtonItems];
    newInputs.splice(index, 1);
    setDropButtonItems(newInputs);
  };

  const handleEnterButton = () => {
    setShowButtonModal(true);
    setTextVal(selectItem.text);
    setXAxis(selectItem.x);
    setYAxis(selectItem.y);
    setHeightVal(selectItem.height);
    setWidthVal(selectItem.width);
  };

  useEffect(() => {
    const dataToStore = {
      dropItems: dropItems,
      dropInputItems: dropInputItems,
      dropButtonItems: dropButtonItems,
    };
    localStorage.setItem("mini_items", JSON.stringify(dataToStore));
  }, [dropItems, dropInputItems, dropButtonItems]);

  useEffect(() => {
    const storedItems = localStorage.getItem("mini_items");
    const retrievedDropItems = storedItems ? JSON.parse(storedItems) : [];
    setDropItems(retrievedDropItems.dropItems);
    setDropInputItems(retrievedDropItems.dropInputItems);
    setDropButtonItems(retrievedDropItems.dropButtonItems);
    console.log("Data", retrievedDropItems);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && selectItem) {
        if (selectItem.type === "label") {
          setShowLabelModal(true);
          setTextVal(selectItem.text);
          setXAxis(selectItem.x);
          setYAxis(selectItem.y);
          setFontsizeVal(selectItem.fontSize);
          setFontWeightVal(selectItem.fontWeight);
        }
      } else if (e.key === "Delete" && selectItem) {
        const updatedItems = dropItems.filter(
          (item) => item.id !== selectItem.id
        );
        setDropItems(updatedItems);
        setSelectItem("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectItem, dropItems]);

  return (
    <div className="main_cont">
      <div
        className="main_section"
        onDragOver={handleDragOverItem}
        onDrop={handleDropItem}
      >
        {dropItems.map((item) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: `${item.x}px`,
              top: `${item.y}px`,
              fontSize: `${item.fontSize}px`,
              fontWeight: item.fontWeight,
              border: selectItem?.id === item.id && "1px solid red",
            }}
            draggable
            onDragStart={(e) => handleLabelDragStart(e, item)}
            onDragEnd={handleLabelDragEnd}
            onClick={() => {
              setSelectItem(item);
            }}
          >
            {item.text}
          </div>
        ))}

        {dropInputItems.map((item, index) => (
          <input
            key={item.id}
            type="text"
            style={{
              position: "absolute",
              left: `${item.x}px`,
              top: `${item.y}px`,
              height: `${item.height > 10 ? item.height : "20"}px`,
              width: `${item.width > 10 ? item.width : "20"}px`,
              border: selectItem?.id === item.id && "1px solid red",
              outline: "none",
            }}
            draggable
            onDragStart={(e) => handleInputDragStart(e, item)}
            onDragEnd={handleInputDragEnd}
            onClick={() => setSelectItem(item)}
            onKeyDown={(e) => {
              e.key === "Delete" && handleDeleteInput(index);
              e.key === "Enter" && handleEnterInput(index);
            }}
          />
        ))}
        {dropButtonItems.map((item, index) => (
          <button
            key={item.id}
            type="text"
            style={{
              position: "absolute",
              left: `${item.x}px`,
              top: `${item.y}px`,
              height: `${item.height}px`,
              width: `${item.width}px`,
              border: selectItem?.id === item.id && "1px solid red",
              outline: "none",
            }}
            draggable
            onDragStart={(e) => handleButtonDragStart(e, item)}
            onDragEnd={handleButtonDragEnd}
            onClick={() => setSelectItem(item)}
            onKeyDown={(e) => {
              e.key === "Delete" && handleDeleteButton(index);
              e.key === "Enter" && handleEnterButton(index);
            }}
          >
            {item.text}
          </button>
        ))}
        {showLabelModal && (
          <div className="modal">
            <div className="modal_content">
              <div className="modal_header">
                <h3>Edit Label</h3>

                <img
                  src={closeIcon}
                  alt=""
                  className="card_icon"
                  onClick={() => setShowLabelModal(false)}
                />
              </div>
              <hr className="horizontal_line" />
              <div className="all_input_cont">
                <div className="input_cont">
                  <label>Text</label>
                  <input
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>X</label>
                  <input
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Y</label>
                  <input
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Font Size</label>
                  <input
                    value={fontsizeVal}
                    onChange={(e) => setFontsizeVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Font Weight</label>
                  <input
                    value={fontWeightVal}
                    onChange={(e) => setFontWeightVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <button className="save_btn" onClick={handleLabelSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
        {showInputModal && (
          <div className="modal">
            <div className="modal_content">
              <div className="modal_header">
                <h3>Edit Input</h3>

                <img
                  src={closeIcon}
                  alt=""
                  className="card_icon"
                  onClick={() => setShowInputModal(false)}
                />
              </div>
              <hr className="horizontal_line" />
              <div className="all_input_cont">
                {/* <div className="input_cont">
                  <label>Text</label>
                  <input
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div> */}
                <div className="input_cont">
                  <label>X</label>
                  <input
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Y</label>
                  <input
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Height</label>
                  <input
                    value={heightVal}
                    onChange={(e) => setHeightVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Width</label>
                  <input
                    value={widthVal}
                    onChange={(e) => setWidthVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <button className="save_btn" onClick={handleInputSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
        {showButtonModal && (
          <div className="modal">
            <div className="modal_content">
              <div className="modal_header">
                <h3>Edit Button</h3>

                <img
                  src={closeIcon}
                  alt=""
                  className="card_icon"
                  onClick={() => setShowButtonModal(false)}
                />
              </div>
              <hr className="horizontal_line" />
              <div className="all_input_cont">
                <div className="input_cont">
                  <label>Button Name</label>
                  <input
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>X</label>
                  <input
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Y</label>
                  <input
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Height</label>
                  <input
                    value={heightVal}
                    onChange={(e) => setHeightVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <div className="input_cont">
                  <label>Width</label>
                  <input
                    value={widthVal}
                    onChange={(e) => setWidthVal(e.target.value)}
                    type="text"
                    className="input_box_style"
                  />
                </div>
                <button className="save_btn" onClick={handleButtonSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="sidebar">
        <h3>Blocks</h3>
        <div className="card_cont">
          <div
            className="card_style"
            draggable
            onDragStart={(e) =>
              handleLabelDragStart(e, {
                id: Math.random().toString(),
                type: "label",
              })
            }
          >
            <img src={cardIcon} alt="" className="card_icon" />
            <span>Label</span>
          </div>
          <div
            className="card_style"
            draggable
            onDragStart={(e) =>
              handleInputDragStart(e, {
                id: Math.random().toString(),
                type: "input",
              })
            }
          >
            <img src={cardIcon} alt="" className="card_icon" />
            <span>Input</span>
          </div>

          <div
            className="card_style"
            draggable
            onDragStart={(e) =>
              handleButtonDragStart(e, {
                id: Math.random().toString(),
                type: "button",
              })
            }
          >
            <img src={cardIcon} alt="" className="card_icon" />
            <span>Button</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
