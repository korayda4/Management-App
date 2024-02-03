import React, { useState } from "react";
import { Switch } from 'antd';
import AddBoardModal from "../../modals/AddBoardModal";

const DesktopDrawer = ({
    ChangeAllData,
    selectedBoard,
    ChangeSelectedBoard,
    AllData,
    setTheme,
    theme,
    show,
    ShowColumnModal
}) => {

    const [IsOpen , setIsOpen] = useState(false)
    const [DesktopColumnIsOpen , setDesktopColumnIsOpen] = useState(true)
  
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
        <div key={i} onClick={(e) => ChangeBoard(e.target.id)} id={i} className={`DesktopModalColumnNames ${selectedBoard == i ? "active":"deactive"}`}>
            <img src="image/fluent_board-split-24-regular.png" alt="classİcon" />
            {x.name}
        </div>
    )})

    const Toplam = AllData["boards"].length
    console.log(DesktopColumnIsOpen);
    return (
        <> 
            <div style={{backgroundColor:`${theme ? "#2B2C37":""}`}} className={`desktopColumn ${DesktopColumnIsOpen ? "active":"deactive"}`}>
                <div className="upper" style={{display:"flex",gap:"6px",flexDirection:"column"}}>
                    <span style={{textAlign:"left",margin:"12px 12px 12px 38px"}} className="allBoardsText">ALL BOARDS ({Toplam})</span>
                    <div className="ModalColumns" >
                        {BoardName}
                    </div> 
                    <div style={{marginBottom:"24px"}} className="NewBoardText">
                        <img src="image/fluent_board-split-24-regular.png" alt="classİcon" onClick={setAddBoardModal}/> 
                        <span onClick={setAddBoardModal}>+Create New Board</span>
                    </div>
                </div>        
                <div className="drawerBottom" style={{position:"absolute",bottom:"10px",left:"0"}}>
                    <div style={{backgroundColor:`${theme ? "#20212C":""}`}} className="DesktopSetTheme">
                        <div  className="switch">
                            <img src="image\Combined Shape (1).png" alt="" />
                            <Switch style={{backgroundColor:"#635FC7",width:"12px"}} defaultChecked={theme} onChange={() => {setTheme(!theme)}} />
                            <img src="image\Combined Shape.png" alt="" />
                        </div>
                    </div>
                    <div className="hideSideBar" onClick={() => {setDesktopColumnIsOpen(!DesktopColumnIsOpen)}}>
                        <img style={{cursor:"pointer"}} src="image\eye-slash.1.png" alt="eye-Slash" />
                        <span style={{cursor:"pointer"}}>Hide Sidebar</span>
                    </div>
                </div>
                <AddBoardModal 
                    IsOpen={IsOpen} 
                    SetIsOpen={ChangeIsOpen}
                    AllData={AllData}
                    ChangeAllData={ChangeAllData}
                />
            </div>
            <div  className="openDesktopColumns" style={DesktopColumnIsOpen ? {display:"none" }:{display:"flex"}} onClick={() => {setDesktopColumnIsOpen(!DesktopColumnIsOpen)}}>
                <img style={{cursor:"pointer"}} src="image\eye.png" alt="eye" />
            </div>
        </>
       
    )
}

export default DesktopDrawer;