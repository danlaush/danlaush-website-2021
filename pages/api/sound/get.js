/**
 * https://api.cloudflare.com/client/v4/accounts/{account_identifier}/storage/kv/namespaces/{namespace_identifier}/values/{key_name}
 */
import CF from '../../../lib/CF';

export default async function get(req, res) {
  try {
    console.log('get a thing')
    const key = req.query.key;
    const data = await CF.get('another');
    console.log('get', key, data)
    
    res.status(200);
    res.json({success: true, errors: [], data })
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({success: false, errors: [error]})
  }

}