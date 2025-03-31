import { useState } from "react";
import Folder from "./components/Folder";
import "./styles.css";
import explorer from "./data/folderData"
import useTraverseTree from "./hooks/useTraverselTree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    setExplorerData(insertNode(explorerData, folderId, item, isFolder));
  }
  
  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}

// fix connect script in latest video