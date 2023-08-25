import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { fetchAllUser } from "../services/UserService";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import _ from "lodash";
import ModalConfirm from "./ModalDeleteUser";
import "./TableUser.scss";

const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState([]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateUser = (user) => {
    setListUsers([user, ...listUsers]);
  };
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

  const handleEditUser = (user) => {
    setIsShowModalEdit(true);
    setDataUserEdit(user);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserEdit(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };

  return (
    <>
      <div className="my-3 add-new d-flex justify-content-between">
        <span>List User:</span>
        <Button variant="success" onClick={() => setIsShowModalAddNew(true)}>
          Add new user
        </Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="sort-header">
              <span>ID</span>
              <span>
                <i
                  className="fa fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "id")}
                ></i>
                <i
                  className="fa fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "id")}
                ></i>
              </span>
            </th>
            <th className="sort-header">
              <span>Email</span>
              <span>
                <i
                  className="fa fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "email")}
                ></i>
                <i
                  className="fa fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "email")}
                ></i>
              </span>
            </th>
            <th className="sort-header">
              <span>First Name</span>
              <span>
                <i
                  className="fa fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
                <i
                  className="fa fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "first_name")}
                ></i>
              </span>
            </th>
            <th className="sort-header">
              <span>Last Name</span>
              <span>
                <i
                  className="fa fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "last_name")}
                ></i>
                <i
                  className="fa fa-solid fa-arrow-up-long"
                  onClick={() => handleSort("asc", "last_name")}
                ></i>
              </span>
            </th>
            <th className="sort-header">Action</th>
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
                    <Button
                      variant="warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </Button>
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
        containerClassName="pagination d-flex justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateUser}
      />

      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};
export default TableUser;
