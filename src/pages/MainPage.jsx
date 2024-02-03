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
  const [AllData, setAllData] = useState(() => {
    const storedData = localStorage.getItem('myData');
    return storedData ? JSON.parse(storedData) : allData;
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    // AllData güncellendiğinde local storage'a kaydet
    localStorage.setItem('myData', JSON.stringify(AllData));
  }, [AllData]);

  const ChangeSelectedBoard = (x) => {
    setSelectedBoard(x);
  };

  const showMessageDelete = (title1,type) => {
    messageApi.open({
      type: type,
      content: `${title1}`,
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

  const UpdateLocalStorage = () => {
    const data = { example: 'data' };
    const jsonData = JSON.stringify(data);
    localStorage.setItem('myData', jsonData);
  }

  const dragTask = (e) => {
    // Burada task sürükleme işlemlerini gerçekleştirebilirsiniz
  }

  const createColumn = AllData.boards[selectedBoard]?.columns.map((column, columnIndex) => {
    if (column == "") return
    const createColumnTask = column.tasks.map((task, taskIndex) => {
      const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;

      return (
        <div 
          draggable={true}
          onDrag={(e) => dragTask(e)}
          onDragEnd={(e) => {console.log(e)}}
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

    const oval = ["image/Oval.png","image/Oval (1).png","image/Oval (2).png","image/Oval.png","image/Oval (1).png","image/Oval (2).png"];

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
          setSelectedBoard={setSelectedBoard}
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
