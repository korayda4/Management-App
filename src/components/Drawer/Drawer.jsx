import { useState } from "react"
import AddBoardModal from "../modals/AddBoardModal"
import Buttons from "../GeneralComponent/Button"

const Drawer = ({ChangeSelectedBoard,selectedBoard,changeAllData,setAllData,AllData}) => {
    const [IsOpen , setIsOpen] = useState(false)

    const ChangeIsOpen = () => {
        setIsOpen(!IsOpen)
    }

    const ChangeBoard = ( e ) => {
        let newName = AllData["boards"].find((x,i) => e == i ).name
        setBoardName(newName)
        ChangeSelectedBoard(e)
    }

    const setAddBoardModal = () => {
        setIsOpen(!IsOpen)
    }
    const Toplam = AllData["boards"].length
    return(
        <div style={IsOpen ? {display:"block"}:{display:"none"}} className="ColumnModal">
            <div className="ModalColumns" >
                Toplam ({Toplam})
                {AllData["boards"][selectedBoard].name}
                <div className="NewBoardText">
                    <img src="../../../public/image/fluent_board-split-24-regular.png" alt="classİcon" onClick={setAddBoardModal}/> 
                    <span onClick={setAddBoardModal}>+Create New Board</span>
                </div>
            </div>         
            <hr />
            <Buttons 
                onClick={() => {ShowColumnModal()}} 
                radius="8px" 
                title="vazgeç" 
                color="white"
                bgcolor="purple"
                // width="22px"
            />
            <AddBoardModal 
                IsOpen={IsOpen} 
                SetIsOpen={ChangeIsOpen}
                AllData={AllData}
                ChangeAllData={changeAllData}
            />
        </div>
    )
}

export default Drawer