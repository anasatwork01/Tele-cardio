import React, { useEffect, useState, useRef, useMemo } from "react"
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import TableContainer from "components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Button,
  Form,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

import { Name, Email, Tags, Projects, Gender, Age } from "./UserListCol"

import { useNavigate } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import { del, get, post, put } from "helpers/api_helper"

const UserTable = props => {
  //meta title
  document.title = "User List | Skote - React Admin & Dashboard Template"

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const [userList, setUserList] = useState([
    { name: "Anas", email: "anas@ecg.com", age: 20, gender: "Male" },
    { name: "Ali", email: "ali@ecg.com", age: 30, gender: "Male" },
  ])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      email: (contact && contact.email) || "",
      age: (contact && contact.age) || "",
      gender: (contact && contact.gender) || "",
      password: (contact && contact.password) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      age: Yup.string().required("Please Enter Your Age"),
      gender: Yup.string().required("Please Enter Your Gender"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      password: isEdit
        ? null
        : Yup.string().required("Please Enter your Password"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updatedUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          age: values.age,
          gender: values.gender,
        }
        // update user
        updateUser(updatedUser)
        // dispatch(onUpdateUser(updateUser))
        setIsEdit(false)
        validation.resetForm()
      } else {
        const newUser = {
          name: values["name"],
          email: values["email"],
          password: values["password"],
          age: values["age"],
          gender: values["gender"],
          role: "user",
        }
        // save new user
        addUser(newUser)
        // dispatch(onAddNewUser(newUser))
        validation.resetForm()
      }
      toggle()
    },
  })

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },
      {
        Header: "Gender",
        accessor: "gender",
        filterable: true,
        Cell: cellProps => {
          return <Gender {...cellProps} />
        },
      },
      {
        Header: "Age",
        accessor: "age",
        filterable: true,
        Cell: cellProps => {
          return <Age {...cellProps} />
        },
      },

      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
      {
        Header: "View Details",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => {
                navigate("/dashboardPatient")
              }}
            >
              View Details
            </Button>
          )
        },
      },
    ],
    []
  )

  // useEffect(() => {
  //   getUsers()
  // }, [])

  // const getUsers = async () => {
  //   try {
  //     const reponse = await get("admin/user")
  //     setUserList(reponse.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const updateUser = async updatedUser => {
  //   try {
  //     const response = await put(`admin/user/${contact.id}`, updatedUser)
  //     getUsers()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const deleteUser = async () => {
  //   try {
  //     const response = await del(`admin/user/${contact.id}`)
  //     getUsers()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const addUser = async user => {
  //   try {
  //     const reponse = await post("admin/user", user)
  //     getUsers()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  useEffect(() => {
    setIsEdit(false)
  }, [])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg

    setContact({
      id: user._id,
      name: user.name,
      email: user.email,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = users => {
    setContact({
      id: users._id,
    })
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      // deleteUser()
    }
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleUserClicks = () => {
    setIsEdit(false)
    toggle()
  }

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Card>
        <CardBody>
          <TableContainer
            columns={columns}
            data={userList}
            isGlobalFilter={true}
            isAddUserList={true}
            handleUserClick={handleUserClicks}
            customPageSize={10}
            className="custom-header-css"
          />

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit User" : "Add User"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col xs={12}>
                    <div className="mb-3">
                      <Label className="form-label">Name</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Insert Name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Email</Label>
                      <Input
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Insert Email"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                      {validation.touched.email && validation.errors.email ? (
                        <FormFeedback type="invalid">
                          {validation.errors.email}
                        </FormFeedback>
                      ) : null}
                    </div>
                    {!isEdit && (
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="text"
                          placeholder="Insert Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>
                    )}
                    <div className="mb-3">
                      <Label className="form-label">Gender</Label>
                      <Input
                        name="gender"
                        type="text"
                        placeholder="Insert Gender"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.gender || ""}
                        invalid={
                          validation.touched.gender && validation.errors.gender
                            ? true
                            : false
                        }
                      />
                      {validation.touched.gender && validation.errors.gender ? (
                        <FormFeedback type="invalid">
                          {validation.errors.gender}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Age</Label>
                      <Input
                        name="age"
                        type="text"
                        placeholder="Insert Age"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.age || ""}
                        invalid={
                          validation.touched.age && validation.errors.gender
                            ? true
                            : false
                        }
                      />
                      {validation.touched.age && validation.errors.age ? (
                        <FormFeedback type="invalid">
                          {validation.errors.gender}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default withRouter(UserTable)
