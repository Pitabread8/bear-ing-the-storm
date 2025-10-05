import React from "react";

const Dashboard = () => {
  return (
    <div style={{ padding: "24px", background: "#fff", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
      
      {/* First row */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "15px", alignItems: "stretch" }}>
        <div style={{ flex: "1 1 240px", minWidth: "200px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: "8px", padding: "18px", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
          <h1>Average Daily Precipitation (mm)</h1>
          <p>Content</p>
          <a href="rainprobability.html">More</a>
        </div>

        <div style={{ flex: "1 1 240px", minWidth: "200px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: "8px", padding: "18px", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
          <h1>Average Daily Temperature (ºC)</h1>
          <p>Content</p>
        </div>

        <div style={{ flex: "1 1 240px", minWidth: "200px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: "8px", padding: "18px", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
          <h1>Chances of Getting Swept Away</h1>
          <p>Content</p>
        </div>
      </div>

      {/* Second row */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "15px", alignItems: "stretch" }}>
        <div style={{ flex: "1 1 240px", minWidth: "200px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: "8px", padding: "18px", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
          <h1>Average Daily Specific Humidity (g/kg)</h1>
          <p>Content</p>
        </div>

        <div style={{ flex: "1 1 240px", minWidth: "200px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: "8px", padding: "18px", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
          <h1>Health Risk: Low, Medium, High</h1>
          <p>Content</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
