import React, {useState, useEffect} from 'react';

export default function CountryCapitalGame({data}) {
    const [buttons, setButtons] = useState([]);
    const [selected, setSelected] = useState([]); // [{ label, type, key }]
    const [wrongPair, setWrongPair] = useState([]);

    useEffect(()=> {
        const countries = Object.keys(data).map((country) => ({
            label: country,
            type: 'country',
            key: country,
        }));

        const capitals = Object.entries(data).map(([country, capital]) => ({
            label: capital,
            type: 'capital',
            key: country,
        }));

        const shuffled = [...countries, ...capitals].sort(() => Math.random() - 0.5);
        setButtons(shuffled);
    }, [data]);

    const handleClick = (btn) => {
        if(selected.length === 0) {
            setSelected([btn]);
        }
        else if(selected.length === 1) {
            const first = selected[0];
            const second = btn;

            if(first.key === second.key && first.type === second.type) return;
            if (
                first.key === second.key &&
                first.type !== second.type // one country, one capital
              ) {
                const remaining = buttons.filter(
                    (b) => b.label !== first.label && b.label !== second.label
                );
                setButtons(remaining);
                setSelected([]);
                setWrongPair([]);
            } else {
                setSelected([first, second]);
                setWrongPair([first.label, second.label]);
                setTimeout(() => {
                  setSelected([]);
                  setWrongPair([]);
                }, 1000);
            }
        }
   };


   const getStyle = (btn) => {
    if (selected.find((s) => s.label === btn.label)) {
        return {
          backgroundColor: wrongPair.includes(btn.label) ? '#ff0000' : '#0000ff',
          color: '#fff'
        };
      }
      return {};
   }

   return (
    <div style={{padding: '20px'}}>
              {buttons.length === 0 ? (
        <h2>🎉 Congratulations!</h2>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
            {buttons.map(btn => (
                <button
                key={btn.label}
                onClick={() => handleClick(btn)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  ...getStyle(btn)
                }}
                />
            ))}
            </div>
      )}
    </div>
   )
}