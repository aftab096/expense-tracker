import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";

import { setTableData } from "../actions/home";
import "../styles/table-view.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core/";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100%",
  },
});

const TableView = ({ headers }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { selectedItemId, tableData } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(setTableData(selectedItemId));
  }, [selectedItemId]);

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = () => {
    console.log("delete clicked");
  };

  const getRow = (rowData) => {
    return (
      <TableRow key={rowData.id}>
        {headers.map((header) =>
          header.id !== "action" ? (
            <TableCell key={header.id}>{rowData[header.id]}</TableCell>
          ) : (
            <TableCell>
              <div className="tableCellIconsContainer">
                <EditIcon
                  fontSize="small"
                  onClick={handleEdit.bind(rowData.id)}
                  style={{ marginRight: "15px" }}
                />
                <DeleteIcon
                  fontSize="small"
                  onClick={handleDelete.bind(rowData.id)}
                />
              </div>
            </TableCell>
          )
        )}
      </TableRow>
    );
  };

  return (
    <div className="tableViewContainer">
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                return <TableCell key={header.id}>{header.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row) => {
              return getRow(row);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableView;
