import React from 'react';

interface SectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ icon: Icon, title, children }) => (
    <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Icon size={18} className="text-blue-600" /> {title}
        </h3>
        {children}
    </div>
);

export default Section;