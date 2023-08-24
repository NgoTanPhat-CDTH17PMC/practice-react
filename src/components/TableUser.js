import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { fetchAllUser } from "../services/UserService";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";

const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalPages(res.total_pages);
      setTotalUsers(res.total);
      setListUsers(res.data);
    } else {
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };
  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <Button variant="warning mx-3">Edit</Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel=">"
        onPageChange={(event) => handlePageClick(event)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
export default TableUser;
