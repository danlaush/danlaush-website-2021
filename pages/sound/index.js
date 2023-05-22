const Sound = () => {
  const handleSubmit = event => {
    console.log('submitting', new Date())
    fetch('/api/sound/get', {
      credentials: 'include'
    })
      .then(() => console.log('i did it mom'))
      .catch(e => console.log('oh no', e))
    fetch('/api/sound/getAll', {
      credentials: 'include'
    })
      .then(() => console.log('2nd try'))
      .catch(e => console.log('2nd failure', e))
  }
  return (<main><h1>Sound map</h1><button onClick={handleSubmit}>Test</button></main>)
}
export default Sound;
