import React from 'react'
import { Subjects } from '../data/subjectData.js'
import { useParams } from 'react-router-dom'

export default function SubjectList() {
    const {subjectName} = useParams()

    console.log(subjectName)

    const selectedSubject = Subjects.find(
        (subj) => subj.subject.toLowerCase().replace(/\s+/g, '-') === subjectName
      );

  
  if (!selectedSubject) {
    return <div className="p-5 text-red-500">Subject not found.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-richblack-50">
        {selectedSubject.subject}
      </h1>
      <p className="text-richblack-200">{selectedSubject.data}</p>
    </div>
  );
}
