# SVEC-CMS (Sri Vasavi Engineering College - Content Management System)

<div align="center">

![SVEC Logo](https://via.placeholder.com/150x80/434A54/FFFFFF?text=SVEC-CMS)

A comprehensive Content Management System for Sri Vasavi Engineering College, designed to manage academic data, faculty information, student records, and institutional content with role-based access control.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-2.0-orange?logo=mysql)](https://mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 📚 Table of Contents

- [🚀 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Installation & Setup](#️-installation--setup)
- [📖 Usage Guide](#-usage-guide)
- [🔧 API Documentation](#-api-documentation)
- [🧪 Development](#-development)
- [🎨 Customization](#-customization)
- [🔍 Troubleshooting](#-troubleshooting)
- [📊 System Requirements](#-system-requirements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Credits & Acknowledgments](#-credits--acknowledgments)
- [📞 Support & Contact](#-support--contact)

## 🚀 Features

### 🎯 Core Functionality
- **🔐 Secure Authentication**: JWT-based authentication with role-based access control (RBAC)
- **🏢 Department Management**: Comprehensive management for all engineering departments
- **👨‍🏫 Faculty Profiles**: Detailed faculty information, achievements, and credentials
- **🎓 Student Management**: Student records, achievements, and academic data
- **📚 Academic Resources**: Course materials, syllabi, and educational content
- **🏆 Achievement Tracking**: Faculty and student accomplishments and awards
- **🔬 Laboratory Management**: Lab information, equipment, and facilities
- **📊 Analytics Dashboard**: Real-time statistics and performance metrics
- **🎪 Event Management**: Workshops, seminars, and organized events
- **🤝 Industry Connections**: MOUs, partnerships, and placement data

### 🛡️ Administrative Features
- **Super Admin System**: Centralized system administration and user management
- **Audit Logging**: Complete activity tracking and system monitoring
- **Permission Management**: Granular access control and user permissions
- **Data Import/Export**: Bulk operations for managing large datasets
- **Backup & Recovery**: Automated backup systems for data protection

### 🎨 User Experience
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🌙 Modern UI/UX**: Clean, professional interface with smooth animations
- **⚡ Fast Performance**: Optimized with Next.js 15 and modern web technologies
- **🔍 Advanced Search**: Comprehensive search and filtering capabilities

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 15.3.3 (React 18, TypeScript)
- **Backend**: Next.js API Routes
- **Database**: MySQL with optimized schemas
- **Styling**: Tailwind CSS with custom components
- **Authentication**: JWT with bcrypt password hashing
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React Context and Hooks
- **Deployment**: Cloudflare Pages, Firebase Hosting

### Project Structure
```
SVEC-CMS/
├── 📁 src/
│   ├── 📁 app/                 # Next.js App Router
│   │   ├── 📁 departments/     # Department-specific pages
│   │   ├── 📁 admin/          # Admin dashboard
│   │   ├── 📁 super-admin/    # Super admin system
│   │   └── 📁 api/            # API routes
│   ├── 📁 components/         # Reusable UI components
│   ├── 📁 pages/              # Legacy pages (being migrated)
│   ├── 📁 lib/                # Utility libraries
│   ├── 📁 types/              # TypeScript type definitions
│   └── 📁 utils/              # Helper functions
├── 📁 public/                 # Static assets
├── 📁 sql/                    # Database schemas and migrations
├── 📁 scripts/                # Setup and utility scripts
└── 📁 md/                     # Documentation files
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 18.0 or higher
- **MySQL** 8.0 or higher
- **Git** for version control

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/VinaySiddha/SVEC-CMS.git
   cd SVEC-CMS
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   # Database Configuration
   DATABASE_URL="mysql://username:password@localhost:3306/svec_cms"
   
   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-here"
   
   # Firebase Configuration (optional)
   FIREBASE_PROJECT_ID="your-project-id"
   FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   
   # AWS S3 Configuration (optional)
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   AWS_REGION="your-region"
   ```

4. **Database Setup**
   ```bash
   # Create database and tables
   mysql -u root -p < schema.sql
   
   # Run additional table setups
   mysql -u root -p < sql/create_faculty_achievements_table.sql
   mysql -u root -p < sql/create_placements_tables.sql
   ```

5. **Super Admin Setup** (Optional)
   ```bash
   chmod +x scripts/setup-super-admin.sh
   ./scripts/setup-super-admin.sh
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

7. **Access the Application**
   - Main Application: http://localhost:9002
   - Super Admin: http://localhost:9002/super-admin/login

### Production Deployment

#### Cloudflare Pages
```bash
npm run pages:build
npm run deploy
```

#### Traditional Hosting
```bash
npm run build
npm start
```

## 📖 Usage Guide

### For Students & Visitors
- Browse department information and faculty profiles
- View academic programs and course offerings
- Check placement statistics and industry connections
- Access educational resources and announcements

### For Faculty & Staff
- Update personal profiles and achievements
- Manage course content and materials
- Submit research publications and projects
- Track student progress and grades

### For Administrators
- Manage user accounts and permissions
- Upload and organize institutional content
- Generate reports and analytics
- Configure system settings

### For Super Administrators
- Oversee all system operations
- Manage department credentials
- Monitor system health and activity
- Perform bulk operations and maintenance

## 🔧 API Documentation

### Authentication Endpoints
```typescript
POST /api/auth/login          # User login
POST /api/auth/register       # User registration
POST /api/auth/verify         # Token verification
POST /api/auth/logout         # User logout
```

### Data Management Endpoints
```typescript
# Faculty Management
GET    /api/faculty           # List faculty members
POST   /api/faculty           # Add faculty member
PUT    /api/faculty/:id       # Update faculty member
DELETE /api/faculty/:id       # Remove faculty member

# Student Management
GET    /api/students          # List students
POST   /api/students          # Add student
PUT    /api/students/:id      # Update student
DELETE /api/students/:id      # Remove student

# Department Management
GET    /api/departments       # List departments
POST   /api/departments       # Add department
PUT    /api/departments/:id   # Update department
DELETE /api/departments/:id   # Remove department
```

### Super Admin Endpoints
```typescript
POST /api/super-admin/auth/login        # Super admin login
GET  /api/super-admin/dashboard/stats   # System statistics
GET  /api/super-admin/credentials       # User credentials
POST /api/super-admin/credentials       # Create credentials
```

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server (port 9002)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
```

### Development Workflow
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Run linting and type checking: `npm run lint && npm run typecheck`
4. Commit changes: `git commit -m "feat: your feature description"`
5. Push and create pull request

### Code Quality
- **ESLint**: Automated code linting and formatting
- **TypeScript**: Static type checking for enhanced reliability
- **Prettier**: Consistent code formatting (configured via ESLint)

## 🎨 Customization

### Styling
- **Primary Color**: Dark slate blue (#434A54)
- **Background**: Very light gray (#F9FAFA)
- **Accent**: Teal (#008080)
- **Font**: Inter (sans-serif)

### Theme Configuration
Edit `tailwind.config.ts` to customize the design system:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#434A54',
      background: '#F9FAFA',
      accent: '#008080'
    }
  }
}
```

## 🔍 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Database Connection Issues
1. Verify MySQL is running
2. Check database credentials in `.env.local`
3. Ensure database exists and is accessible
4. Run schema setup scripts again

#### Font Loading Issues
If Google Fonts fail to load:
```bash
# Use system fonts as fallback
# Edit src/app/layout.tsx and comment out Google Font imports
```

#### Permission Issues
```bash
# Fix file permissions
chmod +x scripts/*.sh

# Fix directory permissions
chmod -R 755 public/
```

### Debug Mode
Enable detailed logging by setting:
```env
NODE_ENV=development
DEBUG=true
```

## 📊 System Requirements

### Minimum Requirements
- **RAM**: 2GB
- **Storage**: 5GB free space
- **CPU**: Dual-core processor
- **Network**: Stable internet connection

### Recommended Requirements
- **RAM**: 8GB or higher
- **Storage**: 20GB free space (SSD preferred)
- **CPU**: Quad-core processor
- **Network**: High-speed broadband

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

### Code Style
- Follow existing code patterns
- Use TypeScript for type safety
- Write clear commit messages
- Include proper documentation
- Test your changes thoroughly

### Pull Request Process
1. Ensure all tests pass
2. Update README if needed
3. Follow the PR template
4. Request review from maintainers
5. Address feedback promptly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits & Acknowledgments

### Development Team
- **Project Lead**: VinaySiddha
- **Contributors**: SVEC Development Team

### Technologies Used
- [Next.js](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [MySQL](https://mysql.com/) - Database
- [Lucide React](https://lucide.dev/) - Icons

### Special Thanks
- Sri Vasavi Engineering College for supporting this project
- Open source community for excellent libraries and tools
- All contributors and testers

## 📞 Support & Contact

### Getting Help
- 📚 **Documentation**: Check the `/md` directory for detailed guides
- 🐛 **Issues**: Report bugs via GitHub Issues
- 💬 **Discussions**: Join GitHub Discussions for questions
- 📧 **Email**: Contact the development team

### Useful Links
- 🌐 **Live Demo**: [SVEC-CMS Demo](https://svec-cms.example.com)
- 📖 **Documentation**: [Full Documentation](./md/)
- 🔧 **API Reference**: [API Docs](./md/API.md)
- 🏗️ **Architecture**: [System Architecture](./md/ARCHITECTURE.md)

---

<div align="center">

**Made with ❤️ for Sri Vasavi Engineering College**

If this project helps you, please consider giving it a ⭐ star!

</div>