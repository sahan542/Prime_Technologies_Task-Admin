import React from 'react';

const QAPage = () => {
  const token = localStorage.getItem("token"); 
  const qaItems = [
    { id: 1, question: "How do I track my order?", answer: "You can track your order from the 'Orders' section in your dashboard." },
    { id: 2, question: "How to reset my password?", answer: "Go to your account settings and click on 'Reset Password'." },
    { id: 3, question: "What is the return policy?", answer: "You can return products within 30 days of purchase." },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black">FAQ (Questions & Answers)</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-black">ID</th>
            <th className="border px-4 py-2 text-black">Question</th>
            <th className="border px-4 py-2 text-black">Answer</th>
            <th className="border px-4 py-2 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {qaItems.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2 text-black">{item.id}</td>
              <td className="border px-4 py-2 text-black">{item.question}</td>
              <td className="border px-4 py-2 text-black">{item.answer}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500">Edit</button> | <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QAPage;
