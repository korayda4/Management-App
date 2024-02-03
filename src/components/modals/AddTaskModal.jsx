import { Button, Input, Modal ,message, Space } from 'antd';
const { TextArea } = Input;
import { useState } from 'react';
import MyInput from '../GeneralComponent/Input';
import Buttons from '../GeneralComponent/Button';


const AddTaskModal = ({ IsOpenAddTask, ChangeIsOpenAddTask, selectedBoard, AllData, setAllData, changeAllData }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [newInputs, setNewInputs] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedStatus, setSelectedStatus] = useState("Todo");
    const [description, setDescription] = useState("Todo");

    const addNewInput = () => {
        const newInputValue = '';
        setNewInputs([...newInputs, newInputValue]);
    };

    const deleteInput = (index) => {
        const updatedInputs = newInputs.filter((_, i) => i !== index);
        setNewInputs(updatedInputs);
    };

    const createNewTask = () => {
        
        if (taskTitle == ""){
            messageApi.open({
                type: 'warning',
                content: 'Please Enter Title!',
            })
            return
        }
        messageApi.open({
            type: 'success',
            content: 'New Task Succesfuly Created',
        })
        const newTask = {
            title: taskTitle,
            description: description,
            status: selectedStatus,
            subtasks: newInputs.map((input) => ({
                title: input,
                isCompleted: false,
            })),
        
        };
        let columnIndex = AllData['boards'][selectedBoard].columns.findIndex((column) => column.name === selectedStatus);
        if (columnIndex == -1) {columnIndex = 0}
        const updatedData = { ...AllData };
        updatedData['boards'][selectedBoard].columns[columnIndex].tasks.push(newTask);
        changeAllData(updatedData);

        ChangeIsOpenAddTask();
    };

    return (
        <Modal
            centered={true}
            footer={null}
            title="Add New Task"
            open={IsOpenAddTask}
            onOk={null}
            onCancel={ChangeIsOpenAddTask}
            cancelText="Vazgeç"
            okText="Oluştur"
        >
            {contextHolder}
            <div className="AddTaskDiv">
                Title
                <MyInput
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Title"
                    marginB={"18px"}
                />
                Description
                <TextArea 
                    rows={4} 
                    placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
                    style={{maxHeight:"125px",minHeight:"100px",marginBottom:"18px"}}
                    onChange={(e) => {setDescription(e.target.value)}}
                />
                Subtasks
                <div className="newSubtaskInput">
                    {newInputs.map((input, index) => (
                        <div id={index} className="CreateNewColumnsInput" key={index}>
                            <Input
                                placeholder="Enter Subtask"
                                value={input}
                                onChange={(e) => {
                                    const updatedInputs = [...newInputs];
                                    updatedInputs[index] = e.target.value;
                                    setNewInputs(updatedInputs);
                                }}
                            />
                            <img
                                id={index}
                                onClick={() => deleteInput(index)}
                                src="image/Group 18.png"
                                alt="Delete icon"
                                style={{ height: '16px' }}
                            />
                        </div>
                    ))}
                </div>
                <Buttons
                    onClick={addNewInput}
                    radius="32px"
                    title="Create New Subtask"
                    color="#635FC7"
                    bgcolor="#635FC71A"
                    width="100%"
                    pg="12px"
                    marginB="16px"
                />
                Status
                <select
                    className="updateSubTask"
                    style={{ width: '100%' }}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    {IsOpenAddTask
                        ? AllData['boards'][selectedBoard].columns.map((column, index) => (
                              <option key={index} value={column.name}>
                                  {column.name}
                              </option>
                          ))
                        : null}
                </select>

                <Buttons
                    onClick={createNewTask}
                    radius="32px"
                    title="Create New Task"
                    color="white"
                    bgcolor="#635FC7"
                    width="100%"
                    pg="12px"
                />
            </div>
        </Modal>
    );
};

export default AddTaskModal;