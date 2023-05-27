async function fetchCf(url, opts) {
  try {
    return await fetch(`/api/sound${url}`, {
      credentials: "same-origin",
      ...opts,
    }).then(async (res) => {
      return await res.json();
    });
  } catch (error) {
    console.error("Error fetching from Sound api", error);
  }
}

const CFClient = {
  get: function (k) {
    return fetchCf(`/get?key=${k}`);
  },
  getAll: function () {
    return fetchCf(`/getAll`).then((r) => r.list);
  },
  put: function (v, metadata) {
    const formData = new URLSearchParams();
    formData.append("key", Date.now())
    formData.append("metadata", JSON.stringify(metadata));
    formData.append("value", v);
    return fetchCf(`/put`, {
      method: "PUT",
      body: formData,
    });
  },
};
export default CFClient;
