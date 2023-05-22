
export default async function get(req, res) {
  res.status(200);
  res.json({success: true, data: 'one', two: {three: undefined, tree: 17}})
}