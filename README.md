# SecureTasker - Secure Web Application with CI/CD Integration

A comprehensive secure web-based task management application demonstrating enterprise-level security practices, OWASP compliance, and automated CI/CD pipeline integration.

## 🔐 Security Features

### Input Validation & Sanitization
- **Client & Server-side Validation**: Comprehensive validation using Zod schemas
- **SQL Injection Prevention**: Parameterized queries and ORM usage
- **XSS Protection**: Input sanitization and output encoding
- **CSRF Protection**: Token-based CSRF protection

### Authentication & Session Management
- **Secure Password Hashing**: bcrypt with salt rounds
- **JWT Token Management**: Secure token generation and validation
- **Session Timeout**: Automatic logout and session expiration
- **Multi-factor Authentication Ready**: Extensible auth system

### OWASP Compliance
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- **HTTPS Enforcement**: Secure transport layer
- **Rate Limiting**: API endpoint protection
- **Error Handling**: Secure error messages without information disclosure

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **UI Components**: shadcn/ui
- **Security**: Custom middleware, security headers

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow
- **Security Scanning**: Bandit, ESLint Security, npm audit
- **Code Quality**: TypeScript checking, ESLint, Prettier
- **Dependency Scanning**: Snyk vulnerability detection
- **Automated Testing**: Unit and integration tests
- **Deployment**: Automated deployment to Vercel
- **OWASP ZAP**: Dynamic security testing

### Security Tools Integration
- **Bandit**: Python security linter
- **ESLint Security Plugin**: JavaScript security rules
- **Snyk**: Dependency vulnerability scanning
- **OWASP ZAP**: Dynamic application security testing

## 📋 Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- GitHub account (for CI/CD)

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd securetasker
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Create a `.env.local` file:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. **Database Setup**
   - Run the SQL scripts in the `scripts/` folder in your Supabase SQL editor
   - This creates the tasks table with proper RLS policies

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Deployment

1. **Vercel Deployment**
   \`\`\`bash
   npm run build
   vercel --prod
   \`\`\`

2. **Environment Variables**
   Set the following in your Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔍 Security Implementation Details

### Input Validation
\`\`\`typescript
const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'in_progress', 'completed'])
})
\`\`\`

### Security Headers
\`\`\`typescript
const securityHeaders = {
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': 'default-src \'self\'; ...',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
}
\`\`\`

### Row Level Security (RLS)
\`\`\`sql
CREATE POLICY "Users can only see their own tasks" ON tasks
    FOR SELECT USING (auth.uid() = user_id);
\`\`\`

## 📊 Security Testing Results

### Static Analysis
- **Bandit**: Python security linter results
- **ESLint Security**: JavaScript security rule violations
- **npm audit**: Dependency vulnerability scan

### Dynamic Testing
- **OWASP ZAP**: Automated security testing
- **Manual Penetration Testing**: Security assessment results

## 🏗️ Architecture

### Security Architecture
\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │    Database     │
│                 │    │                 │    │                 │
│ • Input Valid.  │───▶│ • Auth Middleware│───▶│ • RLS Policies  │
│ • XSS Protection│    │ • Rate Limiting │    │ • Encrypted Data│
│ • CSRF Tokens   │    │ • Security Headers│   │ • Audit Logs   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

### CI/CD Pipeline
\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Commit    │───▶│   Security  │───▶│    Build    │───▶│   Deploy    │
│             │    │   Scanning  │    │   & Test    │    │             │
│ • Code Push │    │ • Bandit    │    │ • TypeScript│    │ • Vercel    │
│ • PR Review │    │ • ESLint    │    │ • Unit Tests│    │ • OWASP ZAP │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
\`\`\`

## 🧪 Testing

### Security Tests
\`\`\`bash
# Run security linting
npm run lint:security

# Run dependency audit
npm audit

# Run Bandit scan
bandit -r . -f json
\`\`\`

### Unit Tests
\`\`\`bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
\`\`\`

## 📈 Monitoring & Logging

### Security Monitoring
- Authentication attempts logging
- Failed login rate limiting
- Suspicious activity detection
- Error tracking and alerting

### Performance Monitoring
- Response time tracking
- Database query optimization
- Resource usage monitoring

## 🔧 Configuration

### Security Configuration
\`\`\`typescript
// middleware.ts
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
\`\`\`

### Database Configuration
\`\`\`sql
-- Enable RLS on all tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "secure_access" ON tasks
    USING (auth.uid() = user_id);
\`\`\`

## 📚 Security Best Practices Implemented

1. **Authentication Security**
   - Strong password requirements
   - Secure session management
   - JWT token validation
   - Automatic logout

2. **Data Protection**
   - Input validation and sanitization
   - Output encoding
   - SQL injection prevention
   - XSS protection

3. **Infrastructure Security**
   - HTTPS enforcement
   - Security headers
   - CSRF protection
   - Rate limiting

4. **Monitoring & Logging**
   - Security event logging
   - Error tracking
   - Performance monitoring
   - Audit trails

## 🚨 Security Incident Response

### Incident Response Plan
1. **Detection**: Automated monitoring and alerting
2. **Assessment**: Security team evaluation
3. **Containment**: Immediate threat mitigation
4. **Recovery**: System restoration and validation
5. **Lessons Learned**: Post-incident analysis

## 🧑‍🤝‍🧑 Contributors
- [Muhammad Mazhar Saeed](https://www.github.com/MR-PROFESSOR-790/)
- [Mohsin Mukhtiar Lashari](https://www.github.com/president-xd/)
- [Khizar Ali Shah](https://www.github.com/eros938/)
- [Qazi Muhammad Awais](https://www.github.com/qaziawais/)

## 📞 Support & Contact

For security issues or questions:
- Create an issue in the GitHub repository
- Contact the security team at security@securetasker.com
- Review the security policy in SECURITY.md

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OWASP for security guidelines
- Supabase for secure backend infrastructure
- Next.js team for security-first framework
- Security community for best practices

---

**SecureTasker** demonstrates enterprise-level security practices for modern web applications. Built with security-first principles and continuous monitoring.
