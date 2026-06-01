# Security Policy

This project is designed for enterprise use. We take security seriously.

## Reported Vulnerabilities
If you discover a security vulnerability, please do not open a public issue. Instead:
1. Email `security@example.com` with a detailed report.
2. Include a Proof-of-Concept (PoC) if possible.

## Security Measures Implemented
- **SOP (Sanitization of Parameters)**: All API inputs are validated using Zod/Express-Validator.
- **Rate Limiting**: Implemented to prevent DoS and brute-force attacks.
- **Security Headers**: Helmet.js is used to protect against common web vulnerabilities.
- **NoSQL Injection Protection**: Strict schema enforcement via Mongoose.
