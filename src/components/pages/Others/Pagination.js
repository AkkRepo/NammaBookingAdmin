import React from "react";
import { Pagination } from "react-bootstrap";

const AppPagination = (props) => {
  return (
    <Pagination className="justify-content-center my-5">
      <Pagination.First
        onClick={() => {
          props.changePage(1);
        }}
        disabled={props.curPage === 1}
      />
      <Pagination.Prev
        onClick={() => {
          props.changePage(props.curPage - 1);
        }}
        disabled={props.curPage === 1}
      />
      <Pagination.Item>
        Page {props.curPage} of {props.maxPage}
      </Pagination.Item>
      <Pagination.Next
        onClick={() => {
          props.changePage(props.curPage + 1);
        }}
        disabled={props.curPage === props.maxPage}
      />
      <Pagination.Last
        onClick={() => {
          props.changePage(props.maxPage);
        }}
        disabled={props.curPage === props.maxPage}
      />
    </Pagination>
  );
};

export default AppPagination;
