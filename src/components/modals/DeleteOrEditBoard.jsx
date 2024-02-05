import Buttons from "../GeneralComponent/Button"

const DeleteOrEdit = ({
    IsOpen,
    changeIsOpenEditBoard,
    changeIsOpenDeleteOrEdit,
    changeIsOpenDelete,
    theme,
    language
    
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
                color="#828FA3"
                title={language ? "Edit Board":"Tahtayı Düzenle"}
            />
            <Buttons
                onClick={setDeleteModal}
                color="#EA5555"
                title={language ? "Delete Board":"Tahtayı Sil"}
            />
        </div>
    )
}

export default DeleteOrEdit