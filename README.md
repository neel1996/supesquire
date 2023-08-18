<h1 align="center">
supesquire
</h1>

<div align="center">
<p align="center">
<img src="https://github.com/neel1996/supesquire/assets/47709856/c88f6f34-0368-4aec-a12a-1aee3e4ff3d2" alt="logo" style="width:150px;text-align:center;" />
</p>
<p align="center">
chat with your documents
</p>
</div>

# Overview

Supesquire is a `Next.js` application powered by OpenAI and supabase. It is well suited for chatting with your PDF documents in realtime. The application uses OpenAI's `gpt-3.5-turbo` model to generate contextually relevant answers to the questions asked by the user about the document. The application uses supabase for user authentication, storing the PDF document, persisting the document history, and all the chat records in the Database. The application uses langchain to extract textual content from the PDF document and generate tailored prompts for document Q&A

> The entire project is built with JS alone

# Stack

- **Supabase**: User authentication, storing the PDF document, persisting the document history and all the chat records in the Database
- **langchain**: Extract textual content from the PDF document and generate tailored prompts for document questions & answering
- **Next.js**: UI and Backend

# Supabase setup

- Create a supabase project
- With supabase [RLS](https://supabase.com/docs/guides/auth/row-level-security) enabled, the application relies on supabase authentication. Ensure that you create a [new user in your supabase project](https://supabase.com/docs/guides/auth) with a valid email ID and a password to access this application
- The [supabase.sql](supabase.sql) has the queries to create the tables and storage bucket required for the application. Execute the queries on supabase's SQL editor to set up all the requirements for this application

# Local setup

- Clone the repo
- Install the dependencies using `yarn`
- Generate an API key for accessing the [OpenAI API](https://platform.openai.com/account/api-keys)
- Create a `.env.local` file in the root of the project and add the following environment variables

```
SUPABASE_URL=<supabase_url>
SUPABASE_API_KEY=<supabase_api_key>
SUPABASE_BUCKET=<supabase_bucket>
SUPABASE_DOCUMENTS_TABLE=<supabase_documents_table>
SUPABASE_CHAT_RECORDS_TABLE=<supabase_chat_records_table>
NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
NEXT_PUBLIC_SUPABASE_API_KEY=<supabase_api_key>
NEXT_PUBLIC_SUPABASE_BUCKET=<supabase_bucket>

OPENAI_API_KEY=<openai_api_key>
```

- To start the application, run `yarn dev`

## Demo

https://github.com/neel1996/supesquire/assets/47709856/d3236a11-a320-4bd9-8612-5cf22656870d

