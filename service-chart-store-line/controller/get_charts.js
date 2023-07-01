const Chart = require("../model/chart_schema");

exports.get_charts = async (req, res) => {
  const { username } = req.params;

  // TODO Better null check for username
  if (username == NaN || username == '') {
    res.status(500).send('No username was given');
  }
  console.log(username);
  try {
    const all_charts = await Chart.find({ username: username });
    res.status(200).json(all_charts);
  } catch (error) {
    console.error('Failed to retrieve images:', error);
    res.status(500).send('Failed to retrieve images.');
  }
};
