# sentry-discord

This is a basic `micro` server that accepts an incoming [Sentry](https://sentry.io) webhook and transforms it to the format expected by [Discord](https://discordapp.com/).

## Usage

This repository is configured to run with [Zeit Now](https://zeit.co/now).

First you'll need to create a Discord Webhook in the channel you wish to send alerts to. Once you've created a webhook, clone this repository. Remove the

```
"alias": "sentry-discord",
```

line from `now.json` and run

```
$ now
```

Now will prompt you for the Webhook URL - paste the Discord Webhook URL you created. After that, Now should give you the URL to your new deployment.

Finally, add a new Webhook alert to Sentry by pasting in the Now deployment URL. When you click `Test Plugin` on Sentry, you should receieve an alert on Discord.
