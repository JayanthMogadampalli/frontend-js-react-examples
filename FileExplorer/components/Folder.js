import { useState } from "react";

function Folder({ handleInsertNode = () => {}, explorer }) {
   const [expand, setExpand] = useState(false);
   const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false
   });

   const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({ visible: true, isFolder });
   }

    const onAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      
            setShowInput({ ...showInput, visible: false });
        }
    }
  
   if(explorer.isFolder) {
     return (
        <div style={{marginTop: "10px"}}>
            <div onClick={() => setExpand(!expand)} className="folder">
                <span>🗂️ {explorer.name} </span> 
                <div>
                  <button onClick={(e) => handleNewFolder(e, true)}>New Folder</button>
                    <button onClick={(e) => handleNewFolder(e, false)}>New File</button>
                </div>    
           </div>
            {showInput.visible && (
             <div className="inputContainer">
                <span>{showInput.isFolder ? "🗂️"  : "📁" } </span>
                <input
                  type="text"
                  onKeyDown={onAddFolder}
                  autoFocus
                  className="inputContainer__input"
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                />
            </div>
            )}

            {expand && explorer.items.map((item) => (
                <Folder key={item.id} handleInsertNode={handleInsertNode} explorer={item} />
            ))}
        </div>
     )
   } else {
    return <span className="file">📄 {explorer.name}</span>;
   }
}


    export default Folder;