/**
 * https://api.cloudflare.com/client/v4/accounts/{account_identifier}/storage/kv/namespaces/{namespace_identifier}/values/{key_name}
 */
import CF from '../../../lib/cf-server';

export default async function get(req, res) {
  try {
    const key = req.query.key;
    const data = await CF.get(key);
    const usp = new URLSearchParams(data)
    const metadata = JSON.parse(usp.get('metadata'))
    const value = usp.get('value')
    // console.log({
    //   event: 'API Route - /get',
    //   key,
    //   metadata,
    //   value
    // });
    
    res.status(200);
    res.json({success: true, errors: [], key, metadata, value })
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({success: false, errors: [error]})
  }

}
