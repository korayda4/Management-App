import { useState } from "react"
import ColumnBtn from "./showColumnBtn";

const LeftSide = ({ChangeAllData,AllData,ChangeSelectedBoard,selectedBoard,theme,setTheme}) => {
    const [ShowColumn,setShowColumn] = useState("false")

    const ShowColumnModal = () => {
        setShowColumn(!ShowColumn)
    }

    return(
        <div className="LeftSide">
            <img id="mobileİconKanban" src="Group 15.svg" alt="" />
            {theme ? <img id="desktopİconKanban" src="image\Group 16 (1).png" alt="" />:<img id="desktopİconKanban" src="image\Group 16.png" alt="" />}
            <span style={{color:`${theme ? "white":""}`}}>{AllData["boards"][selectedBoard].name}</span>
            <ColumnBtn 
                setTheme={setTheme}
                theme={theme}
                ShowColumn={ShowColumn}
                ShowColumnModal={ShowColumnModal}
                selectedBoard={selectedBoard}
                ChangeAllData={ChangeAllData}
                AllData={AllData}
                ChangeSelectedBoard={ChangeSelectedBoard} 
            />
        </div>
    )
}

export default LeftSide;