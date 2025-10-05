const sendData = async (value) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: value }),
    });

    const data = await res.json();
    console.log("Flask response:", data);
  } catch (err) {
    console.error("Error sending to Flask:", err);
  }
};

export default sendData;