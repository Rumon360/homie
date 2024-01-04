import * as React from "react";

interface EmailTemplateProps {
  firstName?: string;
  link: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  link,
}) => (
  <div>
    <h1>Welcome, {firstName ? firstName : "Sir"}!</h1>
    <div className="mt-4">
      <a href={link} className="text-blue-600">
        Activate now
      </a>
    </div>
  </div>
);
