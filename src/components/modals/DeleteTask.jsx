import Buttons from "../GeneralComponent/Button"
import React, { useState } from 'react';
import { Modal } from 'antd';

const DeleteTask = ({IsOpenDeleteTask,AllData,selectedBoard,selectedTaskIndex,selectedColumnIndex,handleChangeDeleteTask,changeAllData,setIsOpenDeleteTask,SetIsOpen,showMessageDelete}) => {
    const [temporaryData, setTemporaryData] = useState({ ...AllData });


    const handleDeleteTask = () => {
        const allDataCopy = { ...AllData  };
        showMessageDelete("Task was deleted","success")
        console.log(allDataCopy["boards"][selectedBoard]?.columns[selectedColumnIndex]?.tasks[selectedTaskIndex]);
        allDataCopy["boards"][selectedBoard]?.columns[selectedColumnIndex]?.tasks.splice(selectedTaskIndex, 1)
        changeAllData(allDataCopy)
        setIsOpenDeleteTask(!IsOpenDeleteTask)
        SetIsOpen()
        
    }

    return (
        <>  
            
            <Modal 
                style={{width:"480px",color:"#828FA3",font:"13px"}}
                footer={null} 
                title="Delete this Task?" 
                open={IsOpenDeleteTask} 
                centered={true}
                closeIcon={null}
            >    
                
                <p>Are you sure you want to delete the ‘{AllData.boards[selectedBoard].columns[selectedColumnIndex].tasks[selectedTaskIndex].title}’ task? This action will remove all columns and tasks and cannot be reversed.</p>
                <div className="section">
                    <Buttons
                        onClick={handleDeleteTask}
                        title={"Delete"}
                        bgcolor="#EA5555"
                        width={"200px"}
                        height={"40px"}
                        radius={"20px"}
                        color={"white"}
                    />
                    <Buttons
                        onClick={handleChangeDeleteTask}
                        title={"Cancel"}
                        bgcolor="#635FC740"
                        width={"200px"}
                        height={"40px"}
                        radius={"20px"}
                        color="#635FC7"
                    />
                </div>
            </Modal>
        </>
    )
}

export default DeleteTask