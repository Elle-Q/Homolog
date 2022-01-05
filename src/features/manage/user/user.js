import React, {useEffect, useState} from 'react';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import api from "../../../api/api";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Action from "./action";
import {AccountStatus} from "../../../common/constant/constant";
import {StyledSwitch, StyledTableCell, StyledTableRow} from "../../table/table";


function User(props) {
    const [users, setUsers] = useState();
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    React.useEffect(async () =>  {
       api.get('/homo-admin/user/list').then((data) => {
            setUsers(data)
        })
    }, [])

    if (!users) return null;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table" >
                <TableHead >
                    <TableRow>
                        <StyledTableCell>id</StyledTableCell>
                        <StyledTableCell align="center">姓名</StyledTableCell>
                        <StyledTableCell align="center">电话</StyledTableCell>
                        <StyledTableCell align="center">地址</StyledTableCell>
                        <StyledTableCell align="center">性别</StyledTableCell>
                        <StyledTableCell align="center">账户状态</StyledTableCell>
                        <StyledTableCell align="center">vip</StyledTableCell>
                        <StyledTableCell align="center">更新时间</StyledTableCell>
                        <StyledTableCell align="center">创建时间</StyledTableCell>
                        <StyledTableCell align="center">操作</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <StyledTableRow  key={row.ID} >
                            <StyledTableCell component="th" scope="row">
                                {row.ID}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.Name}</StyledTableCell>
                            <StyledTableCell align="center">{row.Phone}</StyledTableCell>
                            <StyledTableCell align="center">{row.Address}</StyledTableCell>
                            <StyledTableCell align="center">
                                {
                                    row.Gender === 'female' ? <FemaleIcon sx={{color:'#ff7096'}}/> : <MaleIcon  sx={{color:'#3399ff'}}/>
                                    }
                            </StyledTableCell>
                            <StyledTableCell align="center"> {
                                AccountStatus[row.Status]
                            }</StyledTableCell>
                            <StyledTableCell align="center">
                                {
                                    row.Vip ?
                                        <StyledSwitch
                                        checked={checked}
                                        onChange={handleChange}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    : '否'}

                            </StyledTableCell>
                            <StyledTableCell align="center">{row.UpdateTime}</StyledTableCell>
                            <StyledTableCell align="center">{row.CreateTime}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Action />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default User;