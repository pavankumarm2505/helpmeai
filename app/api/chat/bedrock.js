const AWS = require('aws-sdk');

// Initialize the AWS Bedrock client
const bedrock = new AWS.Bedrock({
    region: process.env.AWS_REGION
});

async function getLLMResponse(prompt) {
    const params = {
        ModelId: 'your-llm-model-id', // Replace with your Bedrock LLM model ID
        Input: {
            prompt: prompt
        }
    };

    try {
        const response = await bedrock.invokeModel(params).promise();
        return response.Output;
    } catch (error) {
        console.error('Error invoking LLM model:', error);
        throw error;
    }
}

module.exports = { getLLMResponse };