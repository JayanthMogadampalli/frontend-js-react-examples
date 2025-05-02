function isBalancedTree (root){
    function dfs() {
        if(!node) {
            return 0;
        }

        const left = dfs(node.left);
        const right = dfs(node.right);

        if(left === -1 || right === -1) {
            return -1;
        }
        if(Math.abs(left - right) > 1) {
            return -1;
        }
        return Math.max(left, right) + 1;
    }

    return dfs(root) !== -1;
}

function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  }

  
  function diameterOfBinaryTree(){
        let diameter = 0;

        function dfs(node){
            if(!node) return 0;
          
            const left = dfs(node.left);
            const right = dfs(node.right);

            diameter = Math.max(diameter, left + right);
            return Math.max(left, right) + 1;
        }

        dfs(root);

        return diameter;
  }

  function invertTree(root) {
    if(!root) return null;
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
    }
    
  function areTreesIdentical(p, q) {
     if(!p && !q) return true;
     if(!p || !q) return false;

     if(p.val !== q.val) return false;
   
     return areTreesIdentical(p.left, q.left) && areTreesIdentical(p.right, q.right);
  }


  function lowestCommonAncestor(root, p, q) {
    if(!root) return null;

    if(p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    if(p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }

    return root;
    
  }

  function isValidBST(root) {
    
  }

  function levelOrderTraversal(root) {
    if(!root) return [];

    const queue = [];
    const result = [];

    queue.push(root);

    while(queue.length) {
        const level = [];
        const size = queue.length;

        for(let i = 0; i< size; i++) {
            const node = queue.shift();
            level.push(node.val);

            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

        result.push(level);
    }

    return result;

  }