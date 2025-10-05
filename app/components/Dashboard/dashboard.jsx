import React from "react";

const Card = ({ title, content, link, icon }) => (
  <div
    style={{
      flex: "1 1 240px",
      minWidth: "200px",
      border: "4px solid #edededff",
      borderRadius: "8px",
      padding: "18px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
    }}
    className="flex flex-row gap-12 items-center text-2xl"
  >
    {icon && (
      <img
        src={icon}
        alt=""
        style={{
          objectFit: "contain",
          display: "block",
        }}
        className="w-1/2 h-full"
      />
    )}
    <div>
    <p className="ml-9">{content}</p>
    {link && <a href={link}>More</a>}
    </div>
  </div>
);

const Dashboard = ({ data }) => {
  const firstRowCards = [
    {
      title: "Average Daily Precipitation (mm)",
      content: data["PRECTOT_mm_daily"],
      icon: "/icons/AvgPrecip.png",
    },
    { 
      title: "Average Daily Temperature (ºC)", 
      content: data["T2M_C"],
      icon: "/icons/AvgTemp.png"
    },
    { 
      title: "Average Daily Wind Strength (m/s)", 
      content: `Meridional wind: ${data["V2M"]}, Zonal wind: ${data["U2M"]}`,
      icon: "/icons/AvgWind.png",
    },
  ];

  const secondRowCards = [
    {
      title: "Average Daily Specific Humidity (g/kg)",
      content: data["QV2M_gkg"],
      icon: "/icons/AvgHumidity.png",
    },
    { 
      title: "Health Risk: Low, Medium, High", 
      content: data["Health_Risk"],
      icon: "/icons/Health.png",
    },
    { 
      title: "Chances of Getting Swept Away", 
      content: data["Health_Risk"],
      icon: "/icons/SweptAway.png",
    },
  ];

  const rowStyle = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "15px",
    alignItems: "stretch",
  };

  return (
    <div
      style={{
        background: "#fff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
      className="w-screen p-8"
    >
      {/* First row */}
      <div style={rowStyle}>
        {firstRowCards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>

      {/* Second row */}
      <div style={rowStyle}>
        {secondRowCards.map((card, idx) => (
          <Card key={idx} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
