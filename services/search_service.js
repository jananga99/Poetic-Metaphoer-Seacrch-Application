const axios = require("axios");
const https = require('https');
require("dotenv").config();

const agent = new https.Agent({ rejectUnauthorized: false });

const axiosInstance = axios.create({
  httpsAgent: agent,
  baseURL: process.env.ELASTIC_SEARCH_URL,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}`
    ).toString("base64")}`,
    "Content-Type": "application/json",
  },
});

function getResultsFromRes(res) {
  const total = res.data?.hits?.total?.value;
  const hits = res.data?.hits?.hits;
  const values = [];
  if (hits && total) {
    for (let i = 0; i < total; i++) {
      if (hits[i]?._source) values.push(hits[i]?._source);
    }
  }
  return values;
}

async function searchAll(onlyMetaphors = false) {
  const query = {
    bool: {
      must: [
        {
          match_all: {}
        },

      ]
    }
  }
  if (onlyMetaphors) {
    query.bool.must.push({
      range: {
        metaphor_count: {
          gt: 0
        }
      }
    })
  }
  try {
    const res = await axiosInstance.get('', {
      data: {
        size: 1000,
        query
      },
    });
    return getResultsFromRes(res)
  } catch (err) {
    console.error(err);
    throw Error("Search by term error occured");
  }
}

async function searchByTerms(searchData, onlyMetaphors = false) {
  const query = {
    bool: {
      should: Object.keys(searchData).map((key) => {
        const ret = key === "metaphor_count" ? {
          match: {
            [key]: searchData[key]
          }
        } : {
          match: {
            [`${key}.case_insensitive_and_inflections`]: searchData[key]
          }
        }
        return ret
      }),
      minimum_should_match: 1
    }
  }
  if (onlyMetaphors) {
    const bool = query.bool
    query.bool = {}
    query.bool.must = [
      {
        bool
      },
      {
        range: {
          metaphor_count: {
            gt: 0
          }
        },
      }]
    delete query.bool.should
  }
  try {
    const res = await axiosInstance.get('', {
      data: {
        size: 1000,
        query,
      },
    });
    return getResultsFromRes(res)
  } catch (err) {
    // console.error(err);
    throw Error("Search by term error occured");
  }
}

module.exports = { searchByTerms, searchAll };
