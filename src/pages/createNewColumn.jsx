import React, { useState } from 'react';
import { Button,Input,message } from 'antd';

const CreateNewColumn = ({ setAllData, AllData, selectedBoard , theme ,language}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showModal, setShowModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewColumnName('');
  };

  const handleInputChange = (e) => {
    setNewColumnName(e.target.value);
  };

  const handleCreateColumn = () => {
    if (newColumnName.trim() === '') {
      messageApi.open({
        type: 'warning',
        content: 'Please Enter Column Name ',
      })
      return;
    }

    const newCol = {
      name: newColumnName,
      tasks: [],
    };

    const updatedBoards = [...AllData.boards];
    updatedBoards[selectedBoard].columns.push(newCol);

    setAllData({ ...AllData, boards: updatedBoards });

    handleModalClose();
  };

  return (
    <div style={{backgroundColor:`${theme ? "#2B2C3740":""}`}}  className="createColumnDiv">
      {contextHolder}
      <div style={{cursor:"pointer",color:"#828FA3"}} onClick={handleModalOpen}>{language ? "+Create New Column":"+Yeni Sütun oluştur"}</div>

      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent"> 
            
            <span style={{color:"white",fontSize:"30px"}} onClick={handleModalClose} className="closeButton">
              &times;
            </span>
            <Input
              type="text"
              value={newColumnName}
              onChange={handleInputChange}
              placeholder={language ?'Enter Column Name':"Sütun ismi gir"}
            />
            <Button style={{backgroundColor:"#635FC7",color:"white",borderRadius:"20px"}} onClick={handleCreateColumn}>{language ? "Create Column":"Yeni Sütun Oluştur"}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewColumn;
