const sendData = async (value) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat: value[0], lng: value[1], date: value[2] }),
    });

    const data = await res.json();
    console.log(data)
    return data;
  } catch (err) {
    console.error("Error sending to Flask:", err);
  }
};

export default sendData;