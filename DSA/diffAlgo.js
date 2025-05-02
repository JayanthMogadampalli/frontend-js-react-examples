function isSameNode(oldNode, newNode) {
    if(oldNode.type !== newNode.type) {
        return false;
    }

    const props1 = oldNode.props;
    const props2 = newNode.props;


    const keys1 = Object.keys(props1);
    const keys2 = Object.keys(props2);

    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
        if (props1[key] !== props2[key]) return false;
    }

    return true;
}

function diffTrees(oldNode, newNode) {
    if(!oldNode) {
        console.log('Node added:', newNode);
    }
    if(!newNode) {
        console.log('Node removed:', oldNode);
    }

    if(!isSameNode(oldNode, newNode)) {
        console.log('Node changed:', {oldNode, newNode});
        return;
    }


    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const max = Math.max(oldChildren.length, newChildren.length);

    for(let i = 0; i< max; i++){
        diffTrees(oldChildren[i], newChildren[i]);
    }
}

const oldTree = {
    type: 'div',
    props: { id: 'container' },
    children: [
      { type: 'h1', props: { style: 'color:blue' }, children: [] },
      { type: 'p', props: { className: 'text' }, children: [] }
    ]
  };
  
  const newTree = {
    type: 'div',
    props: { id: 'container' },
    children: [
      { type: 'h1', props: { style: 'color:red' }, children: [] }, // style changed
      { type: 'span', props: { className: 'text' }, children: [] }  // tag changed
    ]
  };
  
  diffTrees(oldTree, newTree);