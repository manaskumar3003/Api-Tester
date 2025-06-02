import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('{}');
  const [response, setResponse] = useState(null);

  const handlePost = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/test-post', {
        url,
        headers: JSON.parse(headers),
        body: JSON.parse(body)
      });
      setResponse(res.data);
    } catch (error) {
      setResponse({ error: error.message });
    };
    
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">🚀 POST API Tester</h1>

      <input
        className="w-full p-2 border rounded"
        placeholder="Enter POST API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded"
        placeholder='Headers (JSON format)'
        rows={3}
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded"
        placeholder='Body (JSON format)'
        rows={5}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        onClick={handlePost}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send POST Request
      </button>

      {response && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h2 className="font-semibold mb-2">Response:</h2>
          <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
          {response.aiAdvice && (
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
              <h3 className="font-semibold text-yellow-700 mb-1">🤖 AI Advice:</h3>
              <p className="text-yellow-900 whitespace-pre-line">{response.aiAdvice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
