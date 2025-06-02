 const { testCustomApi } = require( '../services/requestService.js');
const { testGetApi } = require('../services/requestService.js');
const { testPostApi } = require('../services/requestService.js');
const { logAiAdvice } = require('./AiController.js');


 const UpdateApi = async (req, res, next) => {
  try {
    const { method, url, headers, body } = req.body;

    if (!url || !method) {
      return res.status(400).json({ message: "Both 'url' and 'method' are required" });
    }

    // Assuming testCustomApi returns an object with status, time, body etc.
    const result = await testCustomApi(method, url, headers, body);
    const aiAdvice = await logAiAdvice(result); // Get AI advice

    // Include AI advice in the response
    res.status(200).json({ ...result, aiAdvice });
  } catch (error) {
    next(error);
  }
};



const getApi = async (req, res, next) => {
  try {
    // For GET, your backend expects url and headers in the body, which is unusual
    // for a standard GET request, but we'll stick to your backend's design.
    const { url, headers } = req.body;

    if (!url) return res.status(400).json({ message: "URL is required" });

    const result = await testGetApi(url, headers);
    const aiAdvice = await logAiAdvice(result); // Get AI advice

    // Include AI advice in the response
    res.status(200).json({ ...result, aiAdvice });
  } catch (error) {
    next(error);
  }
};

const postApi = async (req, res, next) => {
  try {
    const { url, headers, body } = req.body;

    if (!url) return res.status(400).json({ message: "URL is required" });

    const result = await testPostApi(url, headers, body);
    const aiAdvice = await logAiAdvice(result); // Get AI advice

    // Include AI advice in the response
    res.status(200).json({ ...result, aiAdvice });
  } catch (error) {
    next(error);
  }
};

module.exports = { getApi, UpdateApi, postApi };