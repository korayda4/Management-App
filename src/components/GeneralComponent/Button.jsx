const Buttons = ({pg,bgcolor,title , radius , color ,onClick,width,position,marginB,height}) => {
    return( 
        <button 
            style={{
                border:"none",
                padding:pg,
                color:color,
                backgroundColor:bgcolor,
                borderRadius:radius,
                height:height,
                width:width,
                position:position,
                marginBottom:marginB
            }} 
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Buttons;