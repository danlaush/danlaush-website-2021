import { useState } from 'react';

const Sound = () => {
  const [input, setInput] = useState('');
  const handleGet = () => {
    fetch("/api/sound/get?key=test", {
      credentials: "same-origin",
    })
      .then(async res => {
        console.log("i did it mom")
        const {data} = await res.json()
        const usp = new URLSearchParams(data);
        for (const [key, value] of usp.entries()) {
          console.log(key, value)
        }
      })
      .catch((e) => console.log("oh no", e));
  }
  const handlePut = () => {
    const formData = new URLSearchParams();
    formData.append("metadata", JSON.stringify({location: 'test', qv: 3}));
    formData.append("value", input);

    return fetch(
      `/api/sound/put`,
      {
        credentials: "same-origin",
        method: "PUT",
        body: formData,
      }
    ).catch(async (err) => {
      console.error("Error putting new key/value pair", err);
    });

  }
  const handleSubmit = (event) => {
    console.log("submitting", new Date());
    fetch("/api/sound/get?key=test", {
      credentials: "same-origin",
    })
      .then(() => console.log("i did it mom"))
      .catch((e) => console.log("oh no", e));
  };
  return (
    <main>
      <h1>Sound map</h1>
      <button onClick={handleGet}>get</button>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handlePut}>put</button>
    </main>
  );
};
export default Sound;
