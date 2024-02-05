import Buttons from "../GeneralComponent/Button"
import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const DeleteBoard = ({IsOpenDelete,setIsOpenDelete,selectedBoard,AllData,setAllData,changeAllData,showMessageDelete,setSelectedBoard,language}) => {
    const [temporaryData, setTemporaryData] = useState({ ...AllData });

    const changeIsOpenDelete = () => {
        setIsOpenDelete(!IsOpenDelete)
    }

    const handleDeleteBoard = () => {
        
        const allDataCopy = { ...temporaryData };
        if(AllData["boards"].length <= 1){return (showMessageDelete("could not be deleted because there is no other board","error","Başka pano bulunmadığı için silemezsiniz"))}
        showMessageDelete("Board was deleted","success","Pano başarıyla silindi")
        allDataCopy.boards.splice(selectedBoard, 1)
        selectedBoard == 0 ? setSelectedBoard(0):setSelectedBoard(selectedBoard-1)
        setAllData(allDataCopy)
        changeIsOpenDelete()
    }

    return (
        <>
            <Modal 
                style={{width:"480px",color:"#828FA3",font:"13px"}}
                footer={null} 
                title={language ? "Delete this Board?" :"Bu Pano Silinsin mi?"}
                open={IsOpenDelete} 
                centered={true}
                closeIcon={null}
            >
                <p>{language ? `Are you sure you want to delete the ‘${AllData.boards[selectedBoard].name}’ board? This action will remove all columns and tasks and cannot be reversed.`:`${AllData.boards[selectedBoard].name} Panosunu silmek istediğinizden emin misiniz? Bu işlem tüm sütunları ve görevleri kaldıracaktır ve geri alınamaz.`}</p>
                <div className="section">
                    <Buttons
                        onClick={handleDeleteBoard}
                        title={language ? "Delete":"Sil"}
                        bgcolor="#EA5555"
                        width={"200px"}
                        height={"40px"}
                        radius={"20px"}
                        color={"white"}
                    />
                    <Buttons
                        onClick={changeIsOpenDelete}
                        title={language ? "Cancel":"Vazgeç"}
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