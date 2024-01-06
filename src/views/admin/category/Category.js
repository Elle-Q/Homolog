import React, {useEffect, useState} from 'react';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import {CatStatus} from "../../../utils/constant/constant";
import {StyledTableCell, StyledTableRow} from "../../../components/table/Table";
import Action from "../../../components/table/action";
import CustomSpeedDial from "../../../components/CustomSpeedDial";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CatModal from "./CatModal";
import {useDispatch, useSelector} from "react-redux";
import {open} from "./catSlice";
import {openAlert} from "../../../components/alert/ops/alertSlice";
import api from "../../../api/api";
import {ListCats} from "../../../api/cat.service";
import {selectRefresh} from "../../../app/refreshSlice";

function Category(props) {
    const [cats, setCats] = useState([]);
    const {refresh} = useSelector(selectRefresh);
    const dispatch = useDispatch();

    React.useEffect(() => {
        ListCats().then((data) => {
            setCats(data)
        })
    }, [refresh])

    const handleAddClick = () =>
        dispatch(
            open({
                readOnly: false,
                type: "add",
                data: {}
            }));

    const handleDel = async (id) => {
        api.post('/leetroll-admin/cat/delete', {
            id: id
        }).then((resp) => {
            if (resp) {
                const arr = cats.filter((item) => item.ID !== id);
                setCats(arr);
            }
        })
        dispatch(openAlert())
    };

    const handleOpen = (data) => {
        dispatch(open({
            readOnly: true,
            type: "show",
            data: data,
        }))
    }


    const handleEdit = (data) => {
        dispatch(open({
            readOnly: false,
            type: "edit",
            data: data,
        }))
    }

    const actions = [
        {icon: <AddIcon/>, name: '添加', onClick: handleAddClick},
        {icon: <DeleteIcon/>, name: '批量删除'},
        {icon: <DoNotDisturbOnIcon/>, name: '批量下架'},
    ];

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>id</StyledTableCell>
                            <StyledTableCell align="center">标题</StyledTableCell>
                            <StyledTableCell align="center">副标题</StyledTableCell>
                            <StyledTableCell align="center">状态</StyledTableCell>
                            <StyledTableCell align="center">资源数量</StyledTableCell>
                            <StyledTableCell align="center">更新时间</StyledTableCell>
                            <StyledTableCell align="center">创建时间</StyledTableCell>
                            <StyledTableCell align="center">操作</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cats.map((row) => (
                                <StyledTableRow key={row.ID}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.ID}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.Title}</StyledTableCell>
                                    <StyledTableCell align="center">{row.SubTitle}</StyledTableCell>
                                    <StyledTableCell align="center">
                                    <span style={{
                                        color: '#0aa858',
                                        fontSize: '12px',
                                        marginLeft: '5px',
                                        textAlign: "center"
                                    }}>{CatStatus[row.Status]} </span>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">0</StyledTableCell>
                                    <StyledTableCell align="center">{row.UpdateTime}</StyledTableCell>
                                    <StyledTableCell align="center">{row.CreateTime}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Action data={row}
                                                handleDel={handleDel}
                                                handleOpen={handleOpen}
                                                handleEdit={handleEdit}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <CustomSpeedDial actions={actions}/>

            <CatModal  />

        </React.Fragment>
    );
}

export default Category;