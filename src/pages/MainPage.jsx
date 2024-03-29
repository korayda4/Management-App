import React, { useEffect, useState } from "react";
import LeftSide from "../components/Navbar/MainNavbar/MainNavbarLeftside";
import RightSide from "../components/Navbar/MainNavbar/MainNavbarRightside";
import allData from "../data/all.json";
import UpdateTask from "../components/modals/UpdateTask";
import CreateNewColumn from "./createNewColumn";
import DesktopDrawer from "../components/Navbar/MainNavbar/desktopDrawer";
import { message, Spin } from 'antd';

const MainPage = () => {
  const [language , setLanguage] = useState(true)
  const [IsOpen, SetIsOpen] = useState(false);
  const [taskData, SetTaskData] = useState({});
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [AllData, setAllData] = useState(() => {
    const storedData = localStorage.getItem('myData');
    return storedData ? JSON.parse(storedData) : allData;
  });
  const [dragedTask , setDragedTask] = useState("")
  const [OnDragedTask , setOnDragedTask] = useState("")
  const [messageApi, contextHolder] = message.useMessage();
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : false;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [AllData]);

  // useEffect(() => {
  //   localStorage.setItem('myData', JSON.stringify(language));
  // }, [language]);

  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(AllData));
  }, [AllData]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const ChangeSelectedBoard = (x) => {
    setSelectedBoard(x);
  };

  const showMessageDelete = (title1, type , titletr) => {
    messageApi.open({
      type: type,
      content: `${language ? title1:titletr}`,
    });
    console.log("deneme");
  };

  const changeAllData = (x) => {
    setAllData(x);
  };

  const ChangeAllData = (x) => {
    setAllData({ boards: x });
  };

  const UpdateTaskModal = (e) => {
    SetTaskData([e.target.dataset.value, e.target.id]);
    SetIsOpen(!IsOpen);
  };

  const dragTask = () => {
    const temporaryData = {...AllData}
    const veriableName = temporaryData["boards"][selectedBoard].columns
    if(veriableName[dragedTask.dataset.value] == veriableName[OnDragedTask.dataset.value]){
      showMessageDelete("You can't do it","error")
    }else {
      const AddedTask = veriableName[dragedTask.dataset.value].tasks[dragedTask.id]
      AddedTask.status = veriableName[OnDragedTask.dataset.value].tasks[OnDragedTask.id].status
      veriableName[dragedTask.dataset.value].tasks.splice(dragedTask.id,1)
      veriableName[OnDragedTask.dataset.value].tasks.push(AddedTask)
      setAllData(temporaryData)
      showMessageDelete("Task Status Successfuly Update","success");
    }
  };

  const createColumn = AllData.boards[selectedBoard]?.columns.map((column, columnIndex) => {
    if (column === "") return;
    const createColumnTask = column.tasks.map((task, taskIndex) => {
      const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;

      return (
        <div
          draggable={true}
          onDragStart={(e) => {setDragedTask(e.target)}}
          onDragOver={(e) => {setOnDragedTask(e.target)}}
          onDragEnd={dragTask}
          style={{ backgroundColor: `${theme ? "#2B2C37" : ""}`, color: `${theme ? "#828FA3" : ""}` }}
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
              style={{ color: `${theme ? "white" : ""}` }}
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

    const oval = ["image/Oval.png", "image/Oval (1).png", "image/Oval (2).png", "image/Oval.png", "image/Oval (1).png", "image/Oval (2).png"];

    return (
      <div className="column" style={{ textAlign: "left" }} id={columnIndex} key={columnIndex}>
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
    <div style={{ backgroundColor: `${theme ? "#2B2C37" : ""}` }} className="MainNavbar">
      <LeftSide
        setTheme={setTheme}
        theme={theme}
        ChangeAllData={ChangeAllData}
        AllData={AllData}
        ChangeSelectedBoard={ChangeSelectedBoard}
        selectedBoard={selectedBoard}
      />
      <RightSide
        language={language}
        setSelectedBoard={setSelectedBoard}
        showMessageDelete={showMessageDelete}
        theme={theme}
        AllData={AllData}
        setAllData={setAllData}
        changeAllData={changeAllData}
        selectedBoard={selectedBoard}
      />
    </div>
    <div className="desktopDiv" style={{ display: "flex" }}>
      <DesktopDrawer
        setTheme={setTheme}
        setLanguage={setLanguage}
        language={language}
        theme={theme}
        AllData={AllData}
        ChangeSelectedBoard={ChangeSelectedBoard}
        selectedBoard={selectedBoard}
        ChangeAllData={ChangeAllData}
      />
      <div style={{ backgroundColor: `${theme ? "#20212C" : ""}` }} className="Columns">
        {loading ? (
          <div className="loading-overlay">
            <div className="loading-spinner">
              <Spin size="large" />
            </div>
          </div>
        ) : (
          createColumn
        )}
        <CreateNewColumn
          language={language}
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
        language={language}
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
