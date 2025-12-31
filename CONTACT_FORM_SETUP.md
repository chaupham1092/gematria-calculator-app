# Contact Form Setup with Netlify Forms

The contact form uses Netlify's built-in form handling - no API keys or external services needed!

## How It Works

Netlify automatically detects forms in your HTML and handles submissions. The form data is stored in your Netlify dashboard and you can set up email notifications.

## Setup Steps

### 1. Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and sign in
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build:web`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### 2. Enable Form Notifications

Once deployed, set up email notifications:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Forms**
3. Click **Form notifications**
4. Add an **Email notification**:
   - Email to notify: your-email@example.com
   - Event to listen for: New form submission
   - Form: contact

Now you'll receive an email whenever someone submits the contact form!

### 3. View Form Submissions

All form submissions are stored in Netlify:

1. Go to your site dashboard
2. Click **Forms** in the top navigation
3. You'll see all submissions with name, email, subject, and message

## Build Command

Make sure you have a build script in your `package.json`:

```json
{
  "scripts": {
    "build:web": "npx expo export:web"
  }
}
```

## Testing Locally

The form will only work when deployed to Netlify. For local testing, you can:

1. Use Netlify Dev: `netlify dev`
2. Or just test the form validation and UI (submissions won't actually send)

## Spam Protection

Netlify Forms includes built-in spam filtering. You can also:

1. Enable reCAPTCHA in Netlify settings
2. Set up custom spam filters
3. Use honeypot fields

## That's It!

No API keys, no external services, no complicated setup. Just deploy to Netlify and your contact form works automatically! 🎉

## Troubleshooting

- **Form not detected**: Make sure the hidden form with `data-netlify="true"` is in the HTML
- **Submissions not showing**: Check that you deployed after adding the form
- **Not receiving emails**: Verify your email notification settings in Netlify dashboard

