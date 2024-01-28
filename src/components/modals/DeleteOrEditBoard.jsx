import Buttons from "../GeneralComponent/Button"

const DeleteOrEdit = ({
    IsOpen,
    changeIsOpenEditBoard,
    changeIsOpenDeleteOrEdit,
    changeIsOpenDelete,
    theme
    
}) => {

    const setEdits = () => {
        changeIsOpenDeleteOrEdit();
        changeIsOpenEditBoard();
    }

    const setDeleteModal = () => {
        changeIsOpenDeleteOrEdit();
        changeIsOpenDelete();
    }

    return (
        <div style={{display:`${IsOpen ? "flex":"none"}`,backgroundColor:`${theme ? "#2B2C37":""}`}} className="DeleteOrEdit">
            <Buttons
                onClick={setEdits}
                title={"Edit Board"}
                color="#828FA3"
            />
            <Buttons
                onClick={setDeleteModal}
                color="#EA5555"
                title={"Delete Board"}
            />
        </div>
    )
}

export default DeleteOrEdit