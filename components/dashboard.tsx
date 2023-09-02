import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { json } from 'sequelize';

interface CustomDashboardProps {
  someProp: string;
}

const CustomDashboard: React.FC<CustomDashboardProps> = ({ someProp}) => {
  const [userData, setUserData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);

  

  useEffect(() => {
    axios.get('/api/users').then(response => setUserData(response.data));
    axios.get('/api/courses').then(response => setCourseData(response.data));
    axios.get('/api/enrollments').then(response => setEnrollmentData(response.data));
  }, []);


  return (
    <div>
      <h1>Custom Dashboard</h1>
      <p>Value from prop: {someProp}</p>

      {/* User Bar Chart */}
      <h2>User Data</h2>
      <BarChart width={400} height={300} data={userData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>

      {/* Course Bar Chart */}
      <h2>Course Data</h2>
      <BarChart width={400} height={300} data={courseData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="enrollmentCount" fill="#82ca9d" />
      </BarChart>

      {/* Enrollment Bar Chart */}
      <h2>Enrollment Data</h2>
      <BarChart width={400} height={300} data={enrollmentData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="courseName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="userCount" fill="#ffc658" />
      </BarChart>
    </div>
  );
};

export default CustomDashboard;