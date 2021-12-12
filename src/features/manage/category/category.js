import React, {useEffect, useState} from 'react';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {CatStatus} from "../../../common/constant/constant";
import {StyledTableCell, StyledTableRow} from "../../table/table";
import Action from "./action";
import OpenIconSpeedDial from "../../../common/OpenIconSpeedDial";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CatModal from "./catModal";

function Category(props) {
    const [cats, setCats] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [readyOnly, setReadyOnly] = useState(false);
    const [currentData, setCurrentData] = useState([]);

    React.useEffect(() => {
        axios.get('/homo-admin/cat/list').then((data) => {
            setCats(data)
        })
    }, [])

    if (!cats) return null;

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalOpen = (data) => {
        setModalOpen(true);
        setReadyOnly(false);
        setCurrentData(data);
    };

    const handleModalOpenReadOnly = (data) => {
        setModalOpen(true);
        setReadyOnly(true);
        setCurrentData(data);
    };

    const handleDel = () => {
    };

    const actions = [
        {icon: <AddIcon/>, name: '添加', onClick: handleModalOpen},
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
                            <StyledTableCell align="center">主图</StyledTableCell>
                            <StyledTableCell align="center">描述</StyledTableCell>
                            <StyledTableCell align="center">状态</StyledTableCell>
                            <StyledTableCell align="center">资源数量</StyledTableCell>
                            <StyledTableCell align="center">更新时间</StyledTableCell>
                            <StyledTableCell align="center">创建时间</StyledTableCell>
                            <StyledTableCell align="center">操作</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cats.map((row) => (
                            <StyledTableRow key={row.ID}>
                                <StyledTableCell component="th" scope="row">
                                    {row.ID}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.Title}</StyledTableCell>
                                <StyledTableCell align="center">{row.SubTitle}</StyledTableCell>
                                <StyledTableCell align="center">{row.Preview}</StyledTableCell>
                                <StyledTableCell align="center">{row.Desc}</StyledTableCell>
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
                                    <Action data={row} handleDel={handleDel} handleEdit={handleModalOpen} handleOpen={handleModalOpenReadOnly}/>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {OpenIconSpeedDial(actions)}

            <CatModal data={currentData}
                      readyOnly={readyOnly}
                      open={modalOpen}
                      handleClose={handleModalClose}/>

        </React.Fragment>
    );
}

export default Category;