import React from "react";
import {
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  orderCard: {
    padding: "50px",
  },
  table: {
    minWidth: 650,
    margin: "20px 0 50px 0",
  },
}));

const DataTable = ({ tableHeadings, tableContents }) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {tableHeadings &&
                tableHeadings.map((th) => <TableCell key={th}>{th}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>{tableContents && tableContents}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
