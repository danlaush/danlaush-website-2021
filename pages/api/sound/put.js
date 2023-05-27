/**
 * https://api.cloudflare.com/client/v4/accounts/{account_identifier}/storage/kv/namespaces/{namespace_identifier}/values/{key_name}
 */
import CF from '../../../lib/cf-server';

export default async function put(req, res) {
  try {
    const timestamp = req.body.key;
    const value = req.body.value;
    const metadata = req.body.metadata;
    
    console.log(JSON.stringify({
      event: 'api - put',
      timestamp,
      metadata,
      value,
    }))
    const data = await CF.put(timestamp, value, metadata);
    console.log('data from CF put', data);
    // why am I editing res directly, learn to use NextResponse properly
    res.status(200);
    res.json({success: true, errors: [], ...data })
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({success: false, errors: [error]})
  }

}
