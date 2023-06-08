# Chat Feels

## Project Description

A teeny service for ingesting Twitch chat messages into a DB to fine-tune a sentiment analysis model.

The goal of this project is to have a visual indicator on screen that shows a real-time “mood” of the chat.

Although I am creating this as a personal project, I would like to keep it open to be used by other streamers. I may need to go back and refactor once the project is done, but in the meantime I should still try to make it configurable as I go along.

### Product Feature List

- [ ] Pulls data from a Twitch channel's chat messages
- [ ] Stores general chat message data in a MongoDB instance 
- [ ] Stores a condensed version of chat message data for fine-tuning
- [ ] Displays a visual overlay (via a frontend stack)
- [ ] Uses the model to show a color based on sentiment analysis of the Twitch channel chat

#### Considerations

- When the model is prompted the current message should influence the overall color, not necessarily change the color on a message-by-message basis.
- It may be more flexible to build a general browser source via frontend stack rather than building a Twitch extension
- This project may be used by others and should consider an open source model from the beginning including any supplemental repositories and configurability

### Other Components

#### Twitch Overlay Extension

_WIP_

#### Browser Source

_WIP_

## Project Structure

In it's current form, data is pulled from the Twitch api using tmi.js and inserted into a MongoDB database.

### Project Dependencies

This project is based in node and uses `npm` for external packages. The following packages are required for the setup:

- dotenv: Store the environment variables in .env
- mongodb: Driver to connect to a MongoDB instance and perfom DB operations
- tmi.js: Connect and interact with Twitch chat from Node.js or a browser

### Project Files

- index.js
- package.json
- .env-sample

### Message Data

#### Collection structure
- `Messages` - Collection contains the following data:
  - `message`: The chat message contents from the Twitch API response
  - `user`: The Twitch username for the account that posted the chat message
  - `channel`: The channel where the chat message was posted
  - `timestamp`: The timestamp for when the chat message was posted
- `MessageClassification` - Collection that contains a format based on OpenAI GPT [fine-tuning](https://platform.openai.com/docs/guides/fine-tuning/prepare-training-data)
  - `prompt`: The chat message contents from the Twitch API response
  - `completion`: Starts as an empty string to be labeled based on chosen classification categories for the model.

#### Data needs for fine-tuning

According to the OpenAI GPT [fine-tuning](https://platform.openai.com/docs/guides/fine-tuning/prepare-training-data) guidelines, it is recommended to have at least 100 examples for each classification category.

#### Classification categories

_WIP_

### Setting up the project

#### Database and schema

1. Create a MongoDB database (This app is using a DB named `TwitchChat`).
2. Create a collection for storing the message data - this app is using a Collection named `Messages`).
3. Create a collection for managing the fine-tuning data format - this app is using a Collection named `MessageClassification`.
4. Copy the DB connection string for the project Installation / Running the project.

_See also Message Data._

#### Installation / Running the project

1. (Fork and) Clone the project
2. `cd ~/<your-repo-directory>/chat-feels`
3. `npm install`
4. Duplicate `.env-sample` and rename to `.env`
   1. Update `DB_CONNECTION_STRING` with the connection string to your local or hosted MongoDB instance.
5. Update the `channels` array in the `tmiClient` to include 1 or more Twitch channels whose chat data should be ingested.
6. Run `node index.js` to start the app

You should see the contents of your chat messages being logged as they are posted.

You should also see the chat messages being stored to the MongoDB instance that is connected.

#### Project deployment

##### Render

_WIP_

#### Data export
_WIP_

#### Model Training

Fine-tuning GPT through OpenAI CLI with Python 3
- `pip install --upgrade openai`: install OpenAI CLI
- `export OPENAI_API_KEY="<OpenAI_API_KEY>"`: Set API Key
- `openai tools fine_tunes.prepare_data -f <LOCAL_FILE>`: Prepare training data with CLI data preparation tool
- `openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL>`: Create a fine-tuned model
- `openai api completions.create -m <FINE_TUNED_MODEL> -p <YOUR_PROMPT>`: Use the fine-tuned model
  ```shell
  curl https://api.openai.com/v1/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": YOUR_PROMPT, "model": FINE_TUNED_MODEL}'
  ```

  ```javascript (node)
  const response = await openai.createCompletion({
  model: FINE_TUNED_MODEL
  prompt: YOUR_PROMPT,
  });
  ```

  ```python
  import openai
  openai.Completion.create(
    model=FINE_TUNED_MODEL,
    prompt=YOUR_PROMPT)
  ```

#### Model deployment

_WIP_ Hugging face?

#### Model inference integration

_WIP_ Gradio?




