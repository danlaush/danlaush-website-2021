const account_identifier = process.env.account_identifier;
const namespace_identifier = process.env.namespace_identifier;
const bearer_read = process.env.bearer_read;
const bearer_edit = process.env.bearer_edit;

const api_url = `https://api.cloudflare.com/client/v4/accounts/${account_identifier}/storage/kv/namespaces/${namespace_identifier}`;

const CF = {
  verify: function () {
    const Authorization = `Bearer ${bearer_read}`;
    console.log('verifying', Authorization)

    fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
      method: 'GET',
      headers: {
        Authorization,
      },
    }).then(async res => {
      console.log('success', await res.json())
    }).catch(e => console.error('oh no ', e));
  },
  list: function () {
    return fetch(
      `${api_url}/keys`,
      {
        headers: {
          Authorization: `Bearer ${bearer_read}`,
        },
      }
    ).then(async (res) => {
      return await res.json()
    });
  },
  get: function (k) {
    return fetch(
      `${api_url}/values/${k}`,
      {
        headers: {
          Authorization: `Bearer ${bearer_read}`,
        },
      }
    ).then(async (res) => {
      return await res.text()
    });
  },
  put: function (k, v = "", metadata = "") {
    const formData = new URLSearchParams();
    formData.append("metadata", metadata);
    formData.append("value", v);

    return fetch(
      `${api_url}/values/${k}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${bearer_edit}`,
        },
        body: formData,
      }
    ).then(async res => {
      return {
        k, v, metadata
      }
    }).catch(async (err) => {
      console.error("Error putting new key/value pair", err);
    });
  },
};

export default CF;
