# SVEC CMS

Content Management System for Sri Vasavi Engineering College.

## Project Overview

This project is a content management system for Sri Vasavi Engineering College, built with Next.js and Tailwind CSS.

## Documentation

### Design & UI

- [Color Scheme Documentation](./md/COLOR_SCHEME_DOCUMENTATION.md) - Information about the website's color scheme standards
- [File Structure](./md/FILE_STRUCTURE.md) - Overview of project file structure
- [Performance Optimization](./md/PERFORMANCE_OPTIMIZATION.md) - Details about performance optimizations

### Department-Specific

- [Civil Department Dynamic Implementation](./md/CIVIL_DYNAMIC_IMPLEMENTATION.md)
- [CSEAI Dynamic Implementation](./md/COMPLETE_CSEAI_DYNAMIC_IMPLEMENTATION.md)
- [CSEAI Dynamic Content Implementation](./md/CSEAI_DYNAMIC_CONTENT_IMPLEMENTATION.md)
- [Department Login Guide](./md/DEPARTMENT_LOGIN_GUIDE.md)

### Admin & Setup

- **[Department Admin System](./DEPARTMENT_ADMIN_SYSTEM.md) - Complete guide for department-specific admin logins and CRUD operations** 🆕
- [Super Admin Implementation Guide](./md/SUPER_ADMIN_IMPLEMENTATION_GUIDE.md)
- [Super Admin README](./md/SUPER_ADMIN_README.md)
- [Docker Setup](./md/DOCKER.md)
- [Docker Hub Setup](./md/DOCKER_HUB_SETUP.md)
- [Remote Setup Instructions](./md/REMOTE_SETUP_INSTRUCTIONS.md)

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Docker (for containerized development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/svec-cms.git
   cd svec-cms
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Docker Setup

To run the project using Docker:

1. Build the Docker image:
   ```bash
   docker-compose -f docker-compose.dev.yml build
   ```

2. Start the containers:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

## Deployment

For deployment instructions, see [REMOTE_SETUP_INSTRUCTIONS.md](./md/REMOTE_SETUP_INSTRUCTIONS.md).

## Contributing

Please follow the color scheme standards documented in [COLOR_SCHEME_DOCUMENTATION.md](./md/COLOR_SCHEME_DOCUMENTATION.md) when making UI changes.