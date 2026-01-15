-- Insert test MOUs data for CSE-AI department
INSERT INTO cai_mous (dept, s_no, organization_name, from_date, to_date, status, document_url) VALUES
('cse-ai', 1, 'NIT Warangal', '2023-01-01', '2025-12-31', 'Active', '/uploads/mous/nit-warangal.pdf'),
('cse-ai', 2, 'IIIT Hyderabad', '2022-06-01', '2026-06-30', 'Active', '/uploads/mous/iiit-hyd.pdf'),
('cse-ai', 3, 'Tech Mahindra', '2021-09-01', '2024-08-31', 'Inactive', '/uploads/mous/tech-mahindra.pdf'),
('cse-ai', 4, 'Google India', '2023-03-15', '2025-03-14', 'Active', '/uploads/mous/google.pdf'),
('cse-ai', 5, 'Microsoft India', '2022-11-01', '2027-10-31', 'Active', '/uploads/mous/microsoft.pdf'),
('cse-ai', 6, 'Amazon Web Services', '2023-07-01', '2024-06-30', 'Expired', '/uploads/mous/aws.pdf');
