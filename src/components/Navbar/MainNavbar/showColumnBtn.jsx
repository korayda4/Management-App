import AddClassModal from "../../modals/ClassModal"
import { useState } from "react"

const ColumnBtn = ({ChangeAllData,ShowColumn,ShowColumnModal,selectedBoard,AllData,ChangeSelectedBoard,theme,setTheme}) => {
    return(
        <>
            <img id="mobileShowColumns" onClick={ShowColumnModal} src="image\Path 3.svg" alt="" />
            <AddClassModal 
                setTheme={setTheme}
                theme={theme}
                selectedBoard={selectedBoard}
                AllData={AllData}
                ChangeAllData={ChangeAllData}
                ShowColumnModal={ShowColumnModal} 
                ChangeSelectedBoard={ChangeSelectedBoard} 
                show={ShowColumn} 
            />
        </>
        
    )
}

export default ColumnBtn;