function reverseKGroups (head, k) {
   const dummy = new ListNode(0);
   dummy.next = head;
   let prevGroupEnd = dummy;
   
   while (prevGroupEnd !== null) {
         let groupStart = prevGroupEnd.next;
         let groupEnd = prevGroupEnd;
         for (let i = 0; i < k && groupEnd !== null; i++) {
              groupEnd = groupEnd.next;
         }
         if (groupEnd === null) break;
    
         let nextGroupStart = groupEnd.next;
         let prev = nextGroupStart;
         let curr = groupStart;
    
         while (curr !== nextGroupStart) {
              const nextTemp = curr.next;
              curr.next = prev;
              prev = curr;
              curr = nextTemp;
         }
    
         prevGroupEnd.next = groupEnd;
         groupStart.next = nextGroupStart;
         prevGroupEnd = groupStart;
   }
}


function reverseBetween(head, left, right){
        if (!head || left === right) return head;

        let dummy = new ListNode(0);
        dummy.next = head;
        let prev = dummy;

        for(let i = 0; i < left - 1; i++){
            prev = prev.next;
        }

        let curr = prev.next;

        for(let i = 0; i < right - left; i++){
            let temp = curr.next;
            curr.next = temp.next;
            temp.next = prev.next;
            prev.next = temp;
        }

        return dummy.next;
}