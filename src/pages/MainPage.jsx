import React, { useEffect, useState } from "react";
import LeftSide from "../components/Navbar/MainNavbar/MainNavbarLeftside";
import RightSide from "../components/Navbar/MainNavbar/MainNavbarRightside";
import allData from "../data/all.json";
import UpdateTask from "../components/modals/UpdateTask";
import CreateNewColumn from "./createNewColumn";
import DesktopDrawer from "../components/Navbar/MainNavbar/desktopDrawer";
import { message } from 'antd';


const MainPage = () => {
  const [IsOpen, SetIsOpen] = useState(false);
  const [taskData, SetTaskData] = useState({});
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [AllData, setAllData] = useState(allData);
  const [messageApi, contextHolder] = message.useMessage();
  const [theme,setTheme] = useState(false)


  const ChangeSelectedBoard = (x) => {
    setSelectedBoard(x);
  };

  const showMessageDelete = (title1,title2) => {
    messageApi.open({
      type: 'success',
      content: `${title1} was ${title2} successfully `,
  })
  console.log("deneme");
  }

  const changeAllData = (x) => {
    setAllData(x)
  }

  const ChangeAllData = (x) => {
    setAllData({ boards: x });
  };

  const UpdateTaskModal = (e) => {
    SetTaskData([e.target.dataset.value,e.target.id]);
    SetIsOpen(!IsOpen);
  };

  const createColumn = AllData.boards[selectedBoard]?.columns.map((column, columnIndex) => {
    if (column == "") return
    const createColumnTask = column.tasks.map((task, taskIndex) => {
      const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;

      return (
        <div 
          style={{backgroundColor:`${theme ? "#2B2C37":""}`,color:`${theme ? "#828FA3":""}`}}
          className="task" 
          key={taskIndex} 
          id={taskIndex} 
          onClick={(e) => UpdateTaskModal(e)}
          data-value={columnIndex}
        >
          <div 
            className="taskTitles"
            key={taskIndex} 
            id={taskIndex} 
            data-value={columnIndex}
            onClick={(e) => UpdateTaskModal(e)}
          >
            <h4 
              style={{color:`${theme ? "white":""}`}}
              id={taskIndex} 
              data-value={columnIndex}
            >
              {task.title}
            </h4>
            <span
              id={taskIndex} 
              data-value={columnIndex}
            >
              {completedSubtasks} of {task.subtasks.length} subtasks
            </span>
          </div>
        </div>
      );
    });
   const oval = ["public/image/Oval.png","public/image/Oval (1).png","public/image/Oval (2).png","public/image/Oval.png","public/image/Oval (1).png","public/image/Oval (2).png"]
    return (
      <div className="column" style={{ textAlign: "left" }} key={columnIndex}>
        <div className="columnUpTitle">
          <img src={oval[columnIndex]} alt="ico" />
          {column.name.toUpperCase()} ({column.tasks.length})
        </div>
        <div className="tasks" style={{ textAlign: "center" }}>
          {createColumnTask}
        </div>
      </div>
    );
  });

  return (
    <div className="MainPage">
      {contextHolder}   
      <div style={{backgroundColor:`${theme ? "#2B2C37":""}`}} className="MainNavbar">
        <LeftSide
          setTheme={setTheme}
          theme={theme}
          ChangeAllData={ChangeAllData}
          AllData={AllData}
          ChangeSelectedBoard={ChangeSelectedBoard}
          selectedBoard={selectedBoard}
        />
        <RightSide 
          showMessageDelete={showMessageDelete}
          theme={theme}
          AllData={AllData}
          setAllData={setAllData}
          changeAllData={changeAllData} 
          selectedBoard={selectedBoard} 
        />
      </div>
        <div className="desktopDiv" style={{display:"flex"}}>
          <DesktopDrawer
            setTheme={setTheme}
            theme={theme}
            AllData={AllData}
            ChangeSelectedBoard={ChangeSelectedBoard}
            selectedBoard={selectedBoard}
            ChangeAllData={ChangeAllData}
          />
          <div style={{backgroundColor:`${theme ? "#20212C":""}`}} className="Columns">
            {createColumn}
            <CreateNewColumn 
              theme={theme}
              setAllData={setAllData} 
              AllData={AllData} 
              selectedBoard={selectedBoard}
            />
          </div>
        </div>
      {IsOpen 
        && <UpdateTask 
              
                theme={theme}
                showMessageDelete={showMessageDelete}
                setAllData={setAllData} 
                selectedBoard={selectedBoard} 
                allData={AllData} 
                IsOpen={IsOpen} 
                SetIsOpen={SetIsOpen} 
                taskData={taskData} 
            />}
    </div>
  );
};

export default MainPage;
