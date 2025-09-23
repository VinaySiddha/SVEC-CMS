import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, ExternalLink } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';

interface FAQ {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: 'general' | 'admissions' | 'departments' | 'faculty' | 'facilities' | 'placements' | 'fees' | 'contact';
}

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All FAQs', icon: '📋' },
    { id: 'general', name: 'General Info', icon: '🏛️' },
    { id: 'admissions', name: 'Admissions', icon: '📝' },
    { id: 'departments', name: 'Departments', icon: '🎓' },
    { id: 'faculty', name: 'Faculty', icon: '👨‍🏫' },
    { id: 'facilities', name: 'Facilities', icon: '🏢' },
    { id: 'placements', name: 'Placements', icon: '💼' },
    { id: 'fees', name: 'Fees', icon: '💰' },
    { id: 'contact', name: 'Contact', icon: '📞' }
  ];

  useEffect(() => {
    fetchFAQs();
  }, []);

  useEffect(() => {
    filterFAQs();
  }, [faqs, activeCategory, searchTerm]);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/chatbot/faqs');
      const result = await response.json();
      if (result.success) {
        setFaqs(result.data);
        setFilteredFaqs(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFAQs = () => {
    let filtered = faqs;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(search) ||
        faq.answer.toLowerCase().includes(search) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(search))
      );
    }

    setFilteredFaqs(filtered);
  };

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return faqs.length;
    return faqs.filter(faq => faq.category === categoryId).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Frequently Asked Questions - SVEC</title>
        <meta name="description" content="Find answers to frequently asked questions about Sri Vasavi Engineering College - admissions, departments, facilities, placements, and more." />
        <meta name="keywords" content="SVEC FAQ, engineering college questions, admissions help, department information" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Find quick answers to common questions about Sri Vasavi Engineering College
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B22222] focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-[#B22222] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {getCategoryCount(category.id)}
                  </span>
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mb-6 text-gray-600">
              Showing {filteredFaqs.length} of {faqs.length} FAQs
              {searchTerm && (
                <span className="ml-2">
                  for "<span className="font-semibold text-[#B22222]">{searchTerm}</span>"
                </span>
              )}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {faq.question}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-[#B22222] text-white px-2 py-1 rounded-full">
                            {categories.find(c => c.id === faq.category)?.name}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQs found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search term or selecting a different category
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#B22222] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team is here to help you with any queries or concerns
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg">
                <Phone className="w-8 h-8 text-[#B22222] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-3">Speak with our admission team</p>
                <a 
                  href="tel:+918818284355" 
                  className="text-[#B22222] hover:underline font-medium"
                >
                  08818-284355
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <Mail className="w-8 h-8 text-[#B22222] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-3">Get detailed information</p>
                <a 
                  href="mailto:admissions@srivasaviengg.ac.in" 
                  className="text-[#B22222] hover:underline font-medium"
                >
                  admissions@srivasaviengg.ac.in
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <MessageCircle className="w-8 h-8 text-[#B22222] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-3">Chat with our support team</p>
                <button className="text-[#B22222] hover:underline font-medium">
                  Start Chat
                </button>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/Contact" 
                className="inline-flex items-center gap-2 bg-[#B22222] text-white px-6 py-3 rounded-lg hover:bg-[#8B0000] transition-colors duration-200"
              >
                Visit Contact Page
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;