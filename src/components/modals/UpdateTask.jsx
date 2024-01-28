import { Modal,Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import Buttons from '../GeneralComponent/Button';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';

const UpdateTask = ({ selectedBoard, IsOpen, SetIsOpen, taskData, allData, setAllData ,showMessageDelete , theme}) => {
  const [IsOpenDeleteOrEditTask, setIsOpenDeleteOrEditTask] = useState(false);
  const [IsOpenDeleteTask, setIsOpenDeleteTask] = useState(false);
  const [IsOpenEditTask, setIsOpenEditTask] = useState(false);
  const [selectedTaskStatus, setselectedTaskStatus] = useState(0);
  const selectedColumnIndex = taskData[0];
  const selectedTaskIndex = taskData[1];
  const [defaultSelect, setdefaultSelect] = useState(allData["boards"][selectedBoard]?.columns[selectedColumnIndex]?.tasks[selectedTaskIndex]?.status);
  const [subtaskStatus, setSubtaskStatus] = useState(
    allData["boards"][selectedBoard]?.columns[selectedColumnIndex]?.tasks[selectedTaskIndex]?.subtasks.map(subtask => subtask.isCompleted) || []
  );
  let selectedColumn;
  if (selectedColumnIndex !== undefined && selectedTaskIndex !== undefined) {
    selectedColumn = allData?.boards[selectedBoard]?.columns[selectedColumnIndex]?.tasks[selectedTaskIndex];
  }

  useEffect(() => {
    setdefaultSelect(allData["boards"][selectedBoard]?.columns[selectedColumnIndex]?.tasks[selectedTaskIndex].status)
  }, [allData, selectedBoard, selectedColumnIndex, selectedTaskIndex]);

  const handleChangeOpenEditTask = () => {
    setIsOpenDeleteOrEditTask(!IsOpenDeleteOrEditTask)
    setIsOpenEditTask(!IsOpenEditTask)
  }

  const handleChangeEditOrDeleteTask = (e) => {
    if (e == "img" || e == "span") {
      setIsOpenDeleteOrEditTask(!IsOpenDeleteOrEditTask)
    } else {
      SetIsOpen()
    }
  }

  const handleChangeDeleteTask = (e) => {
    setIsOpenDeleteOrEditTask(!IsOpenDeleteOrEditTask)
    setIsOpenDeleteTask(!IsOpenDeleteTask)
  }

  const handleChangeTaskName = (e) => {
    showMessageDelete("Task Status","Updated")
    console.log(e.target.value);
    const updatedAllData = { ...allData };
    updatedAllData["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].status = updatedAllData["boards"][selectedBoard].columns[e.target.value]
    const changedTask = updatedAllData["boards"][selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex]
    updatedAllData["boards"][selectedBoard].columns[selectedColumnIndex].tasks.splice(selectedTaskIndex,1)
    updatedAllData["boards"][selectedBoard].columns[e.target.value].tasks.push(changedTask)
    setAllData(updatedAllData);
    setdefaultSelect(updatedAllData["boards"][selectedBoard]?.columns[selectedColumnIndex]?.tasks[selectedTaskIndex].status)
    SetIsOpen()
    
  }

  console.log(defaultSelect);
  const completedSubtasks = selectedColumn.subtasks.filter(subtask => subtask.isCompleted).length;
  return (
    <Modal
      footer={null}
      title={selectedColumn.title}
      open={IsOpen}
      closeIcon={<img src="../../../public/image/Group 5.svg" />}
      centered={true}
      onCancel={ (e) => {
        handleChangeEditOrDeleteTask(e.target.localName)
      } }
    >
      <div  className="AddNewBoard">
        <div id='theme' style={{display:`${IsOpenDeleteOrEditTask ? "flex":"none"}`}} className="EditOrDeleteTask">
          <Buttons
            onClick={handleChangeOpenEditTask}
            bgcolor={"transparent"}
            title={"Edit Task"}
            color={"#828FA3"}
          />
          <Buttons
            onClick={handleChangeDeleteTask}
            bgcolor={"transparent"}
            title={"Delete Task"}
            color={"#EA5555"}
          />
        </div>
        <DeleteTask
          showMessageDelete={showMessageDelete}
          SetIsOpen={SetIsOpen}
          setIsOpenDeleteTask={setIsOpenDeleteTask}
          handleChangeDeleteTask={handleChangeDeleteTask}
          selectedColumnIndex={selectedColumnIndex}
          selectedTaskIndex={selectedTaskIndex}
          IsOpenDeleteTask={IsOpenDeleteTask}
          AllData={allData}
          selectedBoard={selectedBoard}
          changeAllData={setAllData}
        />
        <EditTask
          setAllData={setAllData}
          handleChangeOpenEditTask={handleChangeOpenEditTask}
          IsOpenEditTask={IsOpenEditTask}
          AllData={allData}
          selectedBoard={selectedBoard}
          changeAllData={setAllData}
          selectedColumnIndex={selectedColumnIndex}
          selectedTaskIndex={selectedTaskIndex}
          IsOpenDeleteTask={IsOpenDeleteTask}
          SetIsOpen={SetIsOpen}
        />
        {selectedColumn !== undefined ? <p className='descriptionText'>{selectedColumn.description}</p> : null}
        <div className="subtaskSection">
          <p>Subtask ({completedSubtasks} of {selectedColumn.subtasks.length})</p>
          {IsOpen
            ? selectedColumn?.subtasks.map((subtask, index) => (
              <div  className='updateSubTask' key={index}>
                <Checkbox 
                  id={index}
                  name={`option${index}`}
                  checked={subtaskStatus[index]}
                  onChange={() => {
                    const updatedStatus = [...subtaskStatus];
                    updatedStatus[index] = !updatedStatus[index];

                    setSubtaskStatus(updatedStatus);

                    const updatedAllData = { ...allData };
                    updatedAllData.boards[selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].subtasks[index].isCompleted = updatedStatus[index];

                    setAllData(updatedAllData);
                  }}
                />
             
                <span>{subtask.title}</span>
              </div>
            ))
            : null}
        </div>
        Current Status
        <select defaultValue={defaultSelect} className="updateTaskSelect" onChange={(e) => {handleChangeTaskName(e)}} >
          {IsOpen
            ? allData?.boards[selectedBoard]?.columns.map((column, index) => {
              return(
              <option key={index} id={index} value={index} >
                {column.name}
              </option>
            )
          })
            : null}
        </select>
      </div>
    </Modal>
  );
};

export default UpdateTask;