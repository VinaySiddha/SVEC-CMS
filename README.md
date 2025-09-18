# 🏛️ SVEC-CMS - Sri Vasavi Engineering College Content Management System

<div align="center">

![SVEC Logo](https://img.shields.io/badge/SVEC-CMS-2563eb?style=for-the-badge&logo=graduation-cap&logoColor=white)

*A comprehensive digital platform for managing academic content, department information, and administrative operations at Sri Vasavi Engineering College*

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-orange?style=flat-square&logo=mysql&logoColor=white)](https://mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📖 Usage Guide](#-usage-guide)
- [🏛️ Department Management](#️-department-management)
- [👨‍💼 Super Admin System](#-super-admin-system)
- [🔒 Security Features](#-security-features)
- [🤝 Contributing](#-contributing)
- [📞 Support](#-support)

---

## ✨ Features

### 🎓 **Academic Management**
- **Department Information**: Comprehensive department profiles with faculty, facilities, and programs
- **Course Management**: Academic programs, syllabus management, and curriculum details
- **Faculty Profiles**: Detailed faculty information, achievements, and research activities
- **Student Resources**: Placements, scholarships, achievements, and academic support

### 🏢 **Administrative Features**
- **Content Management**: Dynamic content creation and management system
- **Event Management**: Workshop, seminar, and training program organization
- **Resource Management**: Labs, infrastructure, and facility management
- **Document Management**: Policies, handbooks, and institutional documents

### 💼 **Specialized Modules**
- **Research & Development**: R&D activities, publications, and innovation tracking
- **Industry Relations**: MoU management, industry partnerships, and collaborations
- **NAAC Compliance**: NAAC documentation and accreditation support
- **Library Management**: Digital library resources and catalog management

### 🔐 **Security & Administration**
- **Role-Based Access Control**: Multi-level user permissions and authentication
- **Super Admin Dashboard**: System-wide administration and monitoring
- **Audit Logging**: Comprehensive activity tracking and system logs
- **Data Security**: Encrypted data storage and secure API endpoints

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 15.3.3 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React icons
- **Forms**: React Hook Form with Zod validation

### **Backend**
- **Runtime**: Node.js with Next.js API routes
- **Database**: MySQL 8.0+ with connection pooling
- **Authentication**: JWT-based with bcrypt encryption
- **File Storage**: Local storage with S3 compatibility

### **Development Tools**
- **Package Manager**: npm
- **Build Tool**: Next.js with Turbopack
- **Code Quality**: ESLint, TypeScript strict mode
- **Deployment**: Cloudflare Pages with Wrangler

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.0 or higher
- **MySQL** 8.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VinaySiddha/SVEC-CMS.git
   cd SVEC-CMS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=svec_cms
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-256-bits-minimum
   
   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Create database and import schema
   mysql -u root -p -e "CREATE DATABASE svec_cms;"
   mysql -u root -p svec_cms < schema.sql
   ```

5. **Run database migrations** (if applicable)
   ```bash
   # Run any pending migrations
   node migrate-database.js
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:9002`

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
SVEC-CMS/
├── 📁 src/                          # Source code
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── 📁 api/                  # API routes
│   │   ├── 📁 departments/          # Department pages
│   │   ├── 📁 dashboard/            # Admin dashboards
│   │   └── 📁 super-admin/          # Super admin interface
│   ├── 📁 components/               # Reusable UI components
│   │   ├── 📁 forms/                # Form components
│   │   ├── 📁 ui/                   # Base UI components
│   │   └── 📁 widgets/              # Interactive widgets
│   ├── 📁 lib/                      # Utility libraries
│   ├── 📁 hooks/                    # Custom React hooks
│   ├── 📁 contexts/                 # React contexts
│   └── 📁 types/                    # TypeScript definitions
├── 📁 public/                       # Static assets
├── 📁 docs/                         # Documentation
├── 📄 schema.sql                    # Database schema
├── 📄 package.json                  # Dependencies
└── 📄 README.md                     # This file
```

---

## 🔧 Configuration

### Database Configuration

The system supports both local and remote MySQL databases:

**Local Setup:**
```bash
# Run the setup script
chmod +x setup-database.sh
./setup-database.sh
```

**Remote Setup:**
```bash
# For remote database setup
node setup-remote-super-admin.js
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_HOST` | Database host | ✅ |
| `DB_USER` | Database username | ✅ |
| `DB_PASSWORD` | Database password | ✅ |
| `DB_NAME` | Database name | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `NEXT_PUBLIC_APP_URL` | Application URL | ✅ |

---

## 📖 Usage Guide

### For Administrators

1. **Access Super Admin Panel**
   - Navigate to `/super-admin/login`
   - Use your admin credentials
   - Manage departments and user permissions

2. **Department Management**
   - Create and configure department profiles
   - Manage faculty and staff information
   - Update course and program details

### For Department Users

1. **Login to Department Dashboard**
   - Use your department credentials
   - Access your department's management interface
   - Update faculty profiles and department information

2. **Content Management**
   - Create and edit department content
   - Manage events and announcements
   - Upload and organize documents

---

## 🏛️ Department Management

The system supports comprehensive management for all engineering departments:

- **Computer Science & Engineering** (CSE)
- **Information Technology** (IT) 
- **Electronics & Communication** (ECE)
- **Electrical & Electronics** (EEE)
- **Mechanical Engineering** (MECH)
- **Civil Engineering** (CIVIL)
- **Artificial Intelligence & Machine Learning** (AI&ML)
- **Data Science** (DS)
- **Computer Science & Technology** (CST)

Each department has dedicated modules for:
- Faculty management
- Course administration  
- Research activities
- Student achievements
- Infrastructure management

---

## 👨‍💼 Super Admin System

### Features
- **🔐 Secure Authentication**: Enhanced JWT-based authentication
- **👥 Department Management**: Complete oversight of all departments
- **🔑 Credential Management**: Create and manage user credentials
- **📊 System Dashboard**: Real-time statistics and monitoring
- **🔍 Audit Logging**: Comprehensive activity tracking
- **⚙️ System Settings**: Global configuration management

### Setup
```bash
# Run super admin setup
chmod +x setup-super-admin.sh
./setup-super-admin.sh
```

### Access
- URL: `http://localhost:9002/super-admin/login`
- Default credentials are created during setup

---

## 🔒 Security Features

- **🛡️ Role-Based Access Control**: Granular permission system
- **🔐 JWT Authentication**: Secure token-based authentication
- **🔒 Password Encryption**: bcrypt encryption for all passwords
- **📝 Audit Trail**: Complete logging of administrative actions
- **🚫 Rate Limiting**: Protection against brute force attacks
- **🌐 CORS Protection**: Cross-origin request security
- **🔍 Input Validation**: Comprehensive data validation with Zod

---

## 🤝 Contributing

We welcome contributions to improve SVEC-CMS! Here's how you can help:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   npm run build
   npm run typecheck
   ```
5. **Submit a pull request**

### Coding Standards

- **TypeScript**: Use strict typing
- **Components**: Follow React best practices
- **Styling**: Use Tailwind CSS utilities
- **Documentation**: Update docs for new features
- **Testing**: Ensure code coverage

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements  
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔒 Security improvements
- ♿ Accessibility features

---

## 📞 Support

### Documentation Resources

- 📖 **[File Structure Guide](FILE_STRUCTURE.md)** - Detailed project structure
- 🛠️ **[Super Admin Guide](SUPER_ADMIN_README.md)** - Admin system documentation
- 🏢 **[Department Setup](DEPARTMENT_LOGIN_GUIDE.md)** - Department configuration
- 🔧 **[Remote Setup](REMOTE_SETUP_INSTRUCTIONS.md)** - Remote database setup

### Getting Help

- **🐛 Issues**: Report bugs via [GitHub Issues](https://github.com/VinaySiddha/SVEC-CMS/issues)
- **💬 Discussions**: Join conversations in [GitHub Discussions](https://github.com/VinaySiddha/SVEC-CMS/discussions)
- **📧 Email**: Contact the development team for technical support
- **📋 Wiki**: Check the [project wiki](https://github.com/VinaySiddha/SVEC-CMS/wiki) for detailed guides

### Troubleshooting

Common issues and solutions:

1. **Database Connection Issues**
   ```bash
   # Check database status
   sudo systemctl status mysql
   # Verify credentials in .env.local
   ```

2. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules
   npm install
   npm run build
   ```

3. **Permission Issues**
   ```bash
   # Fix script permissions
   chmod +x setup-*.sh
   ```

---

<div align="center">

**🎓 Built with ❤️ for Sri Vasavi Engineering College**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open-Source-brightgreen?style=for-the-badge)

---

© 2024 Sri Vasavi Engineering College. All rights reserved.

</div>