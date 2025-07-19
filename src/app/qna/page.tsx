// 'use client';

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { FaTrash } from "react-icons/fa6";
// import { BiWorld } from "react-icons/bi";
// import SignInModal from '@/components/modals/SignInModal'; // Make sure this is the correct path

// interface Ques {
//   qna_id: number;
//   product_id: number;
//   user_email: string;
//   question: string;
//   answer: string;
//   is_public: boolean;
//   created_at: string;
// }

// const QAPage = () => {
//   const [questions, setQuestions] = useState<Ques[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [newAnswer, setNewAnswer] = useState<{ [key: number]: string }>({}); // Store the new answer being typed
//   const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);

//   const token = useSelector((state: RootState) => state.auth.token);
//   console.log("Access Token from Redux:", token);

//   useEffect(() => {
//     if (!token) {
//       setOpenSignInModal(true); // Show sign-in modal if no token
//       return; // Skip fetch if token is missing
//     }

//     const fetchQuestions = async () => {
//       setLoading(true);

//       try {
//         const response = await fetch("http://localhost:8000/api/admin/qna/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();

//           // Check if the response is an array
//           if (Array.isArray(data)) {
//             setQuestions(data);
//           } else {
//             console.error("Received data is not an array:", data);
//           }
//         } else {
//           console.error("Failed to fetch questions set:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching questions set:", error);
//       }
//     };

//     fetchQuestions();
//   }, [token]);

//   // Handle saving the answer
//   const handleSaveAnswer = async (qnaId: number) => {
//     const answer = newAnswer[qnaId];
//     if (!answer) return;

//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/admin/qna/${qnaId}/answer`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ answer }),
//         }
//       );

//       if (response.ok) {
//         // Update the questions list with the new answer
//         const updatedQuestions = questions.map((q) =>
//           q.qna_id === qnaId ? { ...q, answer } : q
//         );
//         setQuestions(updatedQuestions);
//       } else {
//         console.error("Failed to save answer:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error saving answer:", error);
//     }
//   };

//   // Handle answer input change
//   const handleAnswerChange = (qnaId: number, value: string) => {
//     setNewAnswer((prev) => ({ ...prev, [qnaId]: value }));
//   };

//   // Function to handle deleting the order
//   const handleDeleteQna = async (qnaId: number) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this order?");
//     if (!confirmDelete) return;

//     try {
//       const response = await fetch(`http://localhost:8000/api/admin/qna/${qnaId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         setQuestions(questions.filter((ques) => ques.qna_id !== qnaId));
//         alert("QnA deleted successfully.");
//       } else {
//         console.error("Failed to delete the QnA:", response.statusText);
//         alert("Failed to delete the QnA.");
//       }
//     } catch (error) {
//       console.error("Error deleting QnA:", error);
//       alert("Error deleting the QnA.");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-[#7b1f4b]">
//         FAQ (Questions & Answers)
//       </h2>
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2 text-black">ID</th>
//             <th className="border px-4 py-2 text-black">Question</th>
//             <th className="border px-4 py-2 text-black">Answer</th>
//             <th className="border px-4 py-2 text-black">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {questions.map((q) => (
//             <tr key={q.qna_id}>
//               <td className="border px-4 py-2 text-black text-center align-middle">
//                 {q.qna_id}
//               </td>
//               <td className="border px-4 py-2 text-black text-center align-middle">
//                 {q.question}
//               </td>
//               <td className="border px-4 py-2 text-black text-center align-middle">
//                 {q.answer === "" ? (
//                   // Show input and save button if answer is empty
//                   <>
//                     <input
//                       type="text"
//                       value={newAnswer[q.qna_id] || ""}
//                       onChange={(e) =>
//                         handleAnswerChange(q.qna_id, e.target.value)
//                       }
//                       className="border p-2 rounded-md"
//                     />
//                     <button
//                       onClick={() => handleSaveAnswer(q.qna_id)}
//                       className="ml-2 text-white bg-[#7b1f4b] px-4 py-2 rounded-md"
//                     >
//                       Save
//                     </button>
//                   </>
//                 ) : (
//                   // Display the answer if it's already present
//                   q.answer
//                 )}
//               </td>
//               <td className="border px-4 py-2 text-black text-center align-middle">
//                 <button className="text-[#7b1f4b]">
//                   <BiWorld />
//                 </button>{" "}
//                 |{" "}
//                 <button className="text-[#7b1f4b]" onClick={() => handleDeleteQna(q.qna_id)}>
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Show Sign In Modal if token is missing */}
//       {openSignInModal && (
//         <SignInModal
//           isOpen={openSignInModal}
//           closeModal={() => setOpenSignInModal(false)} // Close modal when user logs in
//         />
//       )}
//     </div>
//   );
// };

