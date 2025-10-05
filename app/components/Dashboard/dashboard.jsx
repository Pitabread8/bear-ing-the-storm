import React from "react";
import AvgHumidityIcon from "./icons/AvgHumidity.png";


const Card = ({title, content, link, icon}) => (
    <div style =  {{
        flex: "1 1 240px",
        minWidth: "200px",
        background: "#efefefff",
        border: "1px solid #edededff",
        borderRadius: "8px",
        padding: "18px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.03)"
    }}>
        {icon && <img src={icon} alt="" style={{ 
            width: "40px", 
            height: "40px", 
            marginBottom: "12px" }} />}
        <h1>{title}</h1>
        <p>{content}</p>
        {link && <a href={link}>More</a>}
    </div>
);

const Dashboard = () => {
  const firstRowCards = [
    {title: "Average Daily Precipitation (mm)", 
        content: "Content", 
        link: "rainprobability.html" },
    { title: "Average Daily Temperature (ºC)", 
        content: "Content" },
    { title: "Chances of Getting Swept Away", 
        content: "Content" },
  ];

  const secondRowCards = [
    { title: "Average Daily Specific Humidity (g/kg)", 
        content: "Content", 
        link: "youtube.com",
        icon: AvgHumidityIcon
    },
    { title: "Health Risk: Low, Medium, High", 
        content: "Content" },
  ];

  const rowStyle = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "15px",
    alignItems: "stretch"
  };

  return (
    <div style={{ padding: "24px", background: "#fff", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
      
      {/* First row */}
      <div style={rowStyle}>
        {firstRowCards.map((card, idx) => (
          <Card key={idx} title={card.title} content={card.content} link={card.link} icon={card.icon} />
        ))}
      </div>

      {/* Second row */}
      <div style={rowStyle}>
        {secondRowCards.map((card, idx) => (
          <Card key={idx} title={card.title} content={card.content} link={card.link} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
