import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Tester() {
  const input = '# This is a header\n\nAnd this is a **paragraph**';
  return (
    <ReactMarkdown source={input}/>
  );
}
