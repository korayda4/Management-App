import { Modal, Input, message } from 'antd';
const { TextArea } = Input;
import { useState, useEffect } from 'react';
import MyInput from '../GeneralComponent/Input';
import Buttons from '../GeneralComponent/Button';

const EditTask = ({
  IsOpenEditTask,
  AllData,
  selectedBoard,
  changeAllData,
  handleChangeOpenEditTask,
  selectedColumnIndex,
  selectedTaskIndex,
  setAllData
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [UpdatedInputs, setUpdatedInputs] = useState("");
  const [taskTitle, settaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newInputs, setNewInputs] = useState([]);
  const [temporaryData, setTemporaryData] = useState({ ...AllData });


  useEffect(() => {
    if (selectedBoard !== null) {
      setDescription(temporaryData["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].description)
      settaskTitle(temporaryData["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].title);
      setNewInputs(temporaryData["boards"][selectedBoard]?.columns[selectedColumnIndex].tasks[selectedTaskIndex].subtasks.map(column => column.title) || []);
    }
  }, [selectedBoard, temporaryData]);
  const generalData = AllData.boards[selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex];

  const updateBoard = () => {
    const allDataCopy = { ...temporaryData };
    allDataCopy["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].title = taskTitle
    allDataCopy["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].description = description
    UpdatedInputs !== "" ? allDataCopy["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].subtasks = UpdatedInputs:null

    messageApi.open({
      type: 'success',
      content: 'Task was edited successfully ',
    })

    handleChangeOpenEditTask()
    setAllData(allDataCopy);
  };

  const addNewInput = () => {
    const allDataCopy = { ...temporaryData };
    console.log(allDataCopy["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex]);
    allDataCopy["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].subtasks.push(
      {isCompleted:false,title:""}
    )
    setAllData(allDataCopy)
    const newInputValue = '';
    setNewInputs([...newInputs, newInputValue]);
  };


  console.log(generalData);
  const onDeleteColumn = (index) => {
    const allDataCopy = { ...temporaryData };
    allDataCopy["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].subtasks.splice(index,1)
    setTemporaryData(allDataCopy);
  };

  console.log(newInputs);
 
  return (
    
    <Modal
      centered={true}
      footer={null}
      title="Edit Task"
      open={IsOpenEditTask}
      onCancel={() => {
        handleChangeOpenEditTask()
      }}
      cancelText="Vazgeç"
      okText="Güncelle"
    >
      {contextHolder}
      <div className="EditTask">
        Title
        <MyInput
          value={taskTitle}
          onChange={(e) => {settaskTitle(e.target.value)}}
          placeholder="Board Name"
          marginB={"12px"}
        />
        Description
        <TextArea 
            rows={4} 
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
            style={{maxHeight:"125px",minHeight:"100px"}}
        />
        Subtasks
        {newInputs.map((input, index) => (
          <div id={index.toString()} className="CreateNewColumnsInput" key={index}>
            <Input
              placeholder={"Enter Column Name"}
              value={input}
              onChange={(e) => {
                const updatedInputs = AllData.boards[selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].subtasks
                updatedInputs[index].title = e.target.value
                setUpdatedInputs(updatedInputs)
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
          onClick={addNewInput}
          radius="32px"
          title="+Add New Subtask"
          color="#635FC7"
          bgcolor="#635FC71A"
          width={"100%"}
          pg={"12px"}
        />

        <Buttons
          onClick={updateBoard}
          radius="32px"
          title="Update Task"
          color="white"
          bgcolor="#635FC7"
          width={"100%"}
          pg={"12px"}
        />
      </div>
    </Modal>
  );
};

export default EditTask;
