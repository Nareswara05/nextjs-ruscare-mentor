"use client"

import React, { useState, useEffect } from 'react';
import listMajor from '@/app/lib/service/endpoint/api/list-major';
import students from './student';

const StudentTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kelasFilter, setKelasFilter] = useState('');
  const [jurusanFilter, setJurusanFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [angkatanFilter, setAngkatanFilter] = useState('');
  const [majors, setMajors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(8);

  useEffect(() => {
    async function fetchMajors() {
      const majorData = await listMajor();
      setMajors(majorData);
    }

    fetchMajors();
  }, []);

  const tableHead = [
    { menu: 'Nama' },
    { menu: 'Kelas' },
    { menu: 'Jurusan' },
    { menu: 'Status' },
    { menu: 'Tanggal Lahir' },
    { menu: 'Angkatan' },
  ];

  const kelasOptions = ['X', 'XI', 'XII'];
  const angkatanOptions = ['2022', '2023', '2024', '2025', '2026'];
  const statusOptions = ['Aktif', 'Lulus'];

  const filteredStudents = students.filter(student => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (kelasFilter === '' || student.kelas === kelasFilter) &&
      (jurusanFilter === '' || student.jurusan === jurusanFilter) &&
      (statusFilter === '' || student.status === statusFilter) &&
      (angkatanFilter === '' || student.angkatan === angkatanFilter)
    );
  });

  // Pagination logic
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
        <select value={kelasFilter} onChange={(e) => setKelasFilter(e.target.value)} className="border px-2 py-1">
          <option value="">Semua Kelas</option>
          {kelasOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <select value={jurusanFilter} onChange={(e) => setJurusanFilter(e.target.value)} className="border px-2 py-1">
          <option value="">Semua Jurusan</option>
          {majors.map((major, index) => (
            <option key={index} value={major.name}>{major.grade_name}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-2 py-1">
          <option value="">Semua Status</option>
          {statusOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <select value={angkatanFilter} onChange={(e) => setAngkatanFilter(e.target.value)} className="border px-2 py-1">
          <option value="">Semua Angkatan</option>
          {angkatanOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
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
              <td className="py-2 px-4">{student.kelas}</td>
              <td className="py-2 px-4">{student.jurusan}</td>
              <td className="py-2 px-4">{student.status}</td>
              <td className="py-2 px-4">{student.birthDate}</td>
              <td className="py-2 px-4">{student.angkatan}</td>
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
