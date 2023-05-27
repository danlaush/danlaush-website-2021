/**
 * https://api.cloudflare.com/client/v4/accounts/{account_identifier}/storage/kv/namespaces/{namespace_identifier}/values/{key_name}
 */
import CF from '../../../lib/cf-server';

export default async function getAll(req, res) {
  try {
    const data = await CF.list();
    if(!data.success) {
      throw new Error(`Unable to fetch data from Cloudflare: ${JSON.stringify(errors)}`)
    }
    
    res.status(200);
    res.json({success: true, errors: [], list: data.result })
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({success: false, errors: [error]})
  }

}
