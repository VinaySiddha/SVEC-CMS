# GitHub Actions Secrets Setup Guide

## Required Secrets for Docker Hub Integration

To enable automatic Docker image building and pushing, you need to configure the following secrets in your GitHub repository:

### 1. Navigate to Repository Settings
1. Go to your GitHub repository: `https://github.com/VinaySiddha/SVEC-CMS`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**

### 2. Add Required Secrets

Click **New repository secret** and add these secrets:

#### DOCKER_USERNAME
- **Name**: `DOCKER_USERNAME`
- **Value**: `vinaysiddha` (your Docker Hub username)

#### DOCKER_PASSWORD
- **Name**: `DOCKER_PASSWORD`
- **Value**: Your Docker Hub password or access token (recommended)

### 3. Docker Hub Access Token (Recommended)

Instead of using your password, create an access token:

1. Log in to Docker Hub
2. Go to **Account Settings** → **Security**
3. Click **New Access Token**
4. Name: `GitHub-Actions-SVEC-CMS`
5. Permissions: **Read, Write, Delete**
6. Click **Generate**
7. Copy the token and use it as `DOCKER_PASSWORD` secret

### 4. Verify Setup

After adding secrets, they should appear like this:
```
DOCKER_USERNAME: vinaysiddha
DOCKER_PASSWORD: ••••••••••••••••••••
```

### 5. Test the Workflow

The workflow will automatically trigger when you:
- Push to `main`, `master`, or `celigo@abhi` branches
- Create a pull request
- Manually trigger from Actions tab

### Security Notes

- ✅ Never commit Docker Hub credentials to your repository
- ✅ Use access tokens instead of passwords
- ✅ Regularly rotate access tokens
- ✅ Review token permissions periodically
- ❌ Don't share access tokens in public channels

### Troubleshooting

If the workflow fails:
1. Check if secrets are correctly set
2. Verify Docker Hub username is correct
3. Ensure access token has proper permissions
4. Check workflow logs in GitHub Actions tab