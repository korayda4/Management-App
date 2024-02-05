import { Modal, Input } from 'antd';
import { useState } from 'react';
import MyInput from '../GeneralComponent/Input';
import Buttons from '../GeneralComponent/Button';
import { Button, message, Space } from 'antd';

const AddBoardModal = ({
  AddColumnObject,
  IsOpen,
  SetIsOpen,
  setBoardName,
  BoardName,
  AllData,
  ChangeAllData,
  language
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [inputValue, setInputValue] = useState("");
  const [newInputs, setNewInputs] = useState([]);

  const addBoard = () => {
    if (inputValue == ""){
      messageApi.open({
        type: 'warning',
        content: `${language ? 'Please Enter Board Name!':"Lütfen Pano İsmi Girin"}`,
      });
      return
    }
    let newObj = {
      name: inputValue,
      columns: [
        { name: "Todo", tasks: [] },
        { name: "Doing", tasks: [] },
        ...newInputs.map((input) => ({ name: input, tasks: [] })),
      ],
    };

    ChangeAllData([...AllData["boards"], newObj]);

    messageApi.open({
      type: 'success',
      content: `${language ? 'New Board Succesfuly Created':"Yeni Pano başarıyla oluşturuldu"}`,
    });
    SetIsOpen();
    setInputValue("");
    setNewInputs([]);

  };

  const addNewInput = () => {
    const newInputValue = ``;
    setNewInputs([...newInputs, newInputValue]);
  };

  const deleteInput = (e) => {
    console.log(e);
    const deleteSelectedInput = newInputs.filter((_,i) => i != e)
    console.log(deleteSelectedInput);
    setNewInputs(deleteSelectedInput)
  }

  return (
    <Modal
      centered={true}

      footer={null}
      title={language ? "Add New Board":"Yeni Pano Oluştur"}
      open={IsOpen}
      onOk={addBoard}
      onCancel={() => {
        SetIsOpen();
        // Input değerini sıfırla
        setInputValue("");
        setNewInputs([]);
      }}
      cancelText="Vazgeç"
      okText="Oluştur"
    >
      {contextHolder}
      <div className="AddNewBoard">
        <span style={{marginTop:"12px"}}>{language ? "Board Name":"Pano Adı"}</span>
        <MyInput
          marginB={"16px"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Board Name"
        />
        <span>{language ? "Board Columns":"Pano Sütunları"}</span>
        <div className="CreateNewColumnsInput">
          <Input placeholder="Todo" disabled />
          <img src="image/Group 18.png" alt="Delete icon" style={{ height: "16px" }} />
        </div>
        <div className="CreateNewColumnsInput">
          <Input placeholder="Doing" disabled />
          <img src="image/Group 18.png" alt="Delete icon" style={{ height: "16px" }} />
        </div>
        {newInputs.map((input, index) => (
          <div id={index} className="CreateNewColumnsInput" key={index}>
            <Input
              placeholder={language ? "Enter Column Name":"Sütun ismi gir"} 
              value={input}
              onChange={(e) => {
                const updatedInputs = [...newInputs];
                updatedInputs[index] = e.target.value;
                setNewInputs(updatedInputs);
              }}
            />
            <img id={index} onClick={(e) => {deleteInput(e.target.id)}} src="image/Group 18.png" alt="Delete icon" style={{ height: "16px" }} />
          </div>
        ))}

        <Buttons
          onClick={addNewInput}
          radius="32px"
          title={language ? "+Add New Column":"+Yeni Sütun Ekle"}
          color="#635FC7"
          bgcolor="#635FC71A"
          width={"100%"}
          pg={"12px"}
          marginB="6px"
        />
        <Buttons
          onClick={() => {
            addBoard();
          }}
          radius="32px"
          title={language ? "Create New Board":"Yeni Pano Oluştur"}
          color="white"
          bgcolor="#635FC7"
          width={"100%"}
          pg={"12px"}
        />
      </div>
    </Modal>
  );
};

export default AddBoardModal;
