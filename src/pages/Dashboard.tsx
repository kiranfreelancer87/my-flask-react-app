import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import ApiServices from '../services/ApiServices';

// Define the base URL
const API_BASE_URL = ApiServices.getBaseUrl();

const Dashboard = () => {
  const [dailyReport, setDailyReport] = useState<any>(null); // Use `any` for initial state
  const [weeklyReport, setWeeklyReport] = useState<any>(null); // Use `any` for initial state
  const [monthlyReport, setMonthlyReport] = useState<any>(null); // Use `any` for initial state
  const [allActivities, setAllActivities] = useState<any>([]); // Use `any` for initial state
  const [totalUsers, setTotalUsers] = useState<number>(0); // Initialize with number type
  const [page, setPage] = useState<number>(0); // Initialize with number type
  const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Initialize with number type

  useEffect(() => {
    // Fetch daily report
    axios.get(`${API_BASE_URL}/reports/daily`)
      .then(response => {
        setDailyReport(response.data);
      })
      .catch(error => {
        console.error('Error fetching daily report:', error);
      });

    // Fetch weekly report
    axios.get(`${API_BASE_URL}/reports/weekly`)
      .then(response => {
        setWeeklyReport(response.data);
      })
      .catch(error => {
        console.error('Error fetching weekly report:', error);
      });

    // Fetch monthly report
    axios.get(`${API_BASE_URL}/reports/monthly`)
      .then(response => {
        setMonthlyReport(response.data);
      })
      .catch(error => {
        console.error('Error fetching monthly report:', error);
      });

    // Fetch all activities
    axios.get(`${API_BASE_URL}/reports/all_activities`)
      .then(response => {
        setAllActivities(response.data);
      })
      .catch(error => {
        console.error('Error fetching all activities:', error);
      });

    // Fetch total users
    axios.get(`${API_BASE_URL}/reports/total_users`)
      .then(response => {
        setTotalUsers(response.data.total_users);
      })
      .catch(error => {
        console.error('Error fetching total users:', error);
      });
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Daily Report Card */}
      <Card variant="outlined">
        <CardContent>
          {dailyReport && (
            <>
              <Typography variant="h5" component="h2">{dailyReport.report_type} Report</Typography>
              <Typography color="textSecondary">Start Date: {dailyReport.start_date}</Typography>
              <Typography color="textSecondary">End Date: {dailyReport.end_date}</Typography>
              <Typography color="textSecondary">Unique Users Count: {dailyReport.unique_users_count}</Typography>
              {/* Display additional details as needed */}
            </>
          )}
        </CardContent>
      </Card>

      {/* Weekly Report Card */}
      <Card variant="outlined">
        <CardContent>
          {weeklyReport && (
            <>
              <Typography variant="h5" component="h2">{weeklyReport.report_type} Report</Typography>
              <Typography color="textSecondary">Start Date: {weeklyReport.start_date}</Typography>
              <Typography color="textSecondary">End Date: {weeklyReport.end_date}</Typography>
              <Typography color="textSecondary">Unique Users Count: {weeklyReport.unique_users_count}</Typography>
              {/* Display additional details as needed */}
            </>
          )}
        </CardContent>
      </Card>

      {/* Monthly Report Card */}
      <Card variant="outlined">
        <CardContent>
          {monthlyReport && (
            <>
              <Typography variant="h5" component="h2">{monthlyReport.report_type} Report</Typography>
              <Typography color="textSecondary">Start Date: {monthlyReport.start_date}</Typography>
              <Typography color="textSecondary">End Date: {monthlyReport.end_date}</Typography>
              <Typography color="textSecondary">Unique Users Count: {monthlyReport.unique_users_count}</Typography>
              {/* Display additional details as needed */}
            </>
          )}
        </CardContent>
      </Card>

      {/* Total Users Card */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">Total Users</Typography>
          <Typography color="textSecondary">{totalUsers}</Typography>
        </CardContent>
      </Card>

      {/* All Activities */}
      <div>
        <h2>All Activities</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Activity ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Timestamp</TableCell>
                {/* Add more headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {allActivities
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((activity: any) => ( // Use `any` for activity type
                  <TableRow key={activity.id}>
                    <TableCell>{activity.id}</TableCell>
                    <TableCell>{activity.user_id}</TableCell>
                    <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell>
                    {/* Add more cells as needed */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
          component="div"
          count={allActivities.length} // Total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
