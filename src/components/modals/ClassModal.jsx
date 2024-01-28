import { useState } from "react";
import Buttons from "../GeneralComponent/Button";
import AddBoardModal from "./AddBoardModal";
import { Switch } from 'antd';

const AddClassModal = ({ChangeAllData,selectedBoard,ChangeSelectedBoard,AllData,show,ShowColumnModal,setTheme,theme}) => {
    const [IsOpen , setIsOpen] = useState(false)
  
    const ChangeIsOpen = () => {
        setIsOpen(!IsOpen)
    }

    const ChangeBoard = ( e ) => {
        let newName = AllData["boards"].find((x,i) => e == i ).name
        ChangeSelectedBoard(e)
    }

    const setAddBoardModal = () => {
        setIsOpen(!IsOpen)
    }
    
    const BoardName = AllData["boards"].map((x,i) => {
        return(
        <div key={i} onClick={(e) => ChangeBoard(e.target.id)} id={i} className={`ModalColumnNames ${selectedBoard == i ? "active":"deactive"}`}>
            <img src="image/fluent_board-split-24-regular.png" alt="classİcon" />
            {x.name}
        </div>
    )})

    const Toplam = AllData["boards"].length
    
    return(
        <div style={{display:`${show ? "none":"block"}`,backgroundColor:`${theme ? "rgb(43,44,55)":""}`,border:"none"}} className="ColumnModal">
            <div className="ModalColumns" >
                <span className="allBoardsText">ALL BOARDS ({Toplam})</span>
                {BoardName}
                <div style={{marginBottom:"24px"}} className="NewBoardText">
                    <img src="image/fluent_board-split-24-regular.png" alt="classİcon" onClick={setAddBoardModal}/> 
                    <span onClick={setAddBoardModal}>+Create New Board</span>
                </div>
            </div>         
            <div style={{backgroundColor:`${theme ? "rgb(32,33,44)":""}`}} className="setTheme">
                <div className="switch" >
                    <img src="public\image\Combined Shape (1).png" alt="" />
                    <Switch style={{backgroundColor:"#635FC7",width:"12px"}} defaultChecked={theme} onChange={() => {setTheme(!theme)}}/>
                    <img src="public\image\Combined Shape.png" alt="" />
                </div>
            </div>
            <AddBoardModal 
                IsOpen={IsOpen} 
                SetIsOpen={ChangeIsOpen}
                AllData={AllData}
                ChangeAllData={ChangeAllData}
            />
        </div>
    )
}

export default AddClassModal;