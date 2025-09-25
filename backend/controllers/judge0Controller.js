  import axios from 'axios';

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin } = req.body;

    const options = {
      method: 'POST',
      url: `${JUDGE0_URL}/submissions`,
      params: {
        base64_encoded: 'false',
        fields: '*'
      },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      },
      data: {
        source_code,
        language_id,
        stdin
      }
    };

    const response = await axios.request(options);
    const submissionToken = response.data.token;

    // Poll for result
    let result = null;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const resultResponse = await axios.get(
        `${JUDGE0_URL}/submissions/${submissionToken}`,
        {
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': RAPIDAPI_HOST
          }
        }
      );

      result = resultResponse.data;
      
      if (result.status && result.status.id > 2) {
        break;
      }
      
      attempts++;
    }

    res.json(result);
  } catch (error) {
    console.error('Judge0 execution error:', error);
    res.status(500).json({ message: 'Code execution failed' });
  }
};