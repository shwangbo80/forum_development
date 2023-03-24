import { React, useState, useEffect } from "react";
import {
  Table,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./postComponent.css";
import { useAuth0 } from "@auth0/auth0-react";
import EditButton from "../../components/EditButton";

function PostComponent() {
  return (
    <>
      <div>
        <h2 className="mb-4">The Elder Scrolls V: Skyrim</h2>
        <div className="mb-4">
          <Link to="../forums/createComment">
            <Button className="btn-primary">Post a comment</Button>
          </Link>
        </div>
      </div>
      <Table responsive bordered className="tableContainer">
        <thead className="bg-violet">
          <tr>
            <th className="d-flex justify-content-between align-items-center">
              Saladinsix5 5 days ago
              <div className="ms-5">{EditButton()}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">
              Holy s*** these dragons can be so annoying and they barely ever
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default PostComponent;
