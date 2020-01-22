# sentry-discord

This is a basic Zeit Now Function that accepts an incoming [Sentry](https://sentry.io) webhook and transforms it to the format expected by [Discord](https://discordapp.com/).

## Deploy

#### Create Discord Webhook and add to Secrets

Step one is to create a new Discord Webhook to send the alerts to and add the domain to now secrets

```
now secrets add sentry-webhook-discord <WEBHOOK_URL>
```

#### Deploy!

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/ianmitchell/sentry-discord/tree/master)

#### Add Webhook to Sentry

Take the deployment URL and add it to the `Webhooks` section of your Sentry project. **You will need to add a `/api` to the domain.** The root URL will not work. Save the value and click "Test Plugin" - you should see an alert pop up in Discord!
