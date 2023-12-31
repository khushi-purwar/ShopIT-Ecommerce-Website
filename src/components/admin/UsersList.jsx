import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact'

// layout
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import Sidebar from './Sidebar'

import {useAlert} from 'react-alert';

// fundctions
import {getAllUsers, clearErrors, deleteUser} from '../../actions/userActions';

// type
import {DELETE_USER_RESET} from '../../constants/userConstants';

const UsersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error, users} = useSelector(state => state.allUsers);
    const {error:deleteError, isDeleted}= useSelector(state => state.updateDeleteUser);

    useEffect( ()=>{
        dispatch(getAllUsers());

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success("User Deleted Successfully!");
            navigate('/admin/users')
            dispatch({
                type: 'DELETE_USER_RESET'
            })
        }

    }, [dispatch, alert, error, navigate, deleteError,isDeleted])

    const setUsers = ()=>{
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        const deleteUserHandler = (id) => {
            dispatch(deleteUser(id));
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: <>
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2 mr-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2" onClick={ (e) => deleteUserHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        })
 

        return data;
    }

    

    return (
        <>
            <MetaData title="All Users" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                   <h1 className="my-5">All Users</h1>
                   {loading ? <Loader /> : (
                       <MDBDataTable
                       data={setUsers()}
                       entriesOptions={[5, 10, 15, 20, 50, 100, 500,1000]}
                       className="px-3"
                       bordered
                       striped
                       hover
                      
                   />
                   )}
                </div>
            </div>
        </>
    )
}

export default UsersList;
