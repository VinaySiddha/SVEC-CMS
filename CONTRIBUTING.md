# Contributing to SVEC-CMS

Thank you for your interest in contributing to SVEC-CMS! This document provides guidelines and information to help you contribute effectively.

## 🤝 How to Contribute

### Types of Contributions
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Testing improvements

### Before You Start
1. Check existing issues to see if your bug/feature is already reported
2. For new features, open an issue first to discuss the approach
3. Fork the repository and create a feature branch
4. Follow the coding standards and guidelines

## 🏗️ Development Setup

### Prerequisites
- Node.js 18.0+
- MySQL 8.0+
- Git

### Setup Steps
```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/SVEC-CMS.git
cd SVEC-CMS

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Set up database
mysql -u root -p < schema.sql

# 5. Start development server
npm run dev
```

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React Components
```typescript
// ✅ Good
interface UserProfileProps {
  userId: string;
  displayName: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, displayName }) => {
  // Component logic
};

// ❌ Avoid
export const UserProfile = (props: any) => {
  // Component logic
};
```

### Styling
- Use Tailwind CSS classes
- Follow existing color scheme and design patterns
- Ensure responsive design
- Use semantic HTML elements

### API Routes
```typescript
// ✅ Good
export async function GET(request: Request) {
  try {
    // API logic
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## 🧪 Testing

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Writing Tests
- Write unit tests for utility functions
- Write integration tests for API routes
- Write component tests for React components
- Ensure good test coverage

## 📋 Pull Request Process

### Before Submitting
1. ✅ Run linting: `npm run lint`
2. ✅ Run type checking: `npm run typecheck`
3. ✅ Run tests: `npm run test`
4. ✅ Build successfully: `npm run build`
5. ✅ Update documentation if needed

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added new tests
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings/errors
```

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Node.js version:
- Database version:

**Additional context**
Any other context about the problem.
```

## ✨ Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context, mockups, or screenshots.

**Implementation ideas**
If you have ideas on how to implement this feature.
```

## 🔍 Code Review Guidelines

### For Contributors
- Keep changes focused and atomic
- Write clear commit messages
- Respond to feedback constructively
- Update your branch if needed

### For Reviewers
- Be constructive and helpful
- Explain the reasoning behind suggestions
- Approve when ready or request specific changes
- Focus on code quality, security, and maintainability

## 📁 Project Structure Guidelines

### Directory Organization
```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── lib/              # Utility libraries
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── hooks/            # Custom React hooks
```

### File Naming Conventions
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `PascalCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

## 🚀 Release Process

### Version Management
We use semantic versioning (semver):
- `MAJOR.MINOR.PATCH`
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Checklist
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to staging for testing
5. Deploy to production
6. Announce release

## 📞 Getting Help

### Communication Channels
- 💬 GitHub Discussions for general questions
- 🐛 GitHub Issues for bugs and feature requests
- 📧 Email for security concerns
- 💬 Discord/Slack for real-time discussion (if available)

### Documentation
- 📚 README.md - Getting started
- 📁 /md directory - Detailed documentation
- 🏗️ Architecture docs - System design
- 🔧 API docs - API reference

## 🏆 Recognition

### Contributors
All contributors will be recognized in:
- README.md contributors section
- Release notes
- Annual contributor appreciation

### Ways to Contribute
- Code contributions
- Documentation improvements
- Bug reports and testing
- Feature suggestions
- Community support

Thank you for contributing to SVEC-CMS! 🎉