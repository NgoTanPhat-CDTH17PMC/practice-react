import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { fetchAllUser } from "../services/UserService";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import _, { clone, debounce } from "lodash";
import ModalConfirm from "./ModalDeleteUser";
import "./TableUser.scss";
import { CSVLink, CSVDownload } from "react-csv";

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
  const [keyword, setKeyword] = useState("");

  const [dataExport, setDataExport] = useState([]);

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];
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

  const handleSearch = debounce((event) => {
    // setKeyword(event.target.value);
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 500);

  const getUserExport = (event, done) => {
    let result = [];

    if (listUsers && listUsers.length > 0) {
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };
  return (
    <>
      <div className="my-3 add-new d-flex justify-content-between">
        <span>List User:</span>
        <div>
          <label htmlFor="test" className="btn btn-warning">
            <i className="mx-2 fas fa-file-import"></i>
            Import
          </label>
          <input id="test" type="file" hidden />

          <CSVLink
            data={dataExport}
            filename={"list-user.csv"}
            className="btn btn-primary mx-3"
            asyncOnClick={true}
            onClick={getUserExport}
          >
            <i className="mx-2 fas fa-file-export" aria-hidden="true"></i>
            Download me
          </CSVLink>

          <Button variant="success" onClick={() => setIsShowModalAddNew(true)}>
            <i className="mx-2 fa fa-plus-circle" aria-hidden="true"></i>Add new
            user
          </Button>
        </div>
      </div>
      <div className="col-3 my-3">
        <input
          type="text"
          className="form-control"
          onChange={(event) => handleSearch(event)}
          placeholder="Search User..."
        />
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
