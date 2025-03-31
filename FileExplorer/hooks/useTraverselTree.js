const useTraverseTree = () => {
    // Add a file or folder in tree
    // Can be optimised using Dynamic Programming
    const insertNode = function (tree, folderId, item, isFolder) {
        if(tree.id === folderId) {
            tree.items.unshift({
                id: Math.random(),
                name: item,
                isFolder,
                items: []
            });
            return tree;
        }

        let latestNode = [];
        latestNode = tree.items.map((node) => {
            return insertNode(node, folderId, item, isFolder);
        }); 

        return {
            ...tree,
            items: latestNode
        };
    };
  
    const deleteNode = () => {}; // Do it Yourself
  
    const renameNode = () => {}; // Do it Yourself
  
    return { insertNode, deleteNode, renameNode };
  };
  
  export default useTraverseTree;