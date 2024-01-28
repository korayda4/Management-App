import React, { useState } from 'react';
import { Button,Input,message } from 'antd';

const CreateNewColumn = ({ setAllData, AllData, selectedBoard , theme }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [showModal, setShowModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewColumnName(''); // Modal kapatıldığında input değerini sıfırla
  };

  const handleInputChange = (e) => {
    setNewColumnName(e.target.value);
  };

  const handleCreateColumn = () => {
    if (newColumnName.trim() === '') {
      // Boş isim girişi engelleniyor
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

    // Yeni sütunu ekleyin, ancak AllData'yı doğrudan değiştirmeyin
    const updatedBoards = [...AllData.boards];
    updatedBoards[selectedBoard].columns.push(newCol);

    // setAllData ile güncellenmiş kopyayı state'e atayın
    setAllData({ ...AllData, boards: updatedBoards });

    // Modalı kapat ve input değerini sıfırla
    handleModalClose();
  };

  return (
    <div style={{backgroundColor:`${theme ? "#2B2C3740":""}`}}  className="createColumnDiv">
      {contextHolder}
      <div style={{cursor:"pointer",color:"#828FA3"}} onClick={handleModalOpen}>+Create New Column</div>

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
              placeholder='Enter Column Name'
            />
            
            <Button style={{backgroundColor:"#635FC7",color:"white",borderRadius:"20px"}} onClick={handleCreateColumn}>Create Column</Button>
            
            <label>Note:Create New Column</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewColumn;
