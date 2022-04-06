const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  // add code here to fetch data from yelp API
  const { zip, category } = event.queryStringParameters;
  console.log(zip, 'this is the zip');
  // be sure to include the parameters from event.queryStringParameters
  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${zip}&category=${category}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
        }
      }
    );
    const data = await response.json();
    const json = JSON.stringify(data);

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Problem loading data' }),
    };
  }
};

module.exports = { handler };