// export default QAPage;


'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { FaTrash } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import SignInModal from '@/components/modals/SignInModal'; // Ensure this is the correct path

interface Ques {
  qna_id: number;
  product_id: number;
  user_email: string;
  question: string;
  answer: string;
  is_public: boolean;
  created_at: string;
}

const QAPage = () => {
  const [questions, setQuestions] = useState<Ques[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newAnswer, setNewAnswer] = useState<{ [key: number]: string }>({}); // Initialize the newAnswer state
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const [totalPages, setTotalPages] = useState(1);  // Track total pages
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.auth.token);
  console.log("Access Token from Redux:", token);

  useEffect(() => {
    if (!token) {
      setOpenSignInModal(true); // Show sign-in modal if no token
      return; // Skip fetch if token is missing
    }

    const fetchQuestions = async () => {
      setLoading(true);

      try {
        const response = await axios.get("http://localhost:8000/api/admin/qna/", {
          headers: {
            "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
          },
          params: { page: currentPage, limit: 8 }, // Fetch QnAs for the current page
        });

        if (response.data) {
          setQuestions(response.data.qnas); // Set the questions state with the fetched data
          setTotalPages(response.data.totalPages);  // Set total pages from the response
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        setError("Error fetching QnA data");
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [token, currentPage]);

  // Function to handle page change (Previous/Next)
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);  // Update current page
    }
  };

  // Handle saving the answer
  const handleSaveAnswer = async (qnaId: number) => {
    const answer = newAnswer[qnaId];
    if (!answer) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/qna/${qnaId}/answer`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answer }),
        }
      );

      if (response.ok) {
        // Update the questions list with the new answer
        const updatedQuestions = questions.map((q) =>
          q.qna_id === qnaId ? { ...q, answer } : q
        );
        setQuestions(updatedQuestions);
      } else {
        console.error("Failed to save answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  // Handle answer input change
  const handleAnswerChange = (qnaId: number, value: string) => {
    setNewAnswer((prev) => ({ ...prev, [qnaId]: value }));
  };

  // Function to handle deleting the QnA
  const handleDeleteQna = async (qnaId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this QnA?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/admin/qna/${qnaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setQuestions(questions.filter((ques) => ques.qna_id !== qnaId));
        alert("QnA deleted successfully.");
      } else {
        console.error("Failed to delete the QnA:", response.statusText);
        alert("Failed to delete the QnA.");
      }
    } catch (error) {
      console.error("Error deleting QnA:", error);
      alert("Error deleting the QnA.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#7b1f4b]">FAQ (Questions & Answers)</h2>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

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
          {questions.map((q) => (
            <tr key={q.qna_id}>
              <td className="border px-4 py-2 text-black text-center align-middle">{q.qna_id}</td>
              <td className="border px-4 py-2 text-black text-center align-middle">{q.question}</td>
              <td className="border px-4 py-2 text-black text-center align-middle">
                {q.answer === "" ? (
                  <>
                    <input
                      type="text"
                      value={newAnswer[q.qna_id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(q.qna_id, e.target.value)
                      }
                      className="border p-2 rounded-md"
                    />
                    <button
                      onClick={() => handleSaveAnswer(q.qna_id)}
                      className="ml-2 text-white bg-[#7b1f4b] px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  q.answer
                )}
              </td>
              <td className="border px-4 py-2 text-black text-center align-middle">
                <button className="text-[#7b1f4b]" onClick={() => handleDeleteQna(q.qna_id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Next
        </button>
      </div>

      {/* Show Sign In Modal if token is missing */}
      {openSignInModal && (
        <SignInModal
          isOpen={openSignInModal}
          closeModal={() => setOpenSignInModal(false)}
        />
      )}
    </div>
  );
};

export default QAPage;

