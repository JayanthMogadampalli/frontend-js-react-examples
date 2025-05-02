import React, {useState, useEffect, useMemo, useRef} from 'react';
import classnames from 'classnames';

const StyledBox = styled.div`
.boxes{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap:20px;
  padding: 50px;
  width: fit-content;
}

.box{
  width: 80px;
  height: 80px;
  transition: background-color 0.4s ease-in-out;
}

.box.visible{
  border: 1px solid black;
  cursor:pointer;
}

.box.hidden{
  opacity: 0;
  cursor: initial;
}

.box.selected{
  background-color: #0bcc59;
  cursor: not-allowed;
}
`;

const Shape = ({data}) => {
  const boxes = useMemo(() => data.flat(Infinity), [data]);
  const [selected, setSelected] = useState(new Set());
  const [deselect, setDeselct] = useState(false);
  const timerRef = useRef(null);

  const countOfVisibleBoxes =useMemo(() => {
    return boxes.reduce((acc, curr) => {
      if (box === 1) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [boxes]); 

  const handleClick = (e) => {
   const {target} = e;
   const index = target.getAttribute('data-index');
    const status = target.getAttribute('data-status');

    if(!index || status === 'hidden' || deselect || selected.has(index)){
        return 
      }

      setSelected(prev => 
        new Set(prev.add(index)));
  }

  const deselectHandler = () => {
    setDeselct(true);
    const keys = Array.from(selected.values());
    const removeNextKey = () =>{
        if(keys.length === 0){
            setDeselct(false);
            clearTimeout(timerRef.current);   
        } else {
            const currentKey = keys.shift();
            setSelected(prev => {
                const newSet = new Set(prev);
                newSet.delete(currentKey);
                return newSet;
            });
            timerRef.current = setTimeout(removeNextKey, 500);
        }
    }
    removeNextKey();
  }

  useEffect(() => {
    if(selected.size >= countOfVisibleBoxes){
        deselectHandler();
    }
    }, [selected]);

    return (
        <div className="boxes" onClick={handleClick}>
            {boxes.map((box, index) => {
             const status = box === 1 ? 'visible' : 'hidden';
             const isSelected = selected.has(index.toString());
               return <div
                    key={index}
                    data-index={index}
                    data-status={status}
                    className={classnames('box', status, isSelected && 'selected')}
                    onClick={handleClick}
                >
                    {box}
                </div>
            })}
        </div>
    );

}
