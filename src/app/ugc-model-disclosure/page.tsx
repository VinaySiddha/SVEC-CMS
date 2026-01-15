import { Metadata } from 'next';
import UGCModelDisclosure from '@/pages/UGCModelDisclosure';

export const metadata: Metadata = {
  title: 'UGC Model Disclosure | Sri Vasavi Engineering College',
  description: 'Comprehensive UGC Model Disclosure format with complete institutional information including approvals, faculty, infrastructure, fees, placements and statutory compliance details for Sri Vasavi Engineering College.',
  keywords: [
    'UGC Model Disclosure',
    'Sri Vasavi Engineering College',
    'AICTE Approval',
    'NAAC Accreditation',
    'Engineering College Information',
    'Institutional Disclosure',
    'Academic Information',
    'Fee Structure',
    'Faculty Details',
    'Infrastructure Details'
  ],
  openGraph: {
    title: 'UGC Model Disclosure - Sri Vasavi Engineering College',
    description: 'Complete institutional information and compliance details as per UGC Model Disclosure format.',
    type: 'website',
    url: 'https://srivasaviengg.ac.in/ugc-model-disclosure',
  }
};

export default function UGCModelDisclosurePage() {
  return <UGCModelDisclosure />;
}