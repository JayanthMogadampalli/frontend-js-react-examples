import { useState } from "react";

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export default function App() {
    const [flightOption, setFlightOption] = useState("one-way");
    const [departureDate, setDepartureDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
    const [returnDate, setReturnDate] = useState(departureDate);

   
    function submitForm(event) {
        event.preventDefault();
        if(flightOption === "round-trip") {
            alert(`Flight Option: ${flightOption}\nDeparture Date: ${formatDate(departureDate)}\nReturn Date: ${formatDate(returnDate)}`);
        }
        alert(`Flight Option: ${flightOption}\nDeparture Date: ${formatDate(departureDate)}`);

    }


    return (
        <>
              <h1>Flight Booking</h1>
                <form onSubmit={submitForm}>
                    <label>
                        <input
                            type="radio"
                            name="flightOption"
                            value="one-way"
                            checked={flightOption === "one-way"}
                            onChange={() => setFlightOption("one-way")}
                        />
                        One Way
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="flightOption"
                            value="round-trip"
                            checked={flightOption === "round-trip"}
                            onChange={() => setFlightOption("round-trip")}
                        />
                        Round Trip
                    </label>
    
                    <div>
                        <label>
                            Departure Date:
                            <input
                                type="date"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                                min={formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000))}
                            />
                        </label>
                    </div>
    
                    {flightOption === "round-trip" && (
                        <div>
                            <label>
                                Return Date:
                                <input
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    min={departureDate}
                                />
                            </label>
                        </div>
                    )}
    
                    <button type="submit">Book Flight</button>
                </form>   
        </>
    );
}