import Buttons from "../GeneralComponent/Button"
import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const DeleteBoard = ({IsOpenDelete,setIsOpenDelete,selectedBoard,AllData,setAllData,changeAllData,showMessageDelete}) => {
    const [temporaryData, setTemporaryData] = useState({ ...AllData });

    const changeIsOpenDelete = () => {
        setIsOpenDelete(!IsOpenDelete)
    }

    const handleDeleteBoard = () => {
        const allDataCopy = { ...temporaryData };
        showMessageDelete("Board","Deleted")
        allDataCopy.boards.splice(selectedBoard, 1)
        setAllData(allDataCopy)
        changeIsOpenDelete()
    }

    return (
        <>
            <Modal 
                style={{width:"480px",color:"#828FA3",font:"13px"}}
                footer={null} 
                title="Delete this Board?" 
                open={IsOpenDelete} 
                centered={true}
                closeIcon={null}
            >
                <p>Are you sure you want to delete the ‘{AllData.boards[selectedBoard].name}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                <div className="section">
                    <Buttons
                        onClick={handleDeleteBoard}
                        title={"Delete"}
                        bgcolor="#EA5555"
                        width={"200px"}
                        height={"40px"}
                        radius={"20px"}
                        color={"white"}
                    />
                    <Buttons
                        onClick={changeIsOpenDelete}
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

export default DeleteBoard