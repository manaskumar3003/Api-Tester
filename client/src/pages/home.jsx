import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios'; // Import axios for making HTTP requests

const TestComponent = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [result, setResult] = useState('Run a request to see the result.');
  const [aiAnalysis, setAiAnalysis] = useState('AI analysis will appear here after a request.');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSendRequest = async () => {
    setLoading(true); // Set loading to true when the request starts
    setResult('Sending request...'); // Update result area to indicate sending
    setAiAnalysis('Getting AI analysis...'); // Update AI analysis area

    let backendEndpoint = '';
    let requestData = { url: url };

    // Determine backend endpoint based on HTTP method
    if (method === 'GET') {
      backendEndpoint = 'http://localhost:5000/api/test';
      // GET requests typically don't have a body in the standard way,
      // but your backend `getApi` expects body for url and headers.
      // We'll send url and headers in the body for consistency with your backend.
      requestData = { url: url, headers: {} }; // Add headers if you implement header input
    } else if (method === 'POST') {
      backendEndpoint = 'http://localhost:5000/api/test-post';
      try {
        // Attempt to parse the request body as JSON if it's for POST
        requestData = { url: url, headers: {}, body: requestBody ? JSON.parse(requestBody) : {} };
      } catch (e) {
        setResult(`Error parsing request body as JSON: ${e.message}`);
        setAiAnalysis('AI analysis unavailable due to body parsing error.');
        setLoading(false);
        return; // Stop the request if parsing fails
      }
    } else { // PUT, DELETE, PATCH (using /api/test-update)
      backendEndpoint = '/api/test-update';
       try {
        // Attempt to parse the request body as JSON for update methods
        requestData = { method: method, url: url, headers: {}, body: requestBody ? JSON.parse(requestBody) : {} };
      } catch (e) {
        setResult(`Error parsing request body as JSON: ${e.message}`);
        setAiAnalysis('AI analysis unavailable due to body parsing error.');
        setLoading(false);
        return; // Stop the request if parsing fails
      }
    }

    try {
      // Make an API call to the selected backend endpoint
      const response = await axios.post(backendEndpoint, requestData);

      const data = response.data;

      // Show status, time, and the actual API response (data.data)
      setResult(
        `Status: ${data.status}\nTime: ${data.time ? data.time + ' ms' : 'N/A'}\nResponse:\n${JSON.stringify(data.data, null, 2)}`
      );
      setAiAnalysis(data.aiAdvice || 'AI analysis unavailable.');
    } catch (error) {
      console.error("Frontend Error:", error);
      setResult(`Error: ${error.message}\nDetails: ${error.response?.data?.message || 'Could not get details'}`);
      setAiAnalysis('AI analysis unavailable due to request error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-900 text-white flex flex-col p-4">
      {/* Top Section: Method, URL, and Send Button */}
      <div className="flex items-center space-x-4 mb-4">
        <Select onValueChange={setMethod} defaultValue={method}>
          <SelectTrigger className="w-[120px] bg-neutral-700 text-white border-neutral-600">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-700 text-white border-neutral-600">
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
            <SelectItem value="PATCH">PATCH</SelectItem>
            {/* Add more methods as needed */}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Enter request URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow bg-neutral-700 text-white border-neutral-600 placeholder-neutral-400"
        />
        <Button onClick={handleSendRequest} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>

      {/* Middle Section: Request Body/Params and AI Analysis */}
      <div className="flex flex-grow space-x-4 mb-4">
        {/* Request Body/Parameters Area (Left/Center) */}
        <div className="flex-grow flex flex-col">
           <Tabs defaultValue="body" className="flex flex-col flex-grow">
              <TabsList className="grid w-full grid-cols-1 bg-neutral-700 border-neutral-600">
                <TabsTrigger value="body" className="text-white data-[state=active]:bg-neutral-600 data-[state=active]:text-white">Body</TabsTrigger>
              </TabsList>
              <TabsContent value="body" className="flex-grow">
                 <Textarea
                    placeholder="Enter request body (e.g., JSON)"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="w-full flex-grow h-full bg-neutral-700 text-white border-neutral-600 placeholder-neutral-400 min-h-[200px]"
                 />
              </TabsContent>
           </Tabs>
        </div>

        {/* AI Analysis Area (Right) */}
        <div className="w-1/3 flex flex-col bg-neutral-700 rounded-lg p-3">
          <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
          <ScrollArea className="flex-grow h-full pr-2">
            <p className="text-sm text-neutral-300 whitespace-pre-wrap">{aiAnalysis}</p>
          </ScrollArea>
        </div>
      </div>

      {/* Bottom Section: Result Tab */}
      <div className="w-full flex-shrink-0">
        <Tabs defaultValue="result" className="w-full">
          <TabsList className="grid w-full grid-cols-1 bg-neutral-800 border-neutral-600">
            <TabsTrigger value="result" className="text-white data-[state=active]:bg-neutral-600 data-[state=active]:text-white">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="result">
            <ScrollArea className="h-[200px] w-full rounded-md border border-neutral-600 p-4 bg-neutral-700">
              <p className="text-sm text-neutral-300 whitespace-pre-wrap">{result}</p>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestComponent;