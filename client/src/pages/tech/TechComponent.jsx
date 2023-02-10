import React from "react";
import {Table} from "react-bootstrap";
import "./tech.css";

function TechComponent() {
  return (
    <>
      <h2 className="mb-5">Tech Forum</h2>
      <Table hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th className="topicHead">Topic</th>
            <th className="authorHead">Created By</th>
            <th>Last Post</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TechComponent;
