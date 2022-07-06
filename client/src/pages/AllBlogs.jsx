import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useDispatch, useSelector } from "react-redux";
import { callForAllBlogs } from "../redux/blogs/actions";
import CustomizedProgressBars from "../components/Progress";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const { allBlogs, loading, error } = useSelector((state) => state.blogs);
  const formatter = buildFormatter(englishStrings);
  useEffect(() => {
    dispatch(callForAllBlogs());
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-[10%] m-auto"><CustomizedProgressBars/></div>
      ) : error ? (
        <div className="m-auto w-[20%]">
        <h1 className="text-2xl text-gray-600 ">
        Internal Server error
        </h1>
        </div>
      ) : (
        <div className="m-auto w-[80%]">
          <div></div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID (unique id)</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBlogs.map((blog) => {
                  if (!blog.deleted)
                    return (
                      <TableRow
                        key={blog._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Link to={`/blogs/${blog._id}`}>{blog._id}</Link>
                          - (
                          <TimeAgo
                            date={blog.createdAt}
                            formatter={formatter}
                          />
                          )
                        </TableCell>
                        <TableCell align="right">{blog.title}</TableCell>
                        <TableCell align="right">
                          <Link to={`/blogs/${blog._id}/edit`}>Edit</Link>
                        </TableCell>
                        <TableCell align="right">
                          <Link to={`/blogs/${blog._id}/delete`}> Delete</Link>
                        </TableCell>
                      </TableRow>
                    );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default AllBlogs;
