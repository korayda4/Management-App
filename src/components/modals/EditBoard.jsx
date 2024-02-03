import { Modal, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import MyInput from '../GeneralComponent/Input';
import Buttons from '../GeneralComponent/Button';

const EditBoard = ({
  IsOpenEditBoard,
  changeIsOpenEditBoard,
  AllData,
  changeAllData,
  selectedBoard,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [inputValue, setInputValue] = useState("");
  const [boardName, setBoardName] = useState("");
  const [newInputs, setNewInputs] = useState([]);
  const [temporaryData, setTemporaryData] = useState({ ...AllData });

  useEffect(() => {
    if (selectedBoard !== null) {
      setTemporaryData({ ...AllData })    
      setBoardName(temporaryData["boards"][selectedBoard]?.name);
      setNewInputs(temporaryData["boards"][selectedBoard]?.columns.map(column => column.name) || []);
    }
  }, [selectedBoard, AllData, IsOpenEditBoard]);

  

  const updateBoard = () => {
    const allDataCopy = { ...temporaryData };
    allDataCopy["boards"][selectedBoard].name = boardName;
    console.log(allDataCopy["boards"][selectedBoard].columns);
    // allDataCopy["boards"][selectedBoard].columns = newInputs;
    // console.log(allDataCopy["boards"][selectedBoard].columns);
    messageApi.open({
        type: 'success',
        content: 'board was edited successfully ',
      })

    changeAllData(allDataCopy);
    changeIsOpenEditBoard();
  };

  const onAddColumn = () => {
    const allDataCopy = { ...temporaryData };
    const newColumn = {
      name: inputValue,
      tasks: []
    };
    allDataCopy["boards"][selectedBoard].columns.push(newColumn);
    setTemporaryData(allDataCopy);
    setNewInputs([...newInputs, inputValue]);
    setInputValue("");
  };

  const onDeleteColumn = (index) => {
    const updatedColumns = newInputs.filter((_, i) => i !== index);
    const allDataCopy = { ...temporaryData };
    allDataCopy["boards"][selectedBoard].columns = allDataCopy["boards"][selectedBoard].columns.slice(0, index).concat(allDataCopy["boards"][selectedBoard].columns.slice(index + 1));
    setTemporaryData(allDataCopy);
    setNewInputs(updatedColumns);
  };

  return (
    
    <Modal
      centered={true}
      footer={null}
      title="Edit Board"
      open={IsOpenEditBoard}
      onCancel={() => {
        changeIsOpenEditBoard();
        setInputValue("");
        setNewInputs([]);
      }}
      cancelText="Vazgeç"
      okText="Güncelle"
    >
      {contextHolder}
      <div className="AddNewBoard">
        Board Name
        <MyInput
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Board Name"
        />
        Board Columns
        {newInputs.map((input, index) => (
          <div id={index.toString()} className="CreateNewColumnsInput" key={index}>
            <Input
              placeholder={"Enter Column Name"}
              value={input}
              onChange={(e) => {
                const updatedInputs = [...AllData.boards[selectedBoard].columns];
                updatedInputs[index].name = e.target.value;
                const temporaryInputs = [...newInputs]
                temporaryInputs[index] = e.target.value;
                setNewInputs(temporaryInputs);
              }}
            />
            <img
              id={index.toString()}
              onClick={() => onDeleteColumn(index)}
              src="image/Group 18.png"
              alt="Delete icon"
              style={{ height: "16px", cursor: "pointer" }}
            />
          </div>
        ))}

        <Buttons
          onClick={onAddColumn}
          radius="32px"
          title="+Add New Column"
          color="#635FC7"
          bgcolor="#635FC71A"
          width={"100%"}
          pg={"12px"}
        />

        <Buttons
          onClick={updateBoard}
          radius="32px"
          title="Update Board"
          color="white"
          bgcolor="#635FC7"
          width={"100%"}
          pg={"12px"}
        />
      </div>
    </Modal>
  );
};

export default EditBoard;
