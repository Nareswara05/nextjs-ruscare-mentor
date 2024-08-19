"use client"

import React, { useState, useEffect } from 'react';
import listMajor from '@/app/lib/service/endpoint/api/list-major';
import listStudent from '@/app/lib/service/endpoint/api/list-student';
import { ClipLoader } from 'react-spinners';

const StudentTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jurusanFilter, setJurusanFilter] = useState('');
  const [angkatanFilter, setAngkatanFilter] = useState('');
  const [majors, setMajors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchMajors() {
      try {
        const majorData = await listMajor();
        console.log('Fetched majors:', majorData); // Debugging log
        setMajors(majorData);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    }

    fetchMajors();
  }, []);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentData = await listStudent(searchTerm, angkatanFilter, jurusanFilter);
        console.log('Fetched students:', studentData); // Debugging log
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }finally{
        setLoading(false);
      }
    }

    fetchStudents();
  }, [searchTerm, angkatanFilter, jurusanFilter]);

  const tableHead = [
    { menu: 'Nama' },
    { menu: 'Jurusan' },
    { menu: 'Angkatan' },
    { menu: 'Tanggal Lahir' },
  ];

  const yearStart = [
    { year: 2022 },
    { year: 2023 },
    { year: 2024 },
    { year: 2025 },
    { year: 2026 },
  ];

  // const getMajorName = (grade_name) => {
  //   const major = majors.find((major) => major.id === grade_name);
  //   return major ? major.grade_name : 'Unknown';
  // };

  const getMajorName = (grade_id) => {
    switch (grade_id) {
      case 1:
        return "PPLG";
      case 2:
        return "Animasi 3D";
      case 3:
        return "Animasi 2D";
      case 4:
        return "Desain Grafis";
      case 5:
        return "Teknik Grafika";
      default:
        return "Unknown";
    }
  };

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#9F41EA" loading={loading} size={50} />
      </div>
    )
  }

  const filteredStudents = students;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Nama"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-2 py-3 my-2 w-full text-textPrimary"
      />
      <div className="flex gap-4 mb-4 text-textPrimary">
        <select value={angkatanFilter} onChange={(e) => setAngkatanFilter(e.target.value)} className="border px-2 py-1">
          <option value="">Semua Angkatan</option>
          {yearStart.map((year, index) => (
            <option key={index} value={year.year}>{year.year}</option>
          ))}
        </select>
        <select value={jurusanFilter} onChange={(e) => setJurusanFilter(e.target.value)} className="border px-2 py-1 text-textPrimary">
          <option value="">Semua Jurusan</option>
          {majors.map((major, index) => (
            <option key={index} value={major.id}>{major.grade_name}</option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {tableHead.map((item, index) => (
              <th key={index} className="py-2 px-4 border-b border-gray-300 text-left text-textPrimary font-semibold">{item.menu}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id} className="border-b border-gray-200 text-textPrimary">
              <td className="py-2 px-4">{student.name}</td>
              <td className="py-2 px-4">{getMajorName(student.grade_id)}</td>
              <td className="py-2 px-4">{student.year_of_entry}</td>
              <td className="py-2 px-4">{student.birth_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center my-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentTable;
