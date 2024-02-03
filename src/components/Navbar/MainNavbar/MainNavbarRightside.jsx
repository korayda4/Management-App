import { useState } from "react";
import AddTaskModal from "../../modals/AddTaskModal";
import EditBoard from "../../modals/EditBoard";
import DeleteOrEdit from "../../modals/DeleteOrEditBoard";
import DeleteBoard from "../../modals/DeleteBoard";

const RightSide = ({selectedBoard,AllData,changeAllData,setAllData,theme,showMessageDelete,setSelectedBoard}) => {
    const [IsOpenAddTask,setIsOpenAddTask] = useState(false)
    const [IsOpenEditBoard,setIsOpenEditBoard] = useState(false)
    const [IsOpenDeleteOrEdit,setIsOpenDeleteOrEdit] = useState(false)
    const [IsOpenDelete,setIsOpenDelete] = useState(false)


    const ChangeIsOpenAddTask = () => {
        setIsOpenAddTask(!IsOpenAddTask)
    }

    const changeIsOpenEditBoard = () => {
        setIsOpenEditBoard(!IsOpenEditBoard)
    }

    const changeIsOpenDeleteOrEdit = () => {
        setIsOpenDeleteOrEdit(!IsOpenDeleteOrEdit)
    }

    const changeIsOpenDelete = () => {
        setIsOpenDelete(!IsOpenDelete)
    }
    console.log(AllData.boards[selectedBoard].name);
    return(
        <div className="RightSide">
            <button id="plus"  onClick={ChangeIsOpenAddTask}>
                + Add New Task
            </button>
            <button id="mobilePlus"  onClick={ChangeIsOpenAddTask}>
                <img src="image\Group 27.svg" alt="" />
            </button>
            <button onClick={changeIsOpenDeleteOrEdit}>
                <img onClick={changeIsOpenDeleteOrEdit} src="image\Group 6.svg" alt="" />
            </button>
            <DeleteOrEdit
                theme={theme}
                changeIsOpenDeleteOrEdit={changeIsOpenDeleteOrEdit}
                changeIsOpenEditBoard={changeIsOpenEditBoard}
                changeIsOpenDelete={changeIsOpenDelete}
                IsOpen={IsOpenDeleteOrEdit}
            />
            <DeleteBoard 
                showMessageDelete={showMessageDelete}
                changeAllData={changeAllData}
                setAllData={setAllData}
                AllData={AllData}
                selectedBoard={selectedBoard}
                IsOpenDelete={IsOpenDelete}
                setIsOpenDelete={setIsOpenDelete}
                setSelectedBoard={setSelectedBoard}

            />
            <EditBoard 
                changeAllData={changeAllData}
                selectedBoard={selectedBoard}
                AllData={AllData}
                IsOpenEditBoard={IsOpenEditBoard}
                changeIsOpenEditBoard={changeIsOpenEditBoard}
            />
            <AddTaskModal
                setAllData={setAllData}
                changeAllData={changeAllData}                
                AllData={AllData}
                selectedBoard={selectedBoard}
                ChangeIsOpenAddTask={ ChangeIsOpenAddTask }
                IsOpenAddTask={ IsOpenAddTask }
            />
        </div>
    )
}

export default RightSide;