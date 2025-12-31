# GitHub Setup Guide

Follow these steps to create a private GitHub repository and push your code.

## Step 1: Initialize Git (if not already done)

```bash
git init
```

## Step 2: Create .gitignore (already done)

The `.gitignore` file is already configured to exclude:
- node_modules/
- .expo/
- dist/
- .env files
- Build artifacts

## Step 3: Create Initial Commit

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Gematria Calculator with mobile and web versions"
```

## Step 4: Create Private Repository on GitHub

### Option A: Using GitHub CLI (if installed)

```bash
# Create private repository
gh repo create gematria-calculator-app --private --source=. --remote=origin

# Push code
git push -u origin main
```

### Option B: Using GitHub Website

1. Go to [github.com](https://github.com)
2. Click the **"+"** icon in top right > **"New repository"**
3. Fill in details:
   - **Repository name**: `gematria-calculator-app`
   - **Description**: "Gematria Calculator - Mobile and Web Application"
   - **Visibility**: Select **"Private"** ⚠️
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

5. Copy the commands shown and run them:

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/gematria-calculator-app.git

# Rename branch to main (if needed)
git branch -M main

# Push code
git push -u origin main
```

## Step 5: Verify Upload

1. Go to your repository on GitHub
2. Verify all files are uploaded
3. Check that it shows as **"Private"** (lock icon)

## Step 6: Set Up Branch Protection (Optional but Recommended)

1. Go to repository **Settings** > **Branches**
2. Click **"Add rule"**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging

## Common Issues

### Issue: "remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/gematria-calculator-app.git
```

### Issue: Authentication failed

If using HTTPS, you need a Personal Access Token:

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when pushing

Or use SSH:

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub: Settings > SSH and GPG keys > New SSH key
# Copy your public key:
cat ~/.ssh/id_ed25519.pub

# Use SSH remote instead
git remote set-url origin git@github.com:YOUR_USERNAME/gematria-calculator-app.git
```

## Next Steps

After pushing to GitHub:

1. ✅ Connect repository to Netlify (see DEPLOYMENT_GUIDE.md)
2. ✅ Set up Netlify form notifications
3. ✅ Configure custom domain (gematriacalculator.xyz)
4. ✅ Enable HTTPS (automatic with Netlify)

## Repository Settings Checklist

- [ ] Repository is **Private**
- [ ] README.md is visible
- [ ] .gitignore is working (node_modules not uploaded)
- [ ] All source code is uploaded
- [ ] Branch protection enabled (optional)
- [ ] Collaborators added (if needed)

## Useful Git Commands

```bash
# Check status
git status

# View remote
git remote -v

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Push new branch
git push -u origin feature-name
```
