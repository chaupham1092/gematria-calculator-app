# Deployment Guide

## Quick Start: Deploy to Netlify

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/gematria-calculator.git
git push -u origin main
```

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** > **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build:web`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty)
6. Click **"Deploy site"**

### Step 3: Set Up Contact Form Notifications

1. Once deployed, go to your site dashboard
2. Click **"Forms"** in the top navigation
3. Click **"Form notifications"**
4. Add **"Email notification"**:
   - Email: your-email@example.com
   - Event: New form submission
   - Form: contact
5. Save

That's it! Your site is live and the contact form is working! 🎉

## Custom Domain (Optional)

1. In Netlify dashboard, go to **Site settings** > **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., gematriacalculator.xyz)
4. Follow the DNS configuration instructions
5. Enable HTTPS (automatic with Netlify)

## Continuous Deployment

Every time you push to GitHub, Netlify will automatically:
- Build your site
- Deploy the new version
- Update the live site

## Mobile App Deployment

The mobile app is separate and uses Expo:

### iOS (App Store)
```bash
eas build --platform ios
eas submit --platform ios
```

### Android (Google Play)
```bash
eas build --platform android
eas submit --platform android
```

See [Expo documentation](https://docs.expo.dev/submit/introduction/) for detailed instructions.

## Environment Variables

No environment variables needed! The contact form uses Netlify's built-in form handling.

## Monitoring

- **Forms**: View submissions in Netlify dashboard > Forms
- **Analytics**: Enable Netlify Analytics in site settings
- **Logs**: View build and function logs in Netlify dashboard

## Troubleshooting

### Build fails
- Check that `npm run build:web` works locally
- Verify Node version matches (18+)
- Check build logs in Netlify dashboard

### Contact form not working
- Verify the hidden form with `data-netlify="true"` is present
- Check Forms section in Netlify dashboard
- Make sure you deployed after adding the form

### Site not updating
- Check deploy status in Netlify dashboard
- Verify GitHub webhook is configured
- Try manual deploy: **Deploys** > **Trigger deploy**
