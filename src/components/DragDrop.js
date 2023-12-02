import React, {createRef, useEffect, useState} from 'react';
import {alpha} from "@mui/material/styles";

function DragDrop(props) {
    const {handleDropFile, id, color} = props
    const dropRef = createRef();
    const [dragging, setDragging] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let newCounter = dragCounter+1
        setDragCounter(newCounter)
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true);
        }
    }
    const handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let newCounter = dragCounter-1
        setDragCounter(newCounter)
        if (newCounter > 0) return
        setDragging(false);
    }
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleDropFile(e.dataTransfer.files)
            e.dataTransfer.clearData()
            setDragCounter(0)
        }
    }

    useEffect(() => {
        let div = dropRef.current
        div.addEventListener('dragenter', handleDragIn)
        div.addEventListener('dragleave', handleDragOut)
        div.addEventListener('dragover', handleDrag)
        div.addEventListener('drop', handleDrop)

        return () => {
            div.removeEventListener('dragenter', handleDragIn)
            div.removeEventListener('dragleave', handleDragOut)
            div.removeEventListener('dragover', handleDrag)
            div.removeEventListener('drop', handleDrop)
        }
    })

    return (
        <div ref={dropRef}
             id = {id}
             style={{
                 borderRadius: '5px',
                 textAlign: "center",
                 backgroundColor: `${dragging ? alpha(`${color}`, 0.3)
                     : alpha(`${color}`, 0.1)}`,
             }}>
            {props.children}
        </div>
    );


}

export default DragDrop;