import React from "react";

const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
      {steps.map((step, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          {/* Step Circle */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: currentStep >= index ? "blue" : "lightgray",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            {index + 1}
          </div>

          {/* Step Label */}
          <span style={{ margin: "0 10px", color: currentStep >= index ? "black" : "gray" }}>
            {step}
          </span>

          {/* Connector Line (except last step) */}
          {index < steps.length - 1 && (
            <div
              style={{
                width: "50px",
                height: "4px",
                backgroundColor: currentStep > index ? "blue" : "lightgray",
                transition: "0.3s",
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
