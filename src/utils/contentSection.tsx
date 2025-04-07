import React from 'react';

interface ContentSectionProps {
    heading: string;
    subtitle: string;
    description: string;
    date?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ heading, subtitle, description, date }) => {
  return (
    <div className="text-left pt-[5%] pr-[5%] text-white flex flex-col items-start">
      <div className="w-full flex justify-between items-center">
        <h2 className="heading underline whitespace-nowrap">{heading}</h2>
        {date && (
          <span className="text-sm text-gray-300 ml-4">{date}</span>
        )}
      </div>
      <h3 className="underline text-lg">{subtitle}</h3>
      <p className="content-text">{description}</p>
    </div>
  );
};

export default ContentSection;
