# SEO Tool Suite

A comprehensive collection of SEO tools powered by OpenAI GPT-4 API to help optimize website content, product listings, and more.

## Features

- Text and content classification for SEO purposes
- Product listing optimization and grading
- Batch processing of multiple items
- Keyword analysis and optimization
- SEO scoring and recommendations
- Simple and intuitive user interface

## Setup

1. Make sure you have Node.js installed on your machine
2. Clone this repository
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. Open your browser and navigate to: http://localhost:3000/

## Usage

1. Enter your OpenAI API key (you can get one from https://platform.openai.com/api-keys)
2. Choose from available tools:
   - Text/Content Classifier: Analyze content for SEO optimization
   - Product Listing Optimizer: Improve product descriptions for better search ranking
   - Batch Processor: Process multiple items at once
3. Follow the instructions for each tool to get SEO recommendations and improvements

## How it Works

The application uses a Node.js server to proxy requests to the OpenAI API. The analysis is performed by GPT-4, which evaluates content based on SEO best practices.

The tools provide:
- SEO scores and ratings
- Specific recommendations for improvement
- Keyword optimization suggestions
- Detailed analysis of content performance

## Privacy

Your API key is stored only in your browser's local storage and is never saved on our servers. All API requests are made directly from your browser to the OpenAI API through our proxy server.

## Requirements

- Node.js 14+
- A valid OpenAI API key