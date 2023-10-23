const axios = require("axios");
const https = require('https');

const agent = new https.Agent({ rejectUnauthorized: false });

const axiosInstance = axios.create({
  httpsAgent: agent
});


async function searchByTerm(field, term) {
  const query = {
    match: {
      [`${field}.case_insensitive_and_inflections`]: term,
    },
  };
  const values = [];
  try {
    const res = await axiosInstance.get(process.env.ELASTIC_SEARCH_URL, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
      data: {
        size: 1000,
        query,
      },
    });
    const total = res.data?.hits?.total?.value;
    const hits = res.data?.hits?.hits;
    if (hits && total) {
      for (let i = 0; i < total; i++) {
        if (hits[i]?._source) values.push(hits[i]?._source);
      }
    }
    return values;
  } catch (err) {
    console.error(err);
    throw Error("Search by term error occured");
  }
}

module.exports = { searchByTerm };
