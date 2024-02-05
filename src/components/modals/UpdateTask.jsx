import { Modal,Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import Buttons from '../GeneralComponent/Button';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';

const UpdateTask = ({ selectedBoard, IsOpen, SetIsOpen, taskData, allData, setAllData ,showMessageDelete , theme,language}) => {
  const [IsOpenDeleteOrEditTask, setIsOpenDeleteOrEditTask] = useState(false);
  const [IsOpenDeleteTask, setIsOpenDeleteTask] = useState(false);
  const [IsOpenEditTask, setIsOpenEditTask] = useState(false);
  const selectedColumnIndex = taskData[0];
  const selectedTaskIndex = taskData[1];
  const [subtaskStatus, setSubtaskStatus] = useState(
    allData["boards"][selectedBoard]?.columns[selectedColumnIndex]?.tasks[selectedTaskIndex]?.subtasks.map(subtask => subtask.isCompleted) || []
  );
  let selectedColumn;
  if (selectedColumnIndex !== undefined && selectedTaskIndex !== undefined) {
    selectedColumn = allData?.boards[selectedBoard]?.columns[selectedColumnIndex]?.tasks[selectedTaskIndex];
  }

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

  const completedSubtasks = selectedColumn.subtasks.filter(subtask => subtask.isCompleted).length;
  return (
    <Modal
      footer={null}
      title={selectedColumn.title}
      open={IsOpen}
      closeIcon={<img src="image\Group 5.svg" />}
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
            title={language ? "Edit Task":"Görevi Düzenle"}
            color={"#828FA3"}
          />
          <Buttons
            onClick={handleChangeDeleteTask}
            bgcolor={"transparent"}
            title={language ? "Delete Task":"Görevi Sil"}
            color={"#EA5555"}
          />
        </div>
        <DeleteTask
          language={language}
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
          language={language}
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
          <p>{language ? `Subtask (${completedSubtasks} of ${selectedColumn.subtasks.length})`:`Alt Görev (${completedSubtasks} / ${selectedColumn.subtasks.length})`}</p>
          {IsOpen
            ? selectedColumn?.subtasks.map((subtask, index) => (
              <div  className='updateSubTask' style={{backgroundColor:`${subtaskStatus[index] ? "#00ff0021":""}`}}  key={index}>
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
      </div>
    </Modal>
  );
};

export default UpdateTask;