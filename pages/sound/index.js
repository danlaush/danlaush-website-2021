import { useEffect, useState } from "react";
import soundClient from '../../lib/sound-client';


/**
 * Recording
 * location: {
 *   lat,
 *   long
 * },
 * 
 * 
 */

const Sound = () => {
  const [get, setGet] = useState("");
  const [put, setPut] = useState("");
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    async function runEffect() {
      await soundClient.getAll().then(async newList => {
        try {
          // Better to enqueue these somehow - if end up with too many,
          // could crash? how elegant does browser handle? know that
          // browser limits concurrent HTTP.
          const allTheData = await Promise.all(newList.map(key => {
            return soundClient.get(key.name).then(r => {
              return {
                ...r,
                name: key.name
              }
            })
          }))
          setRecordings(allTheData.sort((a, b) => a.name > b.name));
        } catch (error) {
          console.log('error fetching all the data', error)
        }
      })
    }
    runEffect();
  }, []);

  const handleGet = async (key) => {
    try {
      await soundClient.get(key).then(res => {
        console.log(res);
        return res;
      })
    } catch (error) {
      console.log("oh no", error)
    }
  };
  const handlePut = async () => {
    const meta = { date: Date.now(), location: "test", qv: Math.random() };
    try {
      const res = await soundClient.put(put, meta)
      console.log('success putting', put, res)
    } catch (error) {
      console.log("Error putting new key/value pair", error)
    }
  };
  const nuke = async () => {
    if(!confirm('are you sure? this cannot be undone')) return;

    console.log('nuking all data')
  }
  return (
    <main>
      <h1>Sound map</h1>
      <input value={get} onChange={(e) => setGet(e.target.value)} />
      <button onClick={() => handleGet(get)}>get</button>
      <input value={put} onChange={(e) => setPut(e.target.value)} />
      <button onClick={handlePut}>put</button>
      <button onClick={nuke}>delete all data</button>
      {recordings.length === 0 ? (<p>Loading</p>) : null}
      <ul>
        {recordings.map((item) => (
          <li key={item.name}>
            {item.name}: {item.value}
            <pre>
              {JSON.stringify(item.metadata, null, 2)}
            </pre>
            
          </li>
        ))}
      </ul>
    </main>
  );
};
export default Sound;
