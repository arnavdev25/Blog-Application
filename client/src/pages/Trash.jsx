import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { callForTrashBlogs } from "../redux/blogs/actions";
import CustomizedProgressBars from "../components/Progress";

const Trash = () => {
  const dispatch = useDispatch();
  const { trash, loading, error } = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(callForTrashBlogs());
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-[10%] m-auto">
          <CustomizedProgressBars />
        </div>
      ) : error ? (
        <div className="m-auto w-[20%]">
          <h1 className="text-2xl text-gray-600 ">Internal Server error</h1>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {trash.map((blog) => {
                  return (
                    <TableRow
                      key={blog._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link to={`/blogs/${blog._id}`}>{blog._id}</Link>
                      </TableCell>
                      <TableCell align="right">{blog.title}</TableCell>
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
export default Trash;
