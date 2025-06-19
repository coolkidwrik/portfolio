import React from 'react';

interface ContentSectionProps {
    heading: string;
    subtitle: string;
    description: string;
    list?: string[];
    date?: string;
    link?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ heading, subtitle, description, list, date, link }) => {
  return (
    <div className="text-left pt-[5%] px-4 sm:px-10 w-full max-w-full text-white flex flex-col items-start overflow-x-hidden break-words">
      <div className="flex items-center space-x-3">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline">
            <h2 className="heading underline whitespace-nowrap hover:text-blue-400 transition-colors duration-200">
              {heading}
            </h2>
          </a>
        ) : (
          <h2 className="heading underline whitespace-nowrap">{heading}</h2>
        )}
        {date && (
          <span className="text-sm text-gray-300 ml-4">{date}</span>
        )}
      </div>
      <h3 className="underline text-lg">{subtitle}</h3>
      <p className="content-text">{description}</p>
      {list && list.length > 0 && (
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-200">
          {list.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContentSection;
