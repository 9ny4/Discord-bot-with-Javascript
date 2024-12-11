# Discord Bot with JavaScript

This is a simple Discord bot built with JavaScript. It supports several commands and features to interact with users on a Discord server.

## Features

- Responds to `!ping` messages with the bot's ping.
- Supports slash commands:
  - `/ping`: Replies with the bot's ping.
  - `/add`: Adds two numbers together.
  - `/embed`: Sends an embed message.
  - `/silent`: Sends a silent embed message.
- Assigns and removes roles using buttons.

## Commands

### Message Commands

- `!ping`: Replies with the bot's ping.

### Slash Commands

- `/ping`: Replies with the bot's ping.
- `/add`: Adds two numbers together.
  - Options:
    - `first-number`: The first number to add.
    - `second-number`: The second number to add.
- `/embed`: Sends an embed message.
- `/silent`: Sends a silent embed message.

## Requirements

- Node.js
- Discord.js
- dotenv

## Setup

1. Clone the repository.
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your Discord bot token:
   ```
   token=YOUR_DISCORD_BOT_TOKEN
   ```
4. Run the bot:
   ```sh
   node
   ```

## Note

This is my first Discord bot in JavaScript, and my first JavaScript project overall, so don't expect it to be perfect.

---

Enjoy using the bot!
