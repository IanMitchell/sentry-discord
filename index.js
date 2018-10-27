require('now-env');
const { json } = require('micro');
const handler = require('serve-handler');
const fetch = require('node-fetch');
const dedent = require('dedent-js');

const COLORS = {
  'debug': parseInt('fbe14f', 16),
  'info': parseInt('2788ce', 16),
  'warning': parseInt('f18500', 16),
  'error': parseInt('e03e2f', 16),
  'fatal': parseInt('d20f2a', 16),
};

module.exports = async (request, response) => {
  if (request.method === 'GET') {
    return handler(request, response);
  }

  const body = await json(request);

  const payload = {
    username: 'Sentry',
    avatar_url: `${process.env.NOW_URL}/sentry-icon.png`,
    embeds: [
      {
        title: body.project_name,
        type: 'rich',
        description: body.message,
        url: body.url,
        timestamp: (new Date(body.event.received * 1000)).toISOString(),
        color: COLORS[body.level] || COLORS.error,
        footer: {
          icon_url: 'https://github.com/fluidicon.png',
          text: 'ianmitchell/sentry-discord',
        },
        fields: [
          {
            name: `${body.event.template.filename}:${body.event.template.lineno}`,
            value: dedent`
              \`\`\`
              ${body.event.template.context_line}
              \`\`\`
            `,
          }
        ]
      }
    ]
  };

  if (body.event.tags) {
    payload.embeds[0].fields.push({
      name: '**Tags**',
      value: body.event.tags.map(([key, value]) => `${key}: ${value}`).join('\n'),
      inline: true,
    });
  }

  if (body.event.user) {
    payload.embeds[0].fields.push({
      name: '**User**',
      value: body.event.user.username,
      inline: true,
    });
  }

  console.log(payload.embeds[0].fields);

  const val = await fetch(process.env.WEBHOOK, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(val);
}
