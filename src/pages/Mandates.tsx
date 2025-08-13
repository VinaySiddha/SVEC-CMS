import React, { useState } from 'react';
import { FileText, Download, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Mandates: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hr-policy');

  const tabs = [
    { id: 'hr-policy', label: 'HR Policy' },
    { id: 'mandatory-disclosure', label: 'Mandatory Disclosure' },
    { id: 'anti-ragging', label: 'Anti Ragging' },
    { id: 'ariia-nirf-aicte', label: 'ARIIA, NIRF, AICTE' },
    { id: 'stoc-2020', label: 'STOC-2020' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'nba-abc', label: 'NBA-ABC Scheme' },
  ];

  const hrPolicyData = [
    {
      title: 'HUMAN RESOURCES AND QUALITY POLICY',
      link: 'http://srivasaviengg.ac.in/uploads/csemous/csemous_2017-2018.pdf'
    }
  ];

  const mandatoryDisclosureData = [
    {
      section: 'NBA & NAAC Status',
      items: [
        {
          title: 'NBA & NAAC Status',
          link: 'uploads/NBA_NAAC.jpg'
        }
      ]
    },
    {
      section: 'NAAC Accreditation',
      items: [
        {
          title: 'NAAC Accreditation Status',
          link: 'uploads/NAAC Accreditation.jpg'
        }
      ]
    },
    {
      section: 'NBA Accreditation',
      items: [
        {
          title: 'NBA Accreditation Copy',
          link: 'nba_acc.php'
        }
      ]
    },
    {
      section: 'Information submitted to AICTE',
      items: [
        {
          title: 'AICTE Application Part 1, 2 Report 2023_24',
          link: 'aicte_2023_1_2.php'
        },
        {
          title: 'AICTE Application Part 2 Report 2022_23',
          link: 'aicte_2022_2.php'
        },
        {
          title: 'AICTE Application Part 1 Report 2022_23',
          link: 'aicte_2022_1.php'
        },
        {
          title: 'AICTE Application Part 2 Report 2021_22',
          link: 'aicte_2021_2.php'
        },
        {
          title: 'AICTE Application Part 1 Report 2021_22',
          link: 'aicte_2021_1.php'
        },
        {
          title: 'AICTE Application Part 1 & 2 Report 2010_21',
          link: 'aicte_2020_1.php'
        },
        {
          title: 'AICTE Application Part 2 Report 2019_20',
          link: 'aicte_2019_2.php'
        },
        {
          title: 'AICTE Application Part 1 Report 2019_20',
          link: 'aicte_2019_1.php'
        },
        {
          title: 'AICTE Application Part 2 Report 2018_19',
          link: 'aicte_2018_2.php'
        },
        {
          title: 'AICTE Application Part 1 Report 2018_19',
          link: 'aicte_2018_1.php'
        }
      ]
    }
  ];

  const antiRaggingData = [
    {
      title: 'Anti Ragging during the A.Y-2022-23',
      link: 'uploads/2022-23 anti-ragging.pdf'
    },
    {
      title: 'Anti Ragging during the A.Y-2021-22',
      link: 'uploads/2021-22 anti-ragging.pdf'
    },
    {
      title: 'Anti Ragging during the A.Y-2020-21',
      link: 'uploads/2020-21 anti ragging.pdf'
    },
    {
      title: 'Anti Ragging wardens and care takers during the A.Y-2020-21',
      link: 'uploads/2020-21 anti-ragging wardens and care takers.pdf'
    },
    {
      title: 'Anti Ragging Committees during the A.Y-2020-21',
      link: 'uploads/2020-21 anti-ragging committee.pdf'
    },
    {
      title: 'Anti Ragging during the A.Y-2019-20',
      link: 'uploads/2019-20 anti-ragging.pdf'
    },
    {
      title: 'Anti Ragging during the A.Y-2018-19',
      link: 'uploads/2018-19 anti-ragging (2).pdf'
    }
  ];

  const ariiaData = [
    {
      title: 'ARIIA Details',
      link: 'uploads/ariia_details.pdf'
    }
  ];

  const nirfData = [
    {
      title: 'For National Institutional Ranking Framework (NIRF) Full Report-2023',
      link: 'uploads/nirf_files/SRI VASAVI ENGINEERING COLLEGE20230103 NIRF OVERALL.pdf'
    },
    {
      title: 'For National Institutional Ranking Framework (NIRF) Engineering-2023',
      link: 'uploads/nirf_files/SRI VASAVI ENGINEERING COLLEGE20230103 NIRF Engg.pdf'
    },
    {
      title: 'For National Institutional Ranking Framework (NIRF) Full Report-2022',
      link: 'uploads/nirf_files/nirf_details_2022.pdf'
    },
    {
      title: 'For National Institutional Ranking Framework (NIRF) Engineering-2022',
      link: 'uploads/nirf_files/nirf_details_eng_2022.pdf'
    },
    {
      title: 'For National Institutional Ranking Framework (NIRF) Full Report-2021',
      link: 'uploads/nirf_files/nirf_details_2021.pdf'
    },
    {
      title: 'For National Institutional Ranking Framework (NIRF) Engineering-2021',
      link: 'uploads/nirf_files/NIRF_Eng_2021.pdf'
    },
    {
      title: 'For National Institutional Ranking Framework (NIRF) Full Report-2020',
      link: 'uploads/nirf_files/nirf_details_2020.pdf'
    },
    {
      title: 'For National Institutional Ranking Framework (NIRF) Engineering-2020',
      link: 'uploads/nirf_files/NIRF_Eng.pdf'
    }
  ];

  const aicteData = [
    { title: 'APPROVAL 2022-23', link: 'uploads/AICTE/AICTE_2022-23.PDF' },
    { title: 'APPROVAL 2021-22', link: 'uploads/AICTE/AICTE_2021-22.PDF' },
    { title: 'APPROVAL 2020-21', link: 'uploads/AICTE/AICTE_2020-21.PDF' },
    { title: 'APPROVAL 2019-20', link: 'uploads/AICTE/AICTE_2019-20.PDF' },
    { title: 'APPROVAL 2018-19', link: 'uploads/AICTE/AICTE_2018-19.PDF' },
    { title: 'APPROVAL 2017-18', link: 'uploads/AICTE/AICTE_2017-18.PDF' },
    { title: 'APPROVAL 2016-17', link: 'uploads/AICTE/AICTE_2016-17.PDF' },
    { title: 'APPROVAL 2015-16', link: 'uploads/AICTE/AICTE_2015-16.PDF' },
    { title: 'APPROVAL 2014-15', link: 'uploads/AICTE/AICTE_2014-15.PDF' },
    { title: 'APPROVAL 2013-14', link: 'uploads/AICTE/AICTE_2013-14.PDF' },
    { title: 'APPROVAL 2012-13', link: 'uploads/AICTE/AICTE_2012-13.PDF' },
    { title: 'APPROVAL 2011-12', link: 'uploads/AICTE/AICTE_2011-12.PDF' },
    { title: 'APPROVAL 2010-11', link: 'uploads/AICTE/AICTE_2010-11.PDF' },
    { title: 'APPROVAL 2009-10', link: 'uploads/AICTE/AICTE_2009-10.PDF' },
    { title: 'APPROVAL 2008-09', link: 'uploads/AICTE/AICTE_2008-09.PDF' },
    { title: 'APPROVAL 2007-08', link: 'uploads/AICTE/AICTE_2007-08.PDF' },
    { title: 'APPROVAL 2006-07', link: 'uploads/AICTE/AICTE_2006-07.PDF' },
    { title: 'APPROVAL 2005-06', link: 'uploads/AICTE/AICTE_2005-06.PDF' },
    { title: 'APPROVAL 2004-05', link: 'uploads/AICTE/AICTE_2004-05.PDF' },
    { title: 'APPROVAL 2003-04', link: 'uploads/AICTE/AICTE_2003-04.PDF' },
    { title: 'APPROVAL 2002-03', link: 'uploads/AICTE/AICTE_2002-03.PDF' },
    { title: 'APPROVAL 2001-02', link: 'uploads/AICTE/AICTE_2001-02.PDF' }
  ];

  const stocData = [
    {
      title: 'National Virtual Conference on Solutions To Overcome COVID-19 Crisis (STOC2020)',
      link: 'STOC 2020.pdf'
    }
  ];

  const feedbackData = [
    {
      title: 'Dear Students/Faculty, please login into your e-cap account to submit feedback',
      link: 'http://sves.org.in/ecap/'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hr-policy':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-primary">HR Policy</h3>
            <div className="text-center">
              {hrPolicyData.map((item, index) => (
                <div key={index} className="mb-4">
                  <span className="text-foreground">{item.title} - </span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                  >
                    View <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case 'mandatory-disclosure':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-primary">Mandatory Disclosure</h2>
            {mandatoryDisclosureData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h4 className="text-xl font-semibold text-primary">{section.section}</h4>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <FileText className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <span className="text-foreground">{item.title} - </span>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                        >
                          Click here <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'anti-ragging':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-primary">Anti Ragging</h2>
            <div className="space-y-4">
              {antiRaggingData.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-4 bg-secondary/10 rounded-lg">
                  <FileText className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span className="text-foreground">{item.title} - </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                    >
                      Click here <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ariia-nirf-aicte':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-primary">ARIIA, NIRF, AICTE</h2>

            {/* ARIIA Section */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">ARIIA:</h4>
              <div className="space-y-3">
                {ariiaData.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <span className="text-foreground">{item.title} - </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        Click here <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NIRF Section */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">NIRF:</h4>
              <div className="space-y-3">
                {nirfData.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <span className="text-foreground">{item.title} - </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        Click here <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AICTE Section */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">AICTE:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aicteData.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-secondary/10 rounded-lg">
                    <FileText className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <span className="text-foreground">{item.title} - </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'stoc-2020':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">STOC-2020</h2>
            <h3 className="text-xl font-semibold text-primary">CMT Microsoft for Online Submission of Papers</h3>
            <div className="space-y-4">
              {stocData.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-4 bg-secondary/10 rounded-lg">
                  <FileText className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span className="text-foreground">{item.title} - </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                    >
                      Click here <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-primary">Feedback</h3>
            <div className="space-y-4">
              {feedbackData.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-4 bg-secondary/10 rounded-lg">
                  <ExternalLink className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span className="text-foreground">{item.title} - </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                    >
                      Click here <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'nba-abc':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-primary">NBA-ABC Scheme</h2>
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-center text-primary">Video Gallery</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((videoNum) => (
                  <div key={videoNum} className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`http://srivasaviengg.ac.in/uploads/nbabac/video${videoNum}.mp4`}
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg shadow-lg"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-foreground/60">Content for {tabs.find(tab => tab.id === activeTab)?.label} will be available soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-20 w-full rounded-none mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Mandates</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Official documents, policies, and mandatory disclosures
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-16">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-secondary/20 text-foreground hover:bg-secondary/40'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mandates;
